from ..dtos.wakapi_dto import WakapiStatsDTO
from ...infrastructure.repositories.wakapi_http_repository import WakapiHttpRepository


class FetchWakapiStats:
    """Use case: Fetch Wakapi coding stats for the last 7 days"""

    def __init__(self, repository: WakapiHttpRepository):
        self._repository = repository

    async def execute(self) -> WakapiStatsDTO:
        return await self._repository.fetch_stats()
