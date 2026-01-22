import pytest
from unittest.mock import AsyncMock

from ..dtos.github_user_dto import AggregatedStatsDTO
from .fetch_aggregated_stats import FetchAggregatedStats


@pytest.fixture
def mock_repositories():
    return [AsyncMock(), AsyncMock()]  # GitHub and GitLab


@pytest.fixture
def usernames():
    return {"github": "stevendejongnl", "gitlab": "stevendejong"}


@pytest.fixture
def use_case(mock_repositories, usernames):
    return FetchAggregatedStats(mock_repositories, usernames)


@pytest.mark.asyncio
async def test_execute_aggregates_contributions(use_case, mock_repositories):
    """Test that execute aggregates contributions from multiple sources"""
    mock_repositories[0].fetch_contributions.return_value = 1234
    mock_repositories[1].fetch_contributions.return_value = 567

    result = await use_case.execute()

    assert isinstance(result, AggregatedStatsDTO)
    assert result.total_contributions == 1801
    assert result.source_breakdown["github"] == 1234
    assert result.source_breakdown["gitlab"] == 567


@pytest.mark.asyncio
async def test_execute_fetches_in_parallel(use_case, mock_repositories):
    """Test that contributions are fetched from all sources"""
    mock_repositories[0].fetch_contributions.return_value = 100
    mock_repositories[1].fetch_contributions.return_value = 200

    result = await use_case.execute()

    # Verify both repositories were called
    mock_repositories[0].fetch_contributions.assert_called_once()
    mock_repositories[1].fetch_contributions.assert_called_once()
    assert result.total_contributions == 300


@pytest.mark.asyncio
async def test_execute_handles_partial_failure(use_case, mock_repositories):
    """Test that aggregation continues even if one source fails"""
    mock_repositories[0].fetch_contributions.return_value = 1000
    mock_repositories[1].fetch_contributions.side_effect = Exception("API error")

    result = await use_case.execute()

    assert result.total_contributions == 1000
    assert result.source_breakdown["github"] == 1000
    assert result.source_breakdown["gitlab"] == 0


@pytest.mark.asyncio
async def test_execute_handles_all_sources_failing(use_case, mock_repositories):
    """Test that aggregation returns zero when all sources fail"""
    mock_repositories[0].fetch_contributions.side_effect = Exception("GitHub error")
    mock_repositories[1].fetch_contributions.side_effect = Exception("GitLab error")

    result = await use_case.execute()

    assert result.total_contributions == 0
    assert result.source_breakdown["github"] == 0
    assert result.source_breakdown["gitlab"] == 0


@pytest.mark.asyncio
async def test_execute_with_empty_contributions(use_case, mock_repositories):
    """Test that zero contributions are handled correctly"""
    mock_repositories[0].fetch_contributions.return_value = 0
    mock_repositories[1].fetch_contributions.return_value = 0

    result = await use_case.execute()

    assert result.total_contributions == 0
    assert result.source_breakdown["github"] == 0
    assert result.source_breakdown["gitlab"] == 0


def test_execute_raises_on_mismatched_repositories(mock_repositories):
    """Test that ValueError is raised if repositories and usernames don't match"""
    usernames = {"github": "user1", "gitlab": "user2", "gitea": "user3"}
    use_case = FetchAggregatedStats(mock_repositories, usernames)

    with pytest.raises(ValueError):
        import asyncio
        asyncio.run(use_case.execute())
