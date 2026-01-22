import pytest
from unittest.mock import AsyncMock

from ...domain.entities.github_user import GitHubUser
from ...domain.value_objects.username import Username
from .fetch_github_user import FetchGitHubUser


@pytest.mark.asyncio
async def test_fetch_github_user():
    # Arrange
    mock_repo = AsyncMock()
    mock_repo.fetch_user.return_value = GitHubUser(
        username=Username("stevendejongnl"),
        avatar_url="https://github.com/stevendejongnl.png",
        public_repos=10,
        followers=5,
        name="Steven",
        bio="Developer"
    )
    use_case = FetchGitHubUser(mock_repo)

    # Act
    result = await use_case.execute()

    # Assert
    assert result.login == "stevendejongnl"
    assert result.public_repos == 10
    assert result.followers == 5
    assert result.name == "Steven"
    mock_repo.fetch_user.assert_called_once()
