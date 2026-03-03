from pydantic import BaseModel


class RecentRepositoryDTO(BaseModel):
    """Data Transfer Object for a recently pushed GitHub repository"""
    name: str
    url: str
    description: str | None = None
    pushed_at: str
    primary_language: str | None = None
    stars: int = 0


class GitHubUserDTO(BaseModel):
    """Data Transfer Object for GitHub user"""
    login: str
    avatar_url: str
    public_repos: int
    followers: int
    name: str | None = None
    bio: str | None = None
    total_stars: int = 0
    top_language: str | None = None
    years_active: int = 0
    recent_repos: list[RecentRepositoryDTO] = []


class GitHubStatsDTO(BaseModel):
    """Data Transfer Object for GitHub stats (legacy)"""
    contributions: int


class AggregatedStatsDTO(BaseModel):
    """Data Transfer Object for aggregated statistics from multiple sources"""
    total_contributions: int
    source_breakdown: dict[str, int]
