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
async def test_get_user_invalid_username():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/v1/github/user/")
    assert response.status_code == 404  # 404 because empty username


@pytest.mark.asyncio
async def test_get_stats_invalid_username():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/v1/github/stats/")
    assert response.status_code == 404  # 404 because empty username


@pytest.mark.asyncio
async def test_get_user_with_long_username():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/v1/github/user/" + "a" * 50)
    assert response.status_code == 400


@pytest.mark.asyncio
async def test_get_stats_with_long_username():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/v1/github/stats/" + "a" * 50)
    assert response.status_code == 400
