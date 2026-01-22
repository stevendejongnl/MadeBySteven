import asyncio
from collections import defaultdict
from typing import DefaultDict

from ..dtos.contribution_dto import (
    ContributionDayDTO,
    ContributionWeekDTO,
    GitHubContributionsDTO,
)
from ...domain.repositories.contribution_repository import ContributionRepository
from ...domain.value_objects.username import Username


class FetchAggregatedContributions:
    """Use case: Fetch and merge contribution calendars from multiple sources"""

    def __init__(
        self,
        repositories: list[ContributionRepository],
        usernames: dict[str, str],
    ):
        """
        Initialize the use case.

        Args:
            repositories: List of ContributionRepository implementations
            usernames: Mapping of source name to username
        """
        self._repositories = repositories
        self._usernames = usernames

    async def execute(self) -> GitHubContributionsDTO:
        """
        Execute the use case to fetch and merge contribution calendars.

        Returns:
            GitHubContributionsDTO with merged calendar data (sum of contributions per day)
        """
        tasks = [
            self._fetch_calendar_safe(repo, username)
            for repo, username in zip(self._repositories, self._usernames.values())
        ]

        calendars = await asyncio.gather(*tasks)

        # Merge calendars by date
        merged_by_date: DefaultDict[str, int] = defaultdict(int)
        for calendar in calendars:
            for week in calendar.weeks:
                for day in week.days:
                    merged_by_date[day.date] += day.count

        # Rebuild weeks from merged data
        if not merged_by_date:
            return GitHubContributionsDTO(
                weeks=[], total_contributions=0, max_contributions=0
            )

        # Reconstruct weeks starting from first date
        sorted_dates = sorted(merged_by_date.keys())
        from datetime import datetime, timedelta

        start_date = datetime.fromisoformat(sorted_dates[0]).date()
        end_date = datetime.fromisoformat(sorted_dates[-1]).date()

        # Find the Sunday of the week containing start_date
        days_since_sunday = start_date.weekday() + 1  # Monday=0, Sunday=6 → +1 makes Sunday=0
        start_of_first_week = start_date - timedelta(days=days_since_sunday)

        weeks = []
        max_contributions = 0
        total_contributions = 0
        current_week_start = start_of_first_week

        while current_week_start <= end_date:
            days = []
            for i in range(7):
                day_date = current_week_start + timedelta(days=i)
                date_str = day_date.isoformat()
                count = merged_by_date.get(date_str, 0)
                total_contributions += count
                max_contributions = max(max_contributions, count)
                day = ContributionDayDTO(date=date_str, count=count, level=0)
                days.append(day)

            weeks.append(ContributionWeekDTO(days=days))
            current_week_start += timedelta(days=7)

        # Recalculate levels based on merged max
        for week in weeks:
            for day in week.days:
                day.level = self._calculate_level(day.count, max_contributions)

        return GitHubContributionsDTO(
            weeks=weeks,
            total_contributions=total_contributions,
            max_contributions=max_contributions,
        )

    async def _fetch_calendar_safe(
        self, repository: ContributionRepository, username: str
    ) -> GitHubContributionsDTO:
        """
        Safely fetch calendar, returning empty on error.

        Args:
            repository: Repository to fetch from
            username: Username to fetch for

        Returns:
            Contribution calendar, or empty calendar if fetch fails
        """
        try:
            username_vo = Username(username)
            calendar = await repository.fetch_contribution_calendar(username_vo)

            # Transform to DTO with level calculation
            max_contributions = 0
            for week in calendar.weeks:
                for day in week.days:
                    max_contributions = max(max_contributions, day.count)

            weeks_dto = []
            for week in calendar.weeks:
                days_dto = []
                for day in week.days:
                    level = self._calculate_level(day.count, max_contributions)
                    days_dto.append(
                        ContributionDayDTO(date=day.date, count=day.count, level=level)
                    )
                weeks_dto.append(ContributionWeekDTO(days=days_dto))

            return GitHubContributionsDTO(
                weeks=weeks_dto,
                total_contributions=calendar.total_contributions,
                max_contributions=max_contributions,
            )
        except Exception as e:
            # Log error but don't fail - return empty calendar
            import logging
            logger = logging.getLogger(__name__)
            logger.warning(f"Failed to fetch contributions from {repository.__class__.__name__}: {e}")
            return GitHubContributionsDTO(weeks=[], total_contributions=0, max_contributions=0)

    def _calculate_level(self, count: int, max_count: int) -> int:
        """Calculate contribution intensity level (0-4)"""
        if count == 0 or max_count == 0:
            return 0
        percentage = (count / max_count) * 100
        if percentage <= 25:
            return 1
        elif percentage <= 50:
            return 2
        elif percentage <= 75:
            return 3
        else:
            return 4
