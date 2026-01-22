from dataclasses import dataclass

from ..value_objects.username import Username


@dataclass
class GitHubUser:
    """Domain entity representing a GitHub user"""
    username: Username
    avatar_url: str
    public_repos: int
    followers: int
    name: str | None = None
    bio: str | None = None

    def __post_init__(self):
        if self.public_repos < 0:
            raise ValueError("Public repos cannot be negative")
        if self.followers < 0:
            raise ValueError("Followers cannot be negative")
