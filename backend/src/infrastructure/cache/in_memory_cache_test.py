from time import sleep

from .in_memory_cache import InMemoryCache


def test_cache_set_and_get():
    cache = InMemoryCache()
    cache.set("key", "value", ttl=10)
    assert cache.get("key") == "value"


def test_cache_expires():
    cache = InMemoryCache()
    cache.set("key", "value", ttl=1)
    sleep(1.1)
    assert cache.get("key") is None


def test_cache_delete():
    cache = InMemoryCache()
    cache.set("key", "value", ttl=10)
    cache.delete("key")
    assert cache.get("key") is None


def test_cache_clear():
    cache = InMemoryCache()
    cache.set("key1", "value1", ttl=10)
    cache.set("key2", "value2", ttl=10)
    cache.clear()
    assert cache.get("key1") is None
    assert cache.get("key2") is None


def test_cache_get_nonexistent_key():
    cache = InMemoryCache()
    assert cache.get("nonexistent") is None


def test_cache_with_different_types():
    cache = InMemoryCache()
    cache.set("str", "value", ttl=10)
    cache.set("int", 42, ttl=10)
    cache.set("dict", {"key": "value"}, ttl=10)
    assert cache.get("str") == "value"
    assert cache.get("int") == 42
    assert cache.get("dict") == {"key": "value"}
