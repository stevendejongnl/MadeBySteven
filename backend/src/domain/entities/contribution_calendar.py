from dataclasses import dataclass

from ..value_objects.contribution_week import ContributionWeek


@dataclass
class ContributionCalendar:
    """Domain entity representing a GitHub contribution calendar"""
    weeks: list[ContributionWeek]
    total_contributions: int
    max_contributions_in_week: int

    def __post_init__(self):
        if self.total_contributions < 0:
            raise ValueError("Total contributions cannot be negative")
        if self.max_contributions_in_week < 0:
            raise ValueError("Max contributions cannot be negative")
        if not self.weeks and self.total_contributions > 0:
            raise ValueError("Cannot have contributions with empty weeks")
