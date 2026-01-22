from fastapi import APIRouter, Depends, HTTPException
from dependency_injector.wiring import Provide, inject

from src.application.dtos.github_user_dto import GitHubStatsDTO, GitHubUserDTO
from src.application.use_cases.fetch_github_stats import FetchGitHubStats
from src.application.use_cases.fetch_github_user import FetchGitHubUser
from src.presentation.container import Container

router = APIRouter()


@router.get("/user/{username}", response_model=GitHubUserDTO)
@inject
async def get_user(
    username: str,
    use_case: FetchGitHubUser = Depends(Provide[Container.fetch_github_user_use_case])
):
    """Fetch GitHub user profile by username"""
    try:
        return await use_case.execute(username)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stats/{username}", response_model=GitHubStatsDTO)
@inject
async def get_stats(
    username: str,
    use_case: FetchGitHubStats = Depends(Provide[Container.fetch_github_stats_use_case])
):
    """Fetch GitHub statistics for user"""
    try:
        return await use_case.execute(username)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
