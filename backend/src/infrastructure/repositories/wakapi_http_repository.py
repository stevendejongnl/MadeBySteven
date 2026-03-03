import httpx

from ...application.dtos.wakapi_dto import WakapiEditorDTO, WakapiLanguageDTO, WakapiProjectDTO, WakapiStatsDTO
from ..cache.in_memory_cache import InMemoryCache
from ..config import settings

_MAX_PROJECTS = 4

_CACHE_KEY = "wakapi:stats:last_7_days"


class WakapiHttpRepository:
    """HTTP repository for Wakapi coding stats (WakaTime-compatible API)"""

    def __init__(self, cache: InMemoryCache):
        self._cache = cache

    async def fetch_stats(self) -> WakapiStatsDTO:
        cached = self._cache.get(_CACHE_KEY)
        if cached is not None:
            return cached

        result = await self._fetch_from_api()
        self._cache.set(_CACHE_KEY, result, ttl=settings.CACHE_TTL_STATS)
        return result

    async def _fetch_from_api(self) -> WakapiStatsDTO:
        if not settings.WAKAPI_API_KEY:
            return self._empty_stats()

        url = (
            f"{settings.WAKAPI_BASE_URL}/api/compat/wakatime/v1"
            f"/users/current/stats/last_7_days"
            f"?api_key={settings.WAKAPI_API_KEY}"
        )

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, timeout=10.0)
                response.raise_for_status()
                data = response.json().get("data", {})
        except Exception:
            return self._empty_stats()

        raw_projects = sorted(
            data.get("projects", []),
            key=lambda p: p.get("total_seconds", 0),
            reverse=True,
        )[:_MAX_PROJECTS]

        return WakapiStatsDTO(
            total_seconds=data.get("total_seconds", 0),
            human_readable_total=data.get("human_readable_total", "0 secs"),
            range=data.get("range", "last_7_days"),
            languages=[
                WakapiLanguageDTO(
                    name=lang.get("name", ""),
                    total_seconds=lang.get("total_seconds", 0),
                    percent=lang.get("percent", 0.0),
                    text=lang.get("text", ""),
                )
                for lang in data.get("languages", [])
            ],
            editors=[
                WakapiEditorDTO(
                    name=ed.get("name", ""),
                    total_seconds=ed.get("total_seconds", 0),
                    percent=ed.get("percent", 0.0),
                    text=ed.get("text", ""),
                )
                for ed in data.get("editors", [])
            ],
            projects=[
                WakapiProjectDTO(
                    name=proj.get("name", ""),
                    total_seconds=proj.get("total_seconds", 0),
                    percent=proj.get("percent", 0.0),
                    text=proj.get("text", ""),
                )
                for proj in raw_projects
            ],
        )

    @staticmethod
    def _empty_stats() -> WakapiStatsDTO:
        return WakapiStatsDTO(
            total_seconds=0,
            human_readable_total="0 secs",
            range="last_7_days",
            languages=[],
            editors=[],
            projects=[],
        )
