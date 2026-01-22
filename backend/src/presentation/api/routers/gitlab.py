from fastapi import APIRouter, Depends, HTTPException
from dependency_injector.wiring import Provide, inject

from src.application.dtos.contribution_dto import GitLabContributionsDTO
from src.application.use_cases.fetch_gitlab_contributions import FetchGitLabContributions
from src.presentation.container import Container

router = APIRouter()


@router.get("/gitlab/contributions", response_model=GitLabContributionsDTO, tags=["contributions"])
@inject
async def get_gitlab_contributions(
    use_case: FetchGitLabContributions = Depends(Provide[Container.fetch_gitlab_contributions_use_case])
):
    """Fetch GitLab contribution calendar (365 days)"""
    try:
        return await use_case.execute()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
