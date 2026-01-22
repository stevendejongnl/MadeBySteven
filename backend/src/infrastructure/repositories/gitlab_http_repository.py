from datetime import datetime, timedelta

import httpx

from ...domain.entities.contribution_calendar import ContributionCalendar
from ...domain.repositories.contribution_repository import ContributionRepository
from ...domain.value_objects.contribution_day import ContributionDay
from ...domain.value_objects.contribution_week import ContributionWeek
from ...domain.value_objects.username import Username
from ..cache.in_memory_cache import InMemoryCache
from ..config import settings


class GitLabHttpRepository(ContributionRepository):
    """GitLab API HTTP implementation of contribution repository"""

    def __init__(self, cache: InMemoryCache):
        self._cache = cache
        self._base_url = settings.GITLAB_API_BASE
        self._headers = {}
        if settings.GITLAB_TOKEN:
            self._headers["PRIVATE-TOKEN"] = settings.GITLAB_TOKEN

    async def fetch_contributions(self, username: Username) -> int:
        """Fetch contributions for user from contribution calendar"""
        cache_key = f"gitlab:stats:{username.value}"
        cached = self._cache.get(cache_key)

        if cached is not None:
            return cached

        # Fetch full calendar and extract total contributions
        try:
            calendar = await self.fetch_contribution_calendar(username)
            contributions = calendar.total_contributions
        except Exception:
            # Fallback: return 0 if calendar fetch fails
            contributions = 0

        self._cache.set(cache_key, contributions, ttl=settings.CACHE_TTL_STATS)
        return contributions

    async def fetch_contribution_calendar(
        self, username: Username
    ) -> ContributionCalendar:
        """Fetch contribution calendar from GitLab REST API"""
        cache_key = f"gitlab:contributions_calendar:{username.value}"
        cached = self._cache.get(cache_key)

        if cached:
            return cached

        try:
            async with httpx.AsyncClient() as client:
                # GitLab calendar endpoint returns {"2026-01-15": 5, ...} format
                response = await client.get(
                    f"{settings.GITLAB_INSTANCE}/users/{username.value}/calendar.json",
                    headers=self._headers,
                    timeout=10.0,
                )
                response.raise_for_status()
                calendar_data = response.json()
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 404:
                # User not found or calendar is private - return empty calendar
                return ContributionCalendar(
                    weeks=[], total_contributions=0, max_contributions_in_week=0
                )
            raise
        except Exception as e:
            # Handle rate limits and other errors gracefully
            error_msg = str(e)
            if "rate limit" in error_msg.lower() or "429" in error_msg:
                # Rate limited - return empty calendar
                return ContributionCalendar(
                    weeks=[], total_contributions=0, max_contributions_in_week=0
                )
            raise

        # Transform GitLab calendar format to domain model
        # GitLab returns: {"2026-01-15": 5, "2026-01-16": 3, ...}
        calendar = self._transform_calendar(calendar_data)

        # Cache the calendar
        self._cache.set(cache_key, calendar, ttl=settings.CACHE_TTL_CONTRIBUTIONS)

        return calendar

    def _transform_calendar(self, calendar_data: dict[str, int]) -> ContributionCalendar:
        """Transform GitLab calendar format to ContributionCalendar entity"""
        if not calendar_data:
            return ContributionCalendar(
                weeks=[], total_contributions=0, max_contributions_in_week=0
            )

        # Sort dates to build 7-day weeks starting on Sunday
        dates = sorted(calendar_data.keys())
        if not dates:
            return ContributionCalendar(
                weeks=[], total_contributions=0, max_contributions_in_week=0
            )

        # Parse all dates and find start date (Sunday of first week)
        date_objects = [datetime.fromisoformat(d).date() for d in dates]
        start_date = date_objects[0]
        # Find the Sunday of the week containing start_date
        days_since_sunday = start_date.weekday() + 1  # Monday=0, Sunday=6 → +1 makes Sunday=0
        start_of_first_week = start_date - timedelta(days=days_since_sunday)

        weeks = []
        max_contributions = 0
        total_contributions = 0
        current_week_start = start_of_first_week

        while current_week_start < date_objects[-1]:
            days = []
            for i in range(7):
                day_date = current_week_start + timedelta(days=i)
                date_str = day_date.isoformat()
                count = calendar_data.get(date_str, 0)
                total_contributions += count
                max_contributions = max(max_contributions, count)
                day = ContributionDay(date=date_str, count=count, level=0)
                days.append(day)

            weeks.append(ContributionWeek(days=days))
            current_week_start += timedelta(days=7)

        return ContributionCalendar(
            weeks=weeks,
            total_contributions=total_contributions,
            max_contributions_in_week=max_contributions,
        )
