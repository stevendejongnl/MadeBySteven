from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration"""
    model_config = SettingsConfigDict(env_file=".env")

    # App
    APP_NAME: str = "Made by Steven API"
    DEBUG: bool = False

    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:8000",
        "https://www.madebysteven.nl",
        "https://madebysteven.nl"
    ]

    # GitHub
    GITHUB_TOKEN: str | None = None
    GITHUB_API_BASE: str = "https://api.github.com"

    # Cache
    CACHE_TTL_USER: int = 3600  # 1 hour
    CACHE_TTL_STATS: int = 1800  # 30 minutes


settings = Settings()
