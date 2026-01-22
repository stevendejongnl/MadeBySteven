from pydantic import BaseModel


class ContributionDayDTO(BaseModel):
    """Data Transfer Object for a single day's contribution data"""
    date: str
    count: int
    level: int


class ContributionWeekDTO(BaseModel):
    """Data Transfer Object for a week of contribution data"""
    days: list[ContributionDayDTO]


class GitHubContributionsDTO(BaseModel):
    """Data Transfer Object for GitHub contribution calendar"""
    weeks: list[ContributionWeekDTO]
    total_contributions: int
    max_contributions: int
