import httpx

from ...domain.entities.github_user import GitHubUser
from ...domain.repositories.github_repository import GitHubRepository
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
        """Fetch contributions for user (placeholder until GraphQL implemented)"""
        cache_key = f"stats:{username.value}"
        cached = self._cache.get(cache_key)

        if cached is not None:
            return cached

        # Placeholder: contributions require GraphQL API
        # This would need GitHub token and GraphQL query
        contributions = 0
        self._cache.set(cache_key, contributions, ttl=settings.CACHE_TTL_STATS)
        return contributions
