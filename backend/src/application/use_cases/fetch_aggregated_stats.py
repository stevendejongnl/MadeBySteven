import asyncio

from ..dtos.github_user_dto import AggregatedStatsDTO
from ...domain.repositories.contribution_repository import ContributionRepository
from ...domain.value_objects.username import Username


class FetchAggregatedStats:
    """Use case: Fetch and aggregate statistics from multiple contribution sources"""

    def __init__(
        self,
        repositories: list[ContributionRepository],
        usernames: dict[str, str],
    ):
        """
        Initialize the use case.

        Args:
            repositories: List of ContributionRepository implementations
            usernames: Mapping of source name to username (e.g., {"github": "stevendejongnl", "gitlab": "stevendejong"})
        """
        self._repositories = repositories
        self._usernames = usernames

    async def execute(self) -> AggregatedStatsDTO:
        """
        Execute the use case to fetch and aggregate statistics.

        Returns:
            AggregatedStatsDTO with total contributions and per-source breakdown

        Raises:
            ValueError: If repositories and usernames don't match
            Exception: If all sources fail to fetch data
        """
        if len(self._repositories) != len(self._usernames):
            raise ValueError("Number of repositories must match number of usernames")

        # Fetch contributions from all sources in parallel
        source_names = list(self._usernames.keys())
        tasks = [
            self._fetch_contributions_safe(repo, username)
            for repo, username in zip(self._repositories, self._usernames.values())
        ]

        results = await asyncio.gather(*tasks)

        # Aggregate results
        total_contributions = 0
        source_breakdown = {}

        for source_name, contributions in zip(source_names, results):
            source_breakdown[source_name] = contributions
            total_contributions += contributions

        return AggregatedStatsDTO(
            total_contributions=total_contributions,
            source_breakdown=source_breakdown,
        )

    async def _fetch_contributions_safe(
        self, repository: ContributionRepository, username: str
    ) -> int:
        """
        Safely fetch contributions, returning 0 on error.

        Args:
            repository: Repository to fetch from
            username: Username to fetch for

        Returns:
            Contribution count, or 0 if fetch fails
        """
        try:
            username_vo = Username(username)
            return await repository.fetch_contributions(username_vo)
        except Exception as e:
            # Log error but don't fail - return 0 for this source
            import logging
            logger = logging.getLogger(__name__)
            logger.warning(f"Failed to fetch contributions from {repository.__class__.__name__}: {e}")
            return 0
