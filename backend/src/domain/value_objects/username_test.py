import pytest
from .username import Username


def test_valid_username():
    username = Username("stevendejongnl")
    assert username.value == "stevendejongnl"


def test_empty_username_raises_error():
    with pytest.raises(ValueError, match="cannot be empty"):
        Username("")


def test_long_username_raises_error():
    with pytest.raises(ValueError, match="too long"):
        Username("a" * 40)


def test_username_with_invalid_characters_raises_error():
    with pytest.raises(ValueError, match="invalid characters"):
        Username("user@example")


def test_username_with_hyphens_is_valid():
    username = Username("my-username")
    assert username.value == "my-username"


def test_username_is_immutable():
    username = Username("test")
    with pytest.raises(AttributeError):
        username.value = "other"  # type: ignore
