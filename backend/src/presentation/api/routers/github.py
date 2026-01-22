from fastapi import APIRouter, Depends, HTTPException
from dependency_injector.wiring import Provide, inject

from src.application.dtos.contribution_dto import GitHubContributionsDTO
from src.application.dtos.github_user_dto import AggregatedStatsDTO, GitHubUserDTO
from src.application.use_cases.fetch_aggregated_stats import FetchAggregatedStats
from src.application.use_cases.fetch_github_contributions import FetchGitHubContributions
from src.application.use_cases.fetch_github_user import FetchGitHubUser
from src.presentation.container import Container

router = APIRouter()


@router.get("/profiles/github", response_model=GitHubUserDTO, tags=["profiles"])
@inject
async def get_github_profile(
    use_case: FetchGitHubUser = Depends(Provide[Container.fetch_github_user_use_case])
):
    """Fetch GitHub user profile"""
    try:
        return await use_case.execute()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stats", response_model=AggregatedStatsDTO, tags=["stats"])
@inject
async def get_global_stats(
    use_case: FetchAggregatedStats = Depends(Provide[Container.fetch_aggregated_stats_use_case])
):
    """Fetch aggregated statistics from GitHub and GitLab"""
    try:
        return await use_case.execute()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/contributions", response_model=GitHubContributionsDTO, tags=["contributions"])
@inject
async def get_contributions(
    use_case: FetchGitHubContributions = Depends(Provide[Container.fetch_github_contributions_use_case])
):
    """Fetch GitHub contribution calendar (365 days)"""
    try:
        return await use_case.execute()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
