from .contribution_dto import (
    ContributionDayDTO,
    ContributionWeekDTO,
    GitHubContributionsDTO,
)


def test_contribution_day_dto_valid():
    """Test creating valid contribution day DTO"""
    day = ContributionDayDTO(date="2024-01-15", count=5, level=2)
    assert day.date == "2024-01-15"
    assert day.count == 5
    assert day.level == 2


def test_contribution_day_dto_from_dict():
    """Test creating DTO from dict"""
    data = {"date": "2024-01-15", "count": 10, "level": 3}
    day = ContributionDayDTO(**data)
    assert day.count == 10


def test_contribution_week_dto_valid():
    """Test creating valid contribution week DTO"""
    days = [
        ContributionDayDTO(date=f"2024-01-{i:02d}", count=i, level=1)
        for i in range(1, 8)
    ]
    week = ContributionWeekDTO(days=days)
    assert len(week.days) == 7


def test_contributions_dto_valid():
    """Test creating valid contributions DTO"""
    days = [
        ContributionDayDTO(date=f"2024-01-{i:02d}", count=i, level=1)
        for i in range(1, 8)
    ]
    week = ContributionWeekDTO(days=days)
    contributions = GitHubContributionsDTO(
        weeks=[week], total_contributions=28, max_contributions=7
    )
    assert len(contributions.weeks) == 1
    assert contributions.total_contributions == 28
    assert contributions.max_contributions == 7


def test_contributions_dto_serialization():
    """Test that DTOs can be serialized to JSON"""
    days = [
        ContributionDayDTO(date="2024-01-01", count=1, level=1),
        ContributionDayDTO(date="2024-01-02", count=2, level=2),
    ]
    week = ContributionWeekDTO(days=days[:1])  # Only 1 day for simplicity
    contributions = GitHubContributionsDTO(
        weeks=[week], total_contributions=1, max_contributions=1
    )

    # Should be JSON serializable
    json_data = contributions.model_dump_json()
    assert "weeks" in json_data
    assert "total_contributions" in json_data
