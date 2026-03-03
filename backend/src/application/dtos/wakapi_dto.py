from pydantic import BaseModel


class WakapiLanguageDTO(BaseModel):
    name: str
    total_seconds: int
    percent: float
    text: str


class WakapiEditorDTO(BaseModel):
    name: str
    total_seconds: int
    percent: float
    text: str


class WakapiProjectDTO(BaseModel):
    name: str
    total_seconds: int
    percent: float
    text: str


class WakapiStatsDTO(BaseModel):
    total_seconds: int
    human_readable_total: str
    range: str
    languages: list[WakapiLanguageDTO]
    editors: list[WakapiEditorDTO]
    projects: list[WakapiProjectDTO] = []
