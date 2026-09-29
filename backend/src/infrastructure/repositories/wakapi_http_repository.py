import httpx

from ...application.dtos.wakapi_dto import WakapiEditorDTO, WakapiLanguageDTO, WakapiProjectDTO, WakapiStatsDTO
from ..cache.in_memory_cache import InMemoryCache
from ..config import settings

_MAX_PROJECTS = 4

_CACHE_KEY = "wakapi:stats:last_7_days"

# Agent-driven editing still happens in Neovim, so report it as such.
# Keys are lowercase; lookup is case-insensitive.
_EDITOR_ALIASES = {
    "opus": "Neovim",
    "sonnet": "Neovim",
    "haiku": "Neovim",
    "claude": "Neovim",
    "claude code": "Neovim",
    "neovim": "Neovim",
    "nvim": "Neovim",
}


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
            editors=self._merge_editors(data.get("editors", [])),
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

    @classmethod
    def _merge_editors(cls, raw_editors: list[dict]) -> list[WakapiEditorDTO]:
        """Map editor aliases onto their canonical name and merge the duplicates"""
        merged: dict[str, WakapiEditorDTO] = {}

        for ed in raw_editors:
            raw_name = ed.get("name", "")
            name = _EDITOR_ALIASES.get(raw_name.lower(), raw_name)
            existing = merged.get(name)

            total_seconds = int(ed.get("total_seconds", 0))
            percent = float(ed.get("percent", 0.0))

            if existing is None:
                merged[name] = WakapiEditorDTO(
                    name=name,
                    total_seconds=total_seconds,
                    percent=percent,
                    text=cls._humanize(total_seconds),
                )
                continue

            existing.total_seconds += total_seconds
            existing.percent = min(100.0, existing.percent + percent)
            existing.text = cls._humanize(existing.total_seconds)

        return sorted(merged.values(), key=lambda e: e.total_seconds, reverse=True)

    @staticmethod
    def _humanize(total_seconds: int) -> str:
        hours, remainder = divmod(total_seconds, 3600)
        return f"{hours} hrs {remainder // 60} mins"

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
