import {html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'
import {style} from './made-a-github-overview.style.js'
import {Repository} from '../made-a-github-repository/made-a-github-repository.interface.js'

const github_url = 'https://github.com/stevendejongnl'
const github_api = 'https://api.github.com/users/stevendejongnl'

@customElement('made-a-github-overview')
export class MadeAGithubOverview extends LitElement {
  static override styles = style

  override async firstUpdated() {
    const repositories = this.getRepositoriesFromLocalStorage()
    if (repositories) {
      this._repositories = repositories
      this.requestUpdate()
    } else {
      await this.fetchRepositories()
    }
  }

  private _repositories: Repository[] = []

  public get repositories(): Repository[] {
    return this._repositories
  }

  public async fetchRepositories(): Promise<void> {
    try {
      const response = await fetch(`${github_api}/repos`)
      if (!response.ok) {
        throw new Error('Failed to fetch repositories')
      }
      const repositories = await response.json().then((data: Repository[]) => data.sort((a, b) => {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      }))
      this._repositories = repositories
      this.saveRepositoriesToLocalStorage(repositories)
      this.requestUpdate()
    } catch (error) {
      console.error(error)
    }
  }

  private saveRepositoriesToLocalStorage(repositories: Repository[]): void {
    const storageKey = 'repositories'
    const storageValue = JSON.stringify({
      data: repositories,
      expiration: Date.now() + 24 * 60 * 60 * 1000 // Vervaldatum na 24 uur (in milliseconden)
    })
    localStorage.setItem(storageKey, storageValue)
  }

  private getRepositoriesFromLocalStorage(): Repository[] | null {
    const storageKey = 'repositories'
    const storageValue = localStorage.getItem(storageKey)
    if (storageValue) {
      const repositoriesData = JSON.parse(storageValue)
      if (this.isRepositoriesExpired(repositoriesData)) {
        localStorage.removeItem(storageKey)
        return null
      }
      return repositoriesData.data
    }
    return null
  }

  private isRepositoriesExpired(repositoriesData: {data: Repository[], expiration: number}): boolean {
    const expiration = repositoriesData.expiration
    return Date.now() > expiration
  }

  override render() {
    return html`
      <section class="made-a-github-overview">
        <header>
          <a href="${github_url}" target="_blank">
            GitHub Projects
          </a>
        </header>
        ${this.repositories.map((repository) =>
          html`<made-a-github-repository part="base" .repository="${repository}"></made-a-github-repository>`
        )}
      </section>
    `
  }
}
