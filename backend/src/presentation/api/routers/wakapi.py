from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from dependency_injector.wiring import Provide, inject

from src.application.dtos.wakapi_dto import WakapiEditorDTO, WakapiLanguageDTO, WakapiProjectDTO, WakapiStatsDTO
from src.application.use_cases.fetch_wakapi_stats import FetchWakapiStats
from src.presentation.container import Container

router = APIRouter()

_MAX_LANGUAGES = 5
_MAX_EDITORS = 3
_MAX_PROJECTS = 4

_BG = "#282A36"
_BORDER = "#44475A"
_BAR_BG = "#44475A"
_TEXT = "#F8F8F2"
_DIM = "#6272A4"
_GREEN = "#50FA7B"
_CYAN = "#8BE9FD"
_PURPLE = "#BD93F9"
_FONT = "'Fira Mono', Consolas, Menlo, monospace"

_WIDTH = 650
_PAD = 16
_ROW_H = 32
_BAR_X = 280
_BAR_W = 180


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


@router.get("/wakapi/stats/image", tags=["wakapi"], include_in_schema=True)
@inject
async def get_wakapi_stats_image(
    use_case: FetchWakapiStats = Depends(Provide[Container.fetch_wakapi_stats_use_case])
):
    """Render Wakapi coding stats as an embeddable SVG card"""
    try:
        stats = await use_case.execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    svg = _render_svg(stats)
    return Response(
        content=svg,
        media_type="image/svg+xml",
        headers={"Cache-Control": "max-age=1800"},
    )


def _esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _text(x, y, size, fill, content, *, anchor="start", weight="normal") -> str:
    return (
        f'<text x="{x}" y="{y}" font-family="{_FONT}" font-size="{size}"'
        f' font-weight="{weight}" fill="{fill}" text-anchor="{anchor}">'
        f"{_esc(content)}</text>"
    )


def _item_row(item: WakapiLanguageDTO | WakapiEditorDTO | WakapiProjectDTO, bar_color: str, y: int) -> list[str]:
    bar_fill = max(4, round(item.percent / 100 * _BAR_W))
    return [
        _text(_PAD, y + 16, 11, _TEXT, item.name),
        f'<rect x="{_BAR_X}" y="{y + 9}" width="{_BAR_W}" height="7" rx="3" fill="{_BAR_BG}"/>',
        f'<rect x="{_BAR_X}" y="{y + 9}" width="{bar_fill}" height="7" rx="3" fill="{bar_color}"/>',
        _text(_BAR_X + _BAR_W + 6, y + 16, 10, _DIM, f"{item.percent:.1f}%"),
        _text(_WIDTH - _PAD, y + 16, 10, _TEXT, item.text, anchor="end"),
    ]


def _render_svg(stats: WakapiStatsDTO) -> str:
    langs = stats.languages[:_MAX_LANGUAGES]
    editors = stats.editors[:_MAX_EDITORS]
    projects = stats.projects[:_MAX_PROJECTS]

    height = (
        _PAD
        + 28                      # title line
        + 20                      # total line
        + 16                      # gap
        + 22                      # LANGUAGES label
        + len(langs) * _ROW_H
        + 16                      # gap between sections
        + 22                      # EDITORS label
        + len(editors) * _ROW_H
        + (16 + 22 + len(projects) * _ROW_H if projects else 0)  # PROJECTS section
        + _PAD
    )

    out = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{_WIDTH}" height="{height}" role="img">',
        "<title>Weekly Coding Stats</title>",
        f'<rect width="{_WIDTH}" height="{height}" rx="8" fill="{_BG}" stroke="{_BORDER}" stroke-width="1"/>',
    ]

    y = _PAD
    out.append(_text(_PAD, y + 16, 14, _TEXT, f"Coding Stats \u00b7 {stats.range}", weight="bold"))
    y += 28

    out.append(_text(_PAD, y + 13, 12, _DIM, f"Total: {stats.human_readable_total}"))
    y += 36  # line + gap

    out.append(_text(_PAD, y + 13, 11, _DIM, "LANGUAGES", weight="bold"))
    y += 22
    for lang in langs:
        out.extend(_item_row(lang, _GREEN, y))
        y += _ROW_H

    y += 16

    out.append(_text(_PAD, y + 13, 11, _DIM, "EDITORS", weight="bold"))
    y += 22
    for editor in editors:
        out.extend(_item_row(editor, _CYAN, y))
        y += _ROW_H

    if projects:
        y += 16
        out.append(_text(_PAD, y + 13, 11, _DIM, "PROJECTS", weight="bold"))
        y += 22
        for project in projects:
            out.extend(_item_row(project, _PURPLE, y))
            y += _ROW_H

    out.append("</svg>")
    return "\n".join(out)
