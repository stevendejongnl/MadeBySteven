import pytest

from ..value_objects.username import Username
from .github_user import GitHubUser


def test_create_github_user():
    user = GitHubUser(
        username=Username("stevendejongnl"),
        avatar_url="https://github.com/stevendejongnl.png",
        public_repos=10,
        followers=5
    )
    assert user.username.value == "stevendejongnl"
    assert user.public_repos == 10


def test_negative_repos_raises_error():
    with pytest.raises(ValueError, match="cannot be negative"):
        GitHubUser(
            username=Username("test"),
            avatar_url="url",
            public_repos=-1,
            followers=0
        )


def test_negative_followers_raises_error():
    with pytest.raises(ValueError, match="cannot be negative"):
        GitHubUser(
            username=Username("test"),
            avatar_url="url",
            public_repos=0,
            followers=-1
        )


def test_github_user_with_optional_fields():
    user = GitHubUser(
        username=Username("test"),
        avatar_url="url",
        public_repos=5,
        followers=3,
        name="Test User",
        bio="A test bio"
    )
    assert user.name == "Test User"
    assert user.bio == "A test bio"
