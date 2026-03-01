from fastapi import APIRouter, Depends, HTTPException
from dependency_injector.wiring import Provide, inject

from src.application.dtos.wakapi_dto import WakapiStatsDTO
from src.application.use_cases.fetch_wakapi_stats import FetchWakapiStats
from src.presentation.container import Container

router = APIRouter()


@router.get("/wakapi/stats", response_model=WakapiStatsDTO, tags=["wakapi"])
@inject
async def get_wakapi_stats(
    use_case: FetchWakapiStats = Depends(Provide[Container.fetch_wakapi_stats_use_case])
):
    """Fetch Wakapi coding stats (languages, editors, total time) for the last 7 days"""
    try:
        return await use_case.execute()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
