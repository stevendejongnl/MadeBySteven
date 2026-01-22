from dataclasses import dataclass

from .contribution_day import ContributionDay


@dataclass(frozen=True)
class ContributionWeek:
    """Value object for a week of contribution data (7 days)"""
    days: list[ContributionDay]

    def __post_init__(self):
        if len(self.days) != 7:
            raise ValueError("A week must have exactly 7 days")
