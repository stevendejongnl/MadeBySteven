from datetime import datetime, timedelta
from typing import Any


class InMemoryCache:
    """In-memory cache with TTL support"""

    def __init__(self):
        self._cache: dict[str, tuple[Any, datetime]] = {}

    def get(self, key: str) -> Any | None:
        """Get value from cache if not expired"""
        if key in self._cache:
            value, expiry = self._cache[key]
            if datetime.now() < expiry:
                return value
            del self._cache[key]
        return None

    def set(self, key: str, value: Any, ttl: int):
        """Set value in cache with TTL in seconds"""
        expiry = datetime.now() + timedelta(seconds=ttl)
        self._cache[key] = (value, expiry)

    def delete(self, key: str):
        """Delete value from cache"""
        if key in self._cache:
            del self._cache[key]

    def clear(self):
        """Clear all cache entries"""
        self._cache.clear()
