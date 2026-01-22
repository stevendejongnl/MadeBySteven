import pytest
from unittest.mock import AsyncMock, patch

from ...domain.entities.contribution_calendar import ContributionCalendar
from ...domain.value_objects.contribution_day import ContributionDay
from ...domain.value_objects.contribution_week import ContributionWeek
from ..dtos.contribution_dto import GitLabContributionsDTO
from .fetch_gitlab_contributions import FetchGitLabContributions


@pytest.fixture
def mock_repository():
    return AsyncMock()


@pytest.fixture
def use_case(mock_repository):
    return FetchGitLabContributions(mock_repository)


@pytest.mark.asyncio
async def test_execute_returns_contributions_dto(use_case, mock_repository):
    """Test that execute returns GitLabContributionsDTO with correct structure"""
    # Create test data with 1 week
    days = [
        ContributionDay(date="2026-01-04", count=0, level=0),
        ContributionDay(date="2026-01-05", count=5, level=1),
        ContributionDay(date="2026-01-06", count=10, level=2),
        ContributionDay(date="2026-01-07", count=15, level=3),
        ContributionDay(date="2026-01-08", count=20, level=4),
        ContributionDay(date="2026-01-09", count=15, level=3),
        ContributionDay(date="2026-01-10", count=10, level=2),
    ]
    week = ContributionWeek(days=days)
    calendar = ContributionCalendar(
        weeks=[week], total_contributions=75, max_contributions_in_week=20
    )

    mock_repository.fetch_contribution_calendar.return_value = calendar

    with patch("src.infrastructure.config.settings") as mock_settings:
        mock_settings.GITLAB_USERNAME = "stevendejong"
        result = await use_case.execute()

        assert isinstance(result, GitLabContributionsDTO)
        assert result.total_contributions == 75
        assert result.max_contributions == 20
        assert len(result.weeks) == 1
        assert len(result.weeks[0].days) == 7


@pytest.mark.asyncio
async def test_execute_calculates_levels_correctly(use_case, mock_repository):
    """Test that contribution levels are calculated correctly"""
    # Create test data where max is 20
    days = [
        ContributionDay(date="2026-01-04", count=0, level=0),
        ContributionDay(date="2026-01-05", count=5, level=0),  # 25% → level 1
        ContributionDay(date="2026-01-06", count=10, level=0),  # 50% → level 2
        ContributionDay(date="2026-01-07", count=15, level=0),  # 75% → level 3
        ContributionDay(date="2026-01-08", count=20, level=0),  # 100% → level 4
        ContributionDay(date="2026-01-09", count=0, level=0),
        ContributionDay(date="2026-01-10", count=0, level=0),
    ]
    week = ContributionWeek(days=days)
    calendar = ContributionCalendar(
        weeks=[week], total_contributions=50, max_contributions_in_week=20
    )

    mock_repository.fetch_contribution_calendar.return_value = calendar

    with patch("src.infrastructure.config.settings") as mock_settings:
        mock_settings.GITLAB_USERNAME = "stevendejong"
        result = await use_case.execute()

        # Check levels are calculated correctly
        assert result.weeks[0].days[0].level == 0  # 0 contributions
        assert result.weeks[0].days[1].level == 1  # 5/20 = 25%
        assert result.weeks[0].days[2].level == 2  # 10/20 = 50%
        assert result.weeks[0].days[3].level == 3  # 15/20 = 75%
        assert result.weeks[0].days[4].level == 4  # 20/20 = 100%


@pytest.mark.asyncio
async def test_execute_handles_empty_calendar(use_case, mock_repository):
    """Test that empty calendar returns valid DTO with zero values"""
    calendar = ContributionCalendar(weeks=[], total_contributions=0, max_contributions_in_week=0)
    mock_repository.fetch_contribution_calendar.return_value = calendar

    with patch("src.infrastructure.config.settings") as mock_settings:
        mock_settings.GITLAB_USERNAME = "stevendejong"
        result = await use_case.execute()

        assert result.total_contributions == 0
        assert result.max_contributions == 0
        assert len(result.weeks) == 0


@pytest.mark.asyncio
async def test_execute_with_multiple_weeks(use_case, mock_repository):
    """Test that multiple weeks are handled correctly"""
    # Create 2 weeks of data
    week1_days = [
        ContributionDay(date=f"2026-01-{i:02d}", count=i, level=0)
        for i in range(4, 11)
    ]
    week2_days = [
        ContributionDay(date=f"2026-01-{i:02d}", count=i, level=0)
        for i in range(11, 18)
    ]
    week1 = ContributionWeek(days=week1_days)
    week2 = ContributionWeek(days=week2_days)
    calendar = ContributionCalendar(
        weeks=[week1, week2], total_contributions=105, max_contributions_in_week=17
    )

    mock_repository.fetch_contribution_calendar.return_value = calendar

    with patch("src.infrastructure.config.settings") as mock_settings:
        mock_settings.GITLAB_USERNAME = "stevendejong"
        result = await use_case.execute()

        assert len(result.weeks) == 2
        assert result.total_contributions == 105
        assert result.max_contributions == 17
