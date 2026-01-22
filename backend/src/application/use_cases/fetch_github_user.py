from ..dtos.github_user_dto import GitHubUserDTO
from ...domain.repositories.github_repository import GitHubRepository
from ...domain.value_objects.username import Username


class FetchGitHubUser:
    """Use case: Fetch GitHub user profile"""

    def __init__(self, repository: GitHubRepository):
        self._repository = repository

    async def execute(self, username: str) -> GitHubUserDTO:
        """
        Execute the use case with a username string.

        Args:
            username: GitHub username as string

        Returns:
            GitHubUserDTO with user information

        Raises:
            ValueError: If username is invalid
            Exception: If GitHub API call fails
        """
        username_vo = Username(username)
        user = await self._repository.fetch_user(username_vo)

        return GitHubUserDTO(
            login=user.username.value,
            avatar_url=user.avatar_url,
            public_repos=user.public_repos,
            followers=user.followers,
            name=user.name,
            bio=user.bio
        )
