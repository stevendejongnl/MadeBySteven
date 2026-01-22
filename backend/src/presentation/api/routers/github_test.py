import pytest
from httpx import ASGITransport, AsyncClient

from ..app import create_app

app = create_app()


@pytest.mark.asyncio
async def test_health():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


@pytest.mark.asyncio
async def test_get_github_profile():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/v1/profiles/github")
    # Will fail with 500 if GitHub API is not available, but endpoint should exist
    assert response.status_code in (200, 500)


@pytest.mark.asyncio
async def test_get_stats():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/v1/stats")
    # Will fail with 500 if GitHub API is not available, but endpoint should exist
    assert response.status_code in (200, 500)


@pytest.mark.asyncio
async def test_get_contributions():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/v1/contributions")
    # Will fail with 500 if GitHub API is not available, but endpoint should exist
    assert response.status_code in (200, 500)
    if response.status_code == 200:
        data = response.json()
        assert "weeks" in data
        assert "total_contributions" in data
        assert "max_contributions" in data
