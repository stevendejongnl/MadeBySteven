import pytest

from .contribution_day import ContributionDay


def test_contribution_day_valid():
    """Test creating a valid contribution day"""
    day = ContributionDay(date="2024-01-15", count=5, level=2)
    assert day.date == "2024-01-15"
    assert day.count == 5
    assert day.level == 2


def test_contribution_day_negative_count():
    """Test that negative contribution count raises error"""
    with pytest.raises(ValueError, match="cannot be negative"):
        ContributionDay(date="2024-01-15", count=-1, level=2)


def test_contribution_day_invalid_level_too_high():
    """Test that level > 4 raises error"""
    with pytest.raises(ValueError, match="must be between 0 and 4"):
        ContributionDay(date="2024-01-15", count=5, level=5)


def test_contribution_day_invalid_level_negative():
    """Test that negative level raises error"""
    with pytest.raises(ValueError, match="must be between 0 and 4"):
        ContributionDay(date="2024-01-15", count=5, level=-1)


def test_contribution_day_level_zero():
    """Test that level 0 is valid"""
    day = ContributionDay(date="2024-01-15", count=0, level=0)
    assert day.level == 0


def test_contribution_day_level_four():
    """Test that level 4 is valid"""
    day = ContributionDay(date="2024-01-15", count=10, level=4)
    assert day.level == 4


def test_contribution_day_invalid_date_format():
    """Test that invalid date format raises error"""
    with pytest.raises(ValueError, match="Invalid date format"):
        ContributionDay(date="01-15-2024", count=5, level=2)


def test_contribution_day_invalid_date_month():
    """Test that invalid month raises error"""
    with pytest.raises(ValueError, match="Invalid date format"):
        ContributionDay(date="2024-13-01", count=5, level=2)


def test_contribution_day_frozen():
    """Test that contribution day is immutable"""
    day = ContributionDay(date="2024-01-15", count=5, level=2)
    with pytest.raises(AttributeError):
        day.count = 10
