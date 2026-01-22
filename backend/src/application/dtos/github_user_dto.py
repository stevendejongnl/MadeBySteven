from pydantic import BaseModel


class GitHubUserDTO(BaseModel):
    """Data Transfer Object for GitHub user"""
    login: str
    avatar_url: str
    public_repos: int
    followers: int
    name: str | None = None
    bio: str | None = None


class GitHubStatsDTO(BaseModel):
    """Data Transfer Object for GitHub stats"""
    contributions: int
