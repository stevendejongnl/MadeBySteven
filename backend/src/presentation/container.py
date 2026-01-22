from dependency_injector import containers, providers

from ..application.use_cases.fetch_github_stats import FetchGitHubStats
from ..application.use_cases.fetch_github_user import FetchGitHubUser
from ..infrastructure.cache.in_memory_cache import InMemoryCache
from ..infrastructure.repositories.github_http_repository import GitHubHttpRepository


class Container(containers.DeclarativeContainer):
    """Dependency injection container for the application"""

    # Infrastructure
    cache = providers.Singleton(InMemoryCache)
    github_repository = providers.Factory(
        GitHubHttpRepository,
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
