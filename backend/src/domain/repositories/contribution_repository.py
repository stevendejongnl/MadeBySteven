from abc import ABC, abstractmethod

from ..entities.contribution_calendar import ContributionCalendar
from ..value_objects.username import Username


class ContributionRepository(ABC):
    """Generic repository interface for contribution data from any source"""

    @abstractmethod
    async def fetch_contributions(self, username: Username) -> int:
        """Fetch total contribution count for username"""
        pass

    @abstractmethod
    async def fetch_contribution_calendar(self, username: Username) -> ContributionCalendar:
        """Fetch contribution calendar for username (365 days)"""
        pass
