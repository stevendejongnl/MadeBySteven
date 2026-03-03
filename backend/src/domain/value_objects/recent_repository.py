from dataclasses import dataclass


@dataclass(frozen=True)
class RecentRepository:
    """Value object for a recently pushed GitHub repository"""
    name: str
    url: str
    description: str | None
    pushed_at: str
    primary_language: str | None
    stars: int
