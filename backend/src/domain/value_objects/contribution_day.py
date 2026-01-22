from dataclasses import dataclass


@dataclass(frozen=True)
class ContributionDay:
    """Value object for a single day's contribution data"""
    date: str  # ISO format: YYYY-MM-DD
    count: int  # Number of contributions
    level: int  # 0-4, representing intensity

    def __post_init__(self):
        if self.count < 0:
            raise ValueError("Contribution count cannot be negative")
        if not 0 <= self.level <= 4:
            raise ValueError("Contribution level must be between 0 and 4")
        # Validate date format (ISO format: YYYY-MM-DD)
        try:
            parts = self.date.split('-')
            if len(parts) != 3 or len(parts[0]) != 4 or len(parts[1]) != 2 or len(parts[2]) != 2:
                raise ValueError()
            int(parts[0])  # Validate year is numeric
            month = int(parts[1])
            day = int(parts[2])
            # Basic month/day validation
            if not 1 <= month <= 12:
                raise ValueError()
            if not 1 <= day <= 31:
                raise ValueError()
        except (ValueError, IndexError):
            raise ValueError(f"Invalid date format: {self.date}. Expected YYYY-MM-DD")
