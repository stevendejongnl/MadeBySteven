from ..dtos.contribution_dto import (
    ContributionDayDTO,
    ContributionWeekDTO,
    GitHubContributionsDTO,
)
from ...domain.repositories.github_repository import GitHubRepository
from ...domain.value_objects.username import Username
from ...infrastructure.config import settings


class FetchGitHubContributions:
    """Use case: Fetch GitHub contribution calendar"""

    def __init__(self, repository: GitHubRepository):
        self._repository = repository

    async def execute(self) -> GitHubContributionsDTO:
        """
        Execute the use case with configured GitHub username.

        Returns:
            GitHubContributionsDTO with 365 days of contribution data

        Raises:
            ValueError: If username is invalid
            Exception: If GitHub API call fails
        """
        username_vo = Username(settings.GITHUB_USERNAME)
        calendar = await self._repository.fetch_contribution_calendar(username_vo)

        # Calculate max contributions across all days
        max_contributions = 0
        for week in calendar.weeks:
            for day in week.days:
                max_contributions = max(max_contributions, day.count)

        # Map domain entity to DTO
        weeks_dto = []
        for week in calendar.weeks:
            days_dto = []
            for day in week.days:
                # Calculate level (0-4) based on contribution count
                level = self._calculate_level(day.count, max_contributions)
                days_dto.append(
                    ContributionDayDTO(date=day.date, count=day.count, level=level)
                )
            weeks_dto.append(ContributionWeekDTO(days=days_dto))

        return GitHubContributionsDTO(
            weeks=weeks_dto,
            total_contributions=calendar.total_contributions,
            max_contributions=max_contributions,
        )

    def _calculate_level(self, count: int, max_count: int) -> int:
        """
        Calculate contribution intensity level (0-4).

        Args:
            count: Number of contributions on this day
            max_count: Maximum contributions across all days

        Returns:
            Level 0-4 based on contribution intensity

        Strategy: Percentile-based thresholds
        - Level 0: No contributions
        - Level 1-4: Based on percentage of maximum (25%, 50%, 75% splits)
        """
        if count == 0:
            return 0
        if max_count == 0:
            return 0

        # Calculate percentage of maximum
        percentage = (count / max_count) * 100

        # Percentile-based level assignment
        if percentage <= 25:
            return 1
        elif percentage <= 50:
            return 2
        elif percentage <= 75:
            return 3
        else:
            return 4
