import pytest
from unittest.mock import MagicMock, patch
import httpx

from ...domain.entities.contribution_calendar import ContributionCalendar
from ...domain.value_objects.username import Username
from ..cache.in_memory_cache import InMemoryCache
from .gitlab_http_repository import GitLabHttpRepository


@pytest.fixture
def cache():
    return InMemoryCache()


@pytest.fixture
def repository(cache):
    return GitLabHttpRepository(cache)


@pytest.mark.asyncio
async def test_fetch_contributions_returns_total(repository):
    """Test that fetch_contributions returns the total contribution count"""
    calendar_data = {
        "2026-01-01": 5,
        "2026-01-02": 3,
        "2026-01-03": 8,
        "2026-01-04": 0,
        "2026-01-05": 2,
    }

    mock_response = MagicMock()
    mock_response.json = MagicMock(return_value=calendar_data)
    mock_response.raise_for_status = MagicMock()

    mock_client = MagicMock()
    async def mock_get_method(*args, **kwargs):
        return mock_response
    mock_client.get = mock_get_method

    class MockAsyncClient:
        def __init__(self, *args, **kwargs):
            pass
        async def __aenter__(self):
            return mock_client
        async def __aexit__(self, *args):
            pass

    with patch("httpx.AsyncClient", MockAsyncClient):
        username = Username("stevendejong")
        result = await repository.fetch_contributions(username)

        assert result == 18  # 5 + 3 + 8 + 0 + 2


@pytest.mark.asyncio
async def test_fetch_contributions_uses_cache(repository):
    """Test that fetch_contributions uses cache on second call"""
    calendar_data = {"2026-01-01": 5}
    call_count = [0]

    mock_response = MagicMock()
    mock_response.json = MagicMock(return_value=calendar_data)
    mock_response.raise_for_status = MagicMock()

    async def mock_get_method(*args, **kwargs):
        call_count[0] += 1
        return mock_response

    mock_client = MagicMock()
    mock_client.get = mock_get_method

    class MockAsyncClient:
        def __init__(self, *args, **kwargs):
            pass
        async def __aenter__(self):
            return mock_client
        async def __aexit__(self, *args):
            pass

    with patch("httpx.AsyncClient", MockAsyncClient):
        username = Username("stevendejong")
        # First call
        result1 = await repository.fetch_contributions(username)
        # Second call (should use cache)
        result2 = await repository.fetch_contributions(username)

        # Should only make one HTTP request
        assert call_count[0] == 1
        assert result1 == result2 == 5


@pytest.mark.asyncio
async def test_fetch_contribution_calendar_transforms_data(repository):
    """Test that calendar data is transformed correctly"""
    calendar_data = {
        "2026-01-04": 1,  # Sunday
        "2026-01-05": 2,  # Monday
        "2026-01-06": 3,  # Tuesday
        "2026-01-07": 4,  # Wednesday
        "2026-01-08": 5,  # Thursday
        "2026-01-09": 6,  # Friday
        "2026-01-10": 7,  # Saturday
    }

    mock_response = MagicMock()
    mock_response.json = MagicMock(return_value=calendar_data)
    mock_response.raise_for_status = MagicMock()

    async def mock_get_method(*args, **kwargs):
        return mock_response

    mock_client = MagicMock()
    mock_client.get = mock_get_method

    class MockAsyncClient:
        def __init__(self, *args, **kwargs):
            pass
        async def __aenter__(self):
            return mock_client
        async def __aexit__(self, *args):
            pass

    with patch("httpx.AsyncClient", MockAsyncClient):
        username = Username("stevendejong")
        result = await repository.fetch_contribution_calendar(username)

        assert isinstance(result, ContributionCalendar)
        assert result.total_contributions == 28  # Sum of all values
        assert result.max_contributions_in_week == 7
        # Should have at least 1 week with the 7 days (2026-01-04 to 2026-01-10)
        assert len(result.weeks) >= 1
        # Check the last week has all 7 days
        assert len(result.weeks[-1].days) == 7


@pytest.mark.asyncio
async def test_fetch_contribution_calendar_handles_404(repository):
    """Test that 404 error returns empty calendar"""
    async def mock_get_method(*args, **kwargs):
        raise httpx.HTTPStatusError(
            "404 Not Found",
            request=MagicMock(),
            response=MagicMock(status_code=404),
        )

    mock_client = MagicMock()
    mock_client.get = mock_get_method

    class MockAsyncClient:
        def __init__(self, *args, **kwargs):
            pass
        async def __aenter__(self):
            return mock_client
        async def __aexit__(self, *args):
            pass

    with patch("httpx.AsyncClient", MockAsyncClient):
        username = Username("nonexistent")
        result = await repository.fetch_contribution_calendar(username)

        assert result.weeks == []
        assert result.total_contributions == 0


@pytest.mark.asyncio
async def test_fetch_contributions_handles_empty_calendar(repository):
    """Test that empty calendar returns 0 contributions"""
    mock_response = MagicMock()
    mock_response.json = MagicMock(return_value={})
    mock_response.raise_for_status = MagicMock()

    async def mock_get_method(*args, **kwargs):
        return mock_response

    mock_client = MagicMock()
    mock_client.get = mock_get_method

    class MockAsyncClient:
        def __init__(self, *args, **kwargs):
            pass
        async def __aenter__(self):
            return mock_client
        async def __aexit__(self, *args):
            pass

    with patch("httpx.AsyncClient", MockAsyncClient):
        username = Username("stevendejong")
        result = await repository.fetch_contributions(username)

        assert result == 0


@pytest.mark.asyncio
async def test_fetch_contributions_handles_errors_gracefully(repository):
    """Test that errors during calendar fetch return 0"""
    async def mock_get_method(*args, **kwargs):
        raise Exception("Network error")

    mock_client = MagicMock()
    mock_client.get = mock_get_method

    class MockAsyncClient:
        def __init__(self, *args, **kwargs):
            pass
        async def __aenter__(self):
            return mock_client
        async def __aexit__(self, *args):
            pass

    with patch("httpx.AsyncClient", MockAsyncClient):
        username = Username("stevendejong")
        result = await repository.fetch_contributions(username)

        assert result == 0
