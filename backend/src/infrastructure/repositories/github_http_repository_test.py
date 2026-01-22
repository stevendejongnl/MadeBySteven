import pytest

from ...domain.value_objects.username import Username
from ..cache.in_memory_cache import InMemoryCache
from .github_http_repository import GitHubHttpRepository


@pytest.mark.asyncio
async def test_fetch_user_returns_cached_data():
    # Arrange
    cache = InMemoryCache()
    cache.set("user:stevendejongnl", {
        "avatar_url": "https://github.com/stevendejongnl.png",
        "public_repos": 10,
        "followers": 5,
        "name": "Steven",
        "bio": "Developer"
    }, ttl=3600)
    repo = GitHubHttpRepository(cache)

    # Act
    user = await repo.fetch_user(Username("stevendejongnl"))

    # Assert
    assert user.username.value == "stevendejongnl"
    assert user.public_repos == 10
    assert user.followers == 5


@pytest.mark.asyncio
async def test_fetch_contributions_returns_cached_data():
    # Arrange
    cache = InMemoryCache()
    cache.set("stats:stevendejongnl", 100, ttl=1800)
    repo = GitHubHttpRepository(cache)

    # Act
    contributions = await repo.fetch_contributions(Username("stevendejongnl"))

    # Assert
    assert contributions == 100


@pytest.mark.asyncio
async def test_fetch_contributions_returns_zero_by_default():
    # Arrange
    cache = InMemoryCache()
    repo = GitHubHttpRepository(cache)

    # Act
    contributions = await repo.fetch_contributions(Username("test"))

    # Assert
    assert contributions == 0
