import pytest
from unittest.mock import AsyncMock

from .fetch_github_stats import FetchGitHubStats


@pytest.mark.asyncio
async def test_fetch_github_stats():
    # Arrange
    mock_repo = AsyncMock()
    mock_repo.fetch_contributions.return_value = 100
    use_case = FetchGitHubStats(mock_repo)

    # Act
    result = await use_case.execute()

    # Assert
    assert result.contributions == 100
    mock_repo.fetch_contributions.assert_called_once()
