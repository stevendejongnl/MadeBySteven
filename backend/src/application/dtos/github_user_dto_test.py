from .github_user_dto import GitHubUserDTO, GitHubStatsDTO


def test_github_user_dto():
    dto = GitHubUserDTO(
        login="stevendejongnl",
        avatar_url="https://github.com/stevendejongnl.png",
        public_repos=10,
        followers=5,
        name="Steven",
        bio="Developer"
    )
    assert dto.login == "stevendejongnl"
    assert dto.public_repos == 10


def test_github_user_dto_without_optional_fields():
    dto = GitHubUserDTO(
        login="test",
        avatar_url="url",
        public_repos=0,
        followers=0
    )
    assert dto.name is None
    assert dto.bio is None


def test_github_stats_dto():
    dto = GitHubStatsDTO(contributions=100)
    assert dto.contributions == 100
