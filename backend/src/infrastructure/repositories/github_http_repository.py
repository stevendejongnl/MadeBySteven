from datetime import datetime, timedelta

import httpx

from ...domain.entities.contribution_calendar import ContributionCalendar
from ...domain.entities.github_user import GitHubUser
from ...domain.repositories.github_repository import GitHubRepository
from ...domain.value_objects.contribution_day import ContributionDay
from ...domain.value_objects.contribution_week import ContributionWeek
from ...domain.value_objects.username import Username
from ..cache.in_memory_cache import InMemoryCache
from ..config import settings


class GitHubHttpRepository(GitHubRepository):
    """GitHub API HTTP implementation of repository"""

    def __init__(self, cache: InMemoryCache):
        self._cache = cache
        self._base_url = settings.GITHUB_API_BASE
        self._headers = {}
        if settings.GITHUB_TOKEN:
            self._headers["Authorization"] = f"token {settings.GITHUB_TOKEN}"

    async def fetch_user(self, username: Username) -> GitHubUser:
        """Fetch user from GitHub API with caching"""
        cache_key = f"user:{username.value}"
        cached = self._cache.get(cache_key)

        if cached:
            return GitHubUser(
                username=username,
                avatar_url=cached["avatar_url"],
                public_repos=cached["public_repos"],
                followers=cached["followers"],
                name=cached.get("name"),
                bio=cached.get("bio")
            )

        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self._base_url}/users/{username.value}",
                headers=self._headers,
                timeout=10.0
            )
            response.raise_for_status()
            data = response.json()

        user = GitHubUser(
            username=username,
            avatar_url=data["avatar_url"],
            public_repos=data["public_repos"],
            followers=data["followers"],
            name=data.get("name"),
            bio=data.get("bio")
        )

        self._cache.set(cache_key, {
            "avatar_url": user.avatar_url,
            "public_repos": user.public_repos,
            "followers": user.followers,
            "name": user.name,
            "bio": user.bio
        }, ttl=settings.CACHE_TTL_USER)

        return user

    async def fetch_contributions(self, username: Username) -> int:
        """Fetch contributions for user from contribution calendar"""
        cache_key = f"stats:{username.value}"
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
        """Fetch contribution calendar from GitHub GraphQL API"""
        cache_key = f"contributions_calendar:{username.value}"
        cached = self._cache.get(cache_key)

        if cached:
            return cached

        # Calculate date range: last 365 days
        to_date = datetime.now()
        from_date = to_date - timedelta(days=365)

        graphql_query = """
        query($username: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $username) {
                contributionsCollection(from: $from, to: $to) {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                date
                                contributionCount
                            }
                        }
                    }
                }
            }
        }
        """

        variables = {
            "username": username.value,
            "from": from_date.isoformat() + "Z",
            "to": to_date.isoformat() + "Z",
        }

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://api.github.com/graphql",
                    json={"query": graphql_query, "variables": variables},
                    headers=self._headers,
                    timeout=10.0,
                )
                response.raise_for_status()
                data = response.json()
        except Exception as e:
            # Handle rate limit and authentication errors gracefully
            error_msg = str(e)
            if "403" in error_msg or "rate limit" in error_msg.lower():
                # Rate limited or unauthorized - return empty calendar
                return ContributionCalendar(
                    weeks=[], total_contributions=0, max_contributions_in_week=0
                )
            raise

        # Handle GraphQL errors
        if "errors" in data:
            # GraphQL errors often include rate limit info - return empty calendar
            error_msg = str(data.get("errors", []))
            if "rate limit" in error_msg.lower():
                return ContributionCalendar(
                    weeks=[], total_contributions=0, max_contributions_in_week=0
                )
            raise Exception(f"GitHub GraphQL error: {data['errors']}")

        # Extract contribution data
        try:
            calendar_data = data["data"]["user"]["contributionsCollection"][
                "contributionCalendar"
            ]
        except (KeyError, TypeError):
            # Return empty calendar if data structure is unexpected
            return ContributionCalendar(
                weeks=[], total_contributions=0, max_contributions_in_week=0
            )

        weeks = []
        max_contributions = 0

        for week_data in calendar_data.get("weeks", []):
            days = []
            for day_data in week_data.get("contributionDays", []):
                count = day_data.get("contributionCount", 0)
                max_contributions = max(max_contributions, count)
                day = ContributionDay(
                    date=day_data["date"], count=count, level=0  # Level set in use case
                )
                days.append(day)

            # Only add weeks with complete data (7 days)
            if len(days) == 7:
                weeks.append(ContributionWeek(days=days))

        calendar = ContributionCalendar(
            weeks=weeks,
            total_contributions=calendar_data.get("totalContributions", 0),
            max_contributions_in_week=max_contributions,
        )

        # Cache the calendar
        self._cache.set(cache_key, calendar, ttl=settings.CACHE_TTL_CONTRIBUTIONS)

        return calendar
