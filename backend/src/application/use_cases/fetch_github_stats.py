from ..dtos.github_user_dto import GitHubStatsDTO
from ...domain.repositories.github_repository import GitHubRepository
from ...domain.value_objects.username import Username


class FetchGitHubStats:
    """Use case: Fetch GitHub statistics"""

    def __init__(self, repository: GitHubRepository):
        self._repository = repository

    async def execute(self, username: str) -> GitHubStatsDTO:
        """
        Execute the use case with a username string.

        Args:
            username: GitHub username as string

        Returns:
            GitHubStatsDTO with statistics

        Raises:
            ValueError: If username is invalid
            Exception: If GitHub API call fails
        """
        username_vo = Username(username)
        contributions = await self._repository.fetch_contributions(username_vo)
        return GitHubStatsDTO(contributions=contributions)
