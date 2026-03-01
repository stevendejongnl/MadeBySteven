from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from src.infrastructure.config import settings
from src.presentation.container import Container
from src.presentation.api import routers


def create_app() -> FastAPI:
    """Create and configure FastAPI application with DI container"""
    # Initialize DI container
    container = Container()
    container.wire(modules=[
        "src.presentation.api.routers.github",
        "src.presentation.api.routers.gitlab",
        "src.presentation.api.routers.wakapi",
    ])

    app = FastAPI(
        title=settings.APP_NAME,
        docs_url="/api/docs",
        redoc_url="/api/redoc"
    )
    app.container = container  # type: ignore

    # CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["GET"],
        allow_headers=["*"],
    )

    # Health check endpoint
    @app.get("/api/health")
    async def health():
        return {"status": "ok"}

    # API routes (register FIRST before static files)
    app.include_router(routers.github.router, prefix="/api/v1")
    app.include_router(routers.gitlab.router, prefix="/api/v1")
    app.include_router(routers.wakapi.router, prefix="/api/v1")

    # Mount static files if they exist
    web_app_dist = Path(__file__).parent.parent.parent.parent.parent / "web-app" / "public"
    if web_app_dist.exists():
        # Mount compiled assets
        assets_dir = web_app_dist / "assets"
        if assets_dir.exists():
            app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")

        # SPA catch-all route (register LAST)
        @app.get("/{full_path:path}", include_in_schema=False)
        async def serve_spa(full_path: str):
            # Defense in depth: reject API routes
            if full_path.startswith("api/"):
                raise HTTPException(status_code=404)

            # Serve index.html for all other paths
            return FileResponse(web_app_dist / "index.html")

    return app
