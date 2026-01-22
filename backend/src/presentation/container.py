from dependency_injector import containers, providers

from ..application.use_cases.fetch_aggregated_contributions import FetchAggregatedContributions
from ..application.use_cases.fetch_aggregated_stats import FetchAggregatedStats
from ..application.use_cases.fetch_github_contributions import FetchGitHubContributions
from ..application.use_cases.fetch_github_stats import FetchGitHubStats
from ..application.use_cases.fetch_github_user import FetchGitHubUser
from ..application.use_cases.fetch_gitlab_contributions import FetchGitLabContributions
from ..infrastructure.cache.in_memory_cache import InMemoryCache
from ..infrastructure.repositories.github_http_repository import GitHubHttpRepository
from ..infrastructure.repositories.gitlab_http_repository import GitLabHttpRepository
from ..infrastructure.config import settings


class Container(containers.DeclarativeContainer):
    """Dependency injection container for the application"""

    # Infrastructure
    cache = providers.Singleton(InMemoryCache)
    github_repository = providers.Factory(
        GitHubHttpRepository,
        cache=cache
    )
    gitlab_repository = providers.Factory(
        GitLabHttpRepository,
        cache=cache
    )

    # Application
    fetch_github_user_use_case = providers.Factory(
        FetchGitHubUser,
        repository=github_repository
    )
    fetch_github_stats_use_case = providers.Factory(
        FetchGitHubStats,
        repository=github_repository
    )
    fetch_github_contributions_use_case = providers.Factory(
        FetchGitHubContributions,
        repository=github_repository
    )
    fetch_gitlab_contributions_use_case = providers.Factory(
        FetchGitLabContributions,
        repository=gitlab_repository
    )
    fetch_aggregated_stats_use_case = providers.Factory(
        FetchAggregatedStats,
        repositories=providers.List(github_repository, gitlab_repository),
        usernames=providers.Dict({
            "github": settings.GITHUB_USERNAME,
            "gitlab": settings.GITLAB_USERNAME,
        })
    )
    fetch_aggregated_contributions_use_case = providers.Factory(
        FetchAggregatedContributions,
        repositories=providers.List(github_repository, gitlab_repository),
        usernames=providers.Dict({
            "github": settings.GITHUB_USERNAME,
            "gitlab": settings.GITLAB_USERNAME,
        })
    )
