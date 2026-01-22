from dataclasses import dataclass


@dataclass(frozen=True)
class Username:
    """Value object for GitHub username with validation"""
    value: str

    def __post_init__(self):
        if not self.value:
            raise ValueError("Username cannot be empty")
        if len(self.value) > 39:  # GitHub's max username length
            raise ValueError("Username too long")
        if not all(c.isalnum() or c == '-' for c in self.value):
            raise ValueError("Username contains invalid characters")
