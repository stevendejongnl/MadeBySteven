from abc import ABC, abstractmethod

from ..entities.github_user import GitHubUser
from ..value_objects.username import Username


class GitHubRepository(ABC):
    """Repository interface for GitHub data"""

    @abstractmethod
    async def fetch_user(self, username: Username) -> GitHubUser:
        """Fetch user by username"""
        pass

    @abstractmethod
    async def fetch_contributions(self, username: Username) -> int:
        """Fetch contribution count for username"""
        pass
