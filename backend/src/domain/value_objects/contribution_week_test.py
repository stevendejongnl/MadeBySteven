import pytest

from .contribution_day import ContributionDay
from .contribution_week import ContributionWeek


def test_contribution_week_valid():
    """Test creating a valid contribution week"""
    days = [
        ContributionDay(date=f"2024-01-{i:02d}", count=i, level=1)
        for i in range(1, 8)
    ]
    week = ContributionWeek(days=days)
    assert len(week.days) == 7
    assert week.days[0].date == "2024-01-01"


def test_contribution_week_wrong_length():
    """Test that week with wrong number of days raises error"""
    days = [
        ContributionDay(date=f"2024-01-{i:02d}", count=i, level=1)
        for i in range(1, 6)  # Only 5 days
    ]
    with pytest.raises(ValueError, match="must have exactly 7 days"):
        ContributionWeek(days=days)


def test_contribution_week_too_many_days():
    """Test that week with more than 7 days raises error"""
    days = [
        ContributionDay(date=f"2024-01-{i:02d}", count=i, level=1)
        for i in range(1, 10)  # 9 days
    ]
    with pytest.raises(ValueError, match="must have exactly 7 days"):
        ContributionWeek(days=days)


def test_contribution_week_frozen():
    """Test that contribution week is immutable"""
    days = [
        ContributionDay(date=f"2024-01-{i:02d}", count=i, level=1)
        for i in range(1, 8)
    ]
    week = ContributionWeek(days=days)
    with pytest.raises(AttributeError):
        week.days = []
