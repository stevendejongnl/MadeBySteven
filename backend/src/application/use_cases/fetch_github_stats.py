from ..dtos.github_user_dto import GitHubStatsDTO
from ...domain.repositories.github_repository import GitHubRepository
from ...domain.value_objects.username import Username
from ...infrastructure.config import settings


class FetchGitHubStats:
    """Use case: Fetch GitHub statistics"""

    def __init__(self, repository: GitHubRepository):
        self._repository = repository

    async def execute(self) -> GitHubStatsDTO:
        """
        Execute the use case with configured GitHub username.

        Returns:
            GitHubStatsDTO with statistics

        Raises:
            ValueError: If username is invalid
            Exception: If GitHub API call fails
        """
        username_vo = Username(settings.GITHUB_USERNAME)
        contributions = await self._repository.fetch_contributions(username_vo)
        return GitHubStatsDTO(contributions=contributions)
