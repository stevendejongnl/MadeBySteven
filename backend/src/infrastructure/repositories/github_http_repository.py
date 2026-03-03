import asyncio
from collections import Counter
from datetime import datetime, timedelta, timezone

import httpx

from ...domain.entities.contribution_calendar import ContributionCalendar
from ...domain.entities.github_user import GitHubUser
from ...domain.repositories.github_repository import GitHubRepository
from ...domain.value_objects.contribution_day import ContributionDay
from ...domain.value_objects.contribution_week import ContributionWeek
from ...domain.value_objects.recent_repository import RecentRepository
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
        """Fetch user from GitHub API with caching, merging REST + GraphQL extended data"""
        cache_key = f"user:{username.value}"
        cached = self._cache.get(cache_key)

        if cached:
            recent_repos = [
                RecentRepository(**r) for r in cached.get("recent_repos", [])
            ]
            return GitHubUser(
                username=username,
                avatar_url=cached["avatar_url"],
                public_repos=cached["public_repos"],
                followers=cached["followers"],
                name=cached.get("name"),
                bio=cached.get("bio"),
                total_stars=cached.get("total_stars", 0),
                top_language=cached.get("top_language"),
                years_active=cached.get("years_active", 0),
                recent_repos=recent_repos,
            )

        # Fetch REST data and extended GraphQL data in parallel.
        # _fetch_extended_data never raises (catches all exceptions internally).
        rest_data: dict
        extended: dict
        rest_data, extended = await asyncio.gather(
            self._fetch_rest_user(username),
            self._fetch_extended_data(username),
        )

        user = GitHubUser(
            username=username,
            avatar_url=rest_data["avatar_url"],
            public_repos=rest_data["public_repos"],
            followers=rest_data["followers"],
            name=rest_data.get("name"),
            bio=rest_data.get("bio"),
            total_stars=extended.get("total_stars", 0),
            top_language=extended.get("top_language"),
            years_active=extended.get("years_active", 0),
            recent_repos=extended.get("recent_repos", []),
        )

        self._cache.set(cache_key, {
            "avatar_url": user.avatar_url,
            "public_repos": user.public_repos,
            "followers": user.followers,
            "name": user.name,
            "bio": user.bio,
            "total_stars": user.total_stars,
            "top_language": user.top_language,
            "years_active": user.years_active,
            "recent_repos": [
                {
                    "name": r.name,
                    "url": r.url,
                    "description": r.description,
                    "pushed_at": r.pushed_at,
                    "primary_language": r.primary_language,
                    "stars": r.stars,
                }
                for r in user.recent_repos
            ],
        }, ttl=settings.CACHE_TTL_USER)

        return user

    async def _fetch_rest_user(self, username: Username) -> dict:
        """Fetch basic user data from GitHub REST API"""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self._base_url}/users/{username.value}",
                headers=self._headers,
                timeout=10.0,
            )
            response.raise_for_status()
            return response.json()

    async def _fetch_extended_data(self, username: Username) -> dict:
        """Fetch extended stats via GitHub GraphQL API (stars, top language, recent repos)"""
        cache_key = f"extended:{username.value}"
        cached = self._cache.get(cache_key)
        if cached is not None:
            return cached

        graphql_query = """
        query($username: String!) {
          user(login: $username) {
            createdAt
            repositories(
              first: 100,
              orderBy: {field: PUSHED_AT, direction: DESC},
              ownerAffiliations: OWNER,
              isFork: false,
              isArchived: false
            ) {
              nodes {
                name
                url
                description
                pushedAt
                primaryLanguage { name }
                stargazerCount
              }
            }
          }
        }
        """

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://api.github.com/graphql",
                    json={"query": graphql_query, "variables": {"username": username.value}},
                    headers=self._headers,
                    timeout=10.0,
                )
                response.raise_for_status()
                data = response.json()
        except Exception:
            return {}

        if "errors" in data or not data.get("data", {}).get("user"):
            return {}

        user_data = data["data"]["user"]
        nodes = user_data.get("repositories", {}).get("nodes", [])

        # Compute total stars and top language across all repos
        total_stars = sum(n.get("stargazerCount", 0) for n in nodes)
        language_counts: Counter = Counter(
            n["primaryLanguage"]["name"]
            for n in nodes
            if n.get("primaryLanguage")
        )
        top_language = language_counts.most_common(1)[0][0] if language_counts else None

        # Years active since account creation
        created_at = user_data.get("createdAt", "")
        years_active = 0
        if created_at:
            try:
                created_year = datetime.fromisoformat(
                    created_at.replace("Z", "+00:00")
                ).year
                years_active = datetime.now(timezone.utc).year - created_year
            except ValueError:
                pass

        # Most recently pushed 4 repos
        recent_repos = [
            RecentRepository(
                name=n["name"],
                url=n["url"],
                description=n.get("description"),
                pushed_at=n.get("pushedAt", ""),
                primary_language=n["primaryLanguage"]["name"] if n.get("primaryLanguage") else None,
                stars=n.get("stargazerCount", 0),
            )
            for n in nodes[:4]
        ]

        result = {
            "total_stars": total_stars,
            "top_language": top_language,
            "years_active": years_active,
            "recent_repos": recent_repos,
        }
        self._cache.set(cache_key, result, ttl=settings.CACHE_TTL_USER)
        return result

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
