import pytest
from unittest.mock import AsyncMock, MagicMock, patch

from ...domain.entities.contribution_calendar import ContributionCalendar
from ...domain.value_objects.contribution_day import ContributionDay
from ...domain.value_objects.contribution_week import ContributionWeek
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


@pytest.mark.asyncio
async def test_fetch_contribution_calendar_returns_cached_data():
    """Test that cached calendar is returned without API call"""
    # Arrange
    days = [
        ContributionDay(date=f"2024-01-{i:02d}", count=i, level=0)
        for i in range(1, 8)
    ]
    week = ContributionWeek(days=days)
    calendar = ContributionCalendar(
        weeks=[week], total_contributions=28, max_contributions_in_week=7
    )

    cache = InMemoryCache()
    cache.set("contributions_calendar:test", calendar, ttl=14400)
    repo = GitHubHttpRepository(cache)

    # Act
    result = await repo.fetch_contribution_calendar(Username("test"))

    # Assert
    assert result.total_contributions == 28
    assert len(result.weeks) == 1


@pytest.mark.asyncio
async def test_fetch_contribution_calendar_graphql_error():
    """Test that GraphQL errors are handled gracefully"""
    # Arrange
    cache = InMemoryCache()
    repo = GitHubHttpRepository(cache)

    mock_response = MagicMock()
    mock_response.json.return_value = {"errors": [{"message": "Not Found"}]}
    mock_response.raise_for_status.return_value = None

    with patch("httpx.AsyncClient") as mock_client_class:
        mock_client = AsyncMock()
        mock_client.__aenter__.return_value = mock_client
        mock_client.__aexit__.return_value = None
        mock_client.post.return_value = mock_response
        mock_client_class.return_value = mock_client

        # Act & Assert
        with pytest.raises(Exception, match="GitHub GraphQL error"):
            await repo.fetch_contribution_calendar(Username("nonexistent"))


@pytest.mark.asyncio
async def test_fetch_contribution_calendar_graphql_rate_limit():
    """Test that GraphQL rate limit errors return empty calendar"""
    # Arrange
    cache = InMemoryCache()
    repo = GitHubHttpRepository(cache)

    mock_response = MagicMock()
    mock_response.json.return_value = {
        "errors": [{"message": "API rate limit exceeded"}]
    }
    mock_response.raise_for_status.return_value = None

    with patch("httpx.AsyncClient") as mock_client_class:
        mock_client = AsyncMock()
        mock_client.__aenter__.return_value = mock_client
        mock_client.__aexit__.return_value = None
        mock_client.post.return_value = mock_response
        mock_client_class.return_value = mock_client

        # Act
        result = await repo.fetch_contribution_calendar(Username("test"))

        # Assert - should return empty calendar on rate limit error
        assert result.weeks == []
        assert result.total_contributions == 0
        assert result.max_contributions_in_week == 0


@pytest.mark.asyncio
async def test_fetch_contribution_calendar_empty_response():
    """Test that empty response returns empty calendar"""
    # Arrange
    cache = InMemoryCache()
    repo = GitHubHttpRepository(cache)

    mock_response = MagicMock()
    mock_response.json.return_value = {
        "data": {"user": {"contributionsCollection": {"contributionCalendar": {
            "totalContributions": 0,
            "weeks": []
        }}}}
    }
    mock_response.raise_for_status.return_value = None

    with patch("httpx.AsyncClient") as mock_client_class:
        mock_client = AsyncMock()
        mock_client.__aenter__.return_value = mock_client
        mock_client.__aexit__.return_value = None
        mock_client.post.return_value = mock_response
        mock_client_class.return_value = mock_client

        # Act
        result = await repo.fetch_contribution_calendar(Username("test"))

        # Assert
        assert result.total_contributions == 0
        assert len(result.weeks) == 0
