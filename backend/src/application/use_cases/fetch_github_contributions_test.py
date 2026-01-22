import pytest

from ..dtos.contribution_dto import GitHubContributionsDTO
from ...domain.entities.contribution_calendar import ContributionCalendar
from ...domain.value_objects.contribution_day import ContributionDay
from ...domain.value_objects.contribution_week import ContributionWeek
from ...domain.value_objects.username import Username
from .fetch_github_contributions import FetchGitHubContributions


class MockGitHubRepository:
    """Mock repository for testing"""

    def __init__(self, calendar: ContributionCalendar | None = None):
        self.calendar = calendar

    async def fetch_user(self, username: Username):
        """Not implemented for this test"""
        pass

    async def fetch_contributions(self, username: Username) -> int:
        """Not implemented for this test"""
        return 0

    async def fetch_contribution_calendar(
        self, username: Username
    ) -> ContributionCalendar:
        """Return mock calendar"""
        if self.calendar is None:
            # Empty calendar
            return ContributionCalendar(
                weeks=[], total_contributions=0, max_contributions_in_week=0
            )
        return self.calendar


@pytest.mark.asyncio
async def test_fetch_contributions_empty_calendar():
    """Test fetching contributions with empty calendar"""
    repository = MockGitHubRepository(
        ContributionCalendar(
            weeks=[], total_contributions=0, max_contributions_in_week=0
        )
    )
    use_case = FetchGitHubContributions(repository)

    result = await use_case.execute()

    assert isinstance(result, GitHubContributionsDTO)
    assert result.weeks == []
    assert result.total_contributions == 0
    assert result.max_contributions == 0


@pytest.mark.asyncio
async def test_fetch_contributions_single_week():
    """Test fetching contributions with single week"""
    days = [
        ContributionDay(date=f"2024-01-{i:02d}", count=i, level=0)
        for i in range(1, 8)
    ]
    week = ContributionWeek(days=days)
    calendar = ContributionCalendar(
        weeks=[week], total_contributions=28, max_contributions_in_week=7
    )

    repository = MockGitHubRepository(calendar)
    use_case = FetchGitHubContributions(repository)

    result = await use_case.execute()

    assert len(result.weeks) == 1
    assert len(result.weeks[0].days) == 7
    assert result.total_contributions == 28
    assert result.max_contributions == 7


@pytest.mark.asyncio
async def test_level_calculation_zero_contributions():
    """Test that zero contributions get level 0"""
    days = [
        ContributionDay(date="2024-01-01", count=0, level=0),
        ContributionDay(date="2024-01-02", count=1, level=0),
        ContributionDay(date="2024-01-03", count=2, level=0),
        ContributionDay(date="2024-01-04", count=3, level=0),
        ContributionDay(date="2024-01-05", count=4, level=0),
        ContributionDay(date="2024-01-06", count=5, level=0),
        ContributionDay(date="2024-01-07", count=6, level=0),
    ]
    week = ContributionWeek(days=days)
    calendar = ContributionCalendar(
        weeks=[week], total_contributions=21, max_contributions_in_week=6
    )

    repository = MockGitHubRepository(calendar)
    use_case = FetchGitHubContributions(repository)

    result = await use_case.execute()

    assert result.weeks[0].days[0].level == 0


@pytest.mark.asyncio
async def test_level_calculation_percentile_distribution():
    """Test that levels are calculated correctly with percentile thresholds"""
    # Test with max contribution of 100
    # Level 1: 1-25, Level 2: 26-50, Level 3: 51-75, Level 4: 76-100
    days = [
        ContributionDay(date="2024-01-01", count=0, level=0),
        ContributionDay(date="2024-01-02", count=10, level=0),  # 10% -> level 1
        ContributionDay(date="2024-01-03", count=25, level=0),  # 25% -> level 1
        ContributionDay(date="2024-01-04", count=50, level=0),  # 50% -> level 2
        ContributionDay(date="2024-01-05", count=75, level=0),  # 75% -> level 3
        ContributionDay(date="2024-01-06", count=90, level=0),  # 90% -> level 4
        ContributionDay(date="2024-01-07", count=100, level=0),  # 100% -> level 4
    ]
    week = ContributionWeek(days=days)
    calendar = ContributionCalendar(
        weeks=[week], total_contributions=350, max_contributions_in_week=100
    )

    repository = MockGitHubRepository(calendar)
    use_case = FetchGitHubContributions(repository)

    result = await use_case.execute()

    # Verify level calculations
    assert result.weeks[0].days[0].level == 0  # 0 contributions
    assert result.weeks[0].days[1].level == 1  # 10% of 100
    assert result.weeks[0].days[2].level == 1  # 25% of 100
    assert result.weeks[0].days[3].level == 2  # 50% of 100
    assert result.weeks[0].days[4].level == 3  # 75% of 100
    assert result.weeks[0].days[5].level == 4  # 90% of 100
    assert result.weeks[0].days[6].level == 4  # 100% of 100
