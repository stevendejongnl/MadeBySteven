from abc import abstractmethod

from ..entities.github_user import GitHubUser
from ..value_objects.username import Username
from .contribution_repository import ContributionRepository


class GitHubRepository(ContributionRepository):
    """Repository interface for GitHub data"""

    @abstractmethod
    async def fetch_user(self, username: Username) -> GitHubUser:
        """Fetch user by username"""
        pass
