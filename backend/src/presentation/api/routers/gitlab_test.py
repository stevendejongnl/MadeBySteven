import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch

from src.application.dtos.contribution_dto import (
    ContributionDayDTO,
    ContributionWeekDTO,
    GitLabContributionsDTO,
)
from src.main import create_app


@pytest.fixture
def client():
    """Create test client with dependency injection"""
    app = create_app()
    return TestClient(app)


@pytest.mark.asyncio
async def test_get_gitlab_contributions_success():
    """Test successful GitLab contributions endpoint"""
    # Create mock response
    days = [
        ContributionDayDTO(date="2026-01-04", count=i, level=i // 2)
        for i in range(7)
    ]
    week = ContributionWeekDTO(days=days)
    expected_response = GitLabContributionsDTO(
        weeks=[week],
        total_contributions=21,
        max_contributions=6,
    )

    with patch(
        "src.application.use_cases.fetch_gitlab_contributions.FetchGitLabContributions.execute"
    ) as mock_execute:
        mock_execute.return_value = expected_response

        app = create_app()
        client = TestClient(app)
        response = client.get("/api/v1/gitlab/contributions")

        assert response.status_code == 200
        data = response.json()
        assert data["total_contributions"] == 21
        assert data["max_contributions"] == 6
        assert len(data["weeks"]) == 1


@pytest.mark.asyncio
async def test_get_gitlab_contributions_empty_calendar():
    """Test GitLab contributions endpoint with empty calendar"""
    expected_response = GitLabContributionsDTO(
        weeks=[],
        total_contributions=0,
        max_contributions=0,
    )

    with patch(
        "src.application.use_cases.fetch_gitlab_contributions.FetchGitLabContributions.execute"
    ) as mock_execute:
        mock_execute.return_value = expected_response

        app = create_app()
        client = TestClient(app)
        response = client.get("/api/v1/gitlab/contributions")

        assert response.status_code == 200
        data = response.json()
        assert data["total_contributions"] == 0
        assert len(data["weeks"]) == 0


@pytest.mark.asyncio
async def test_get_gitlab_contributions_error_handling():
    """Test GitLab contributions endpoint error handling"""
    with patch(
        "src.application.use_cases.fetch_gitlab_contributions.FetchGitLabContributions.execute"
    ) as mock_execute:
        mock_execute.side_effect = Exception("GitLab API error")

        app = create_app()
        client = TestClient(app)
        response = client.get("/api/v1/gitlab/contributions")

        assert response.status_code == 500
        assert "detail" in response.json()
