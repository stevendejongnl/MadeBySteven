import pytest

from ..value_objects.contribution_day import ContributionDay
from ..value_objects.contribution_week import ContributionWeek
from .contribution_calendar import ContributionCalendar


def test_contribution_calendar_valid():
    """Test creating a valid contribution calendar"""
    days = [
        ContributionDay(date=f"2024-01-{i:02d}", count=i, level=1)
        for i in range(1, 8)
    ]
    week = ContributionWeek(days=days)
    calendar = ContributionCalendar(
        weeks=[week],
        total_contributions=28,
        max_contributions_in_week=7
    )
    assert len(calendar.weeks) == 1
    assert calendar.total_contributions == 28


def test_contribution_calendar_negative_total():
    """Test that negative total contributions raises error"""
    days = [
        ContributionDay(date=f"2024-01-{i:02d}", count=0, level=0)
        for i in range(1, 8)
    ]
    week = ContributionWeek(days=days)
    with pytest.raises(ValueError, match="cannot be negative"):
        ContributionCalendar(
            weeks=[week],
            total_contributions=-1,
            max_contributions_in_week=0
        )


def test_contribution_calendar_negative_max():
    """Test that negative max contributions raises error"""
    days = [
        ContributionDay(date=f"2024-01-{i:02d}", count=0, level=0)
        for i in range(1, 8)
    ]
    week = ContributionWeek(days=days)
    with pytest.raises(ValueError, match="cannot be negative"):
        ContributionCalendar(
            weeks=[week],
            total_contributions=0,
            max_contributions_in_week=-1
        )


def test_contribution_calendar_inconsistent_data():
    """Test that empty weeks with contributions raises error"""
    with pytest.raises(ValueError, match="Cannot have contributions"):
        ContributionCalendar(
            weeks=[],
            total_contributions=10,
            max_contributions_in_week=5
        )


def test_contribution_calendar_multiple_weeks():
    """Test creating calendar with multiple weeks"""
    weeks = []
    for week_num in range(3):
        days = [
            ContributionDay(
                date=f"2024-01-{(week_num*7 + i):02d}",
                count=i,
                level=min(i, 4)
            )
            for i in range(1, 8)
        ]
        weeks.append(ContributionWeek(days=days))

    calendar = ContributionCalendar(
        weeks=weeks,
        total_contributions=84,  # 3 weeks × 28 contributions
        max_contributions_in_week=7
    )
    assert len(calendar.weeks) == 3
    assert calendar.total_contributions == 84
