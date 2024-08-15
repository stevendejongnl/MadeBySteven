import {html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {style} from './made-a-github-repository.style.js'
import {Languages, Repository} from './made-a-github-repository.interface.js'

@customElement('made-a-github-repository')
export class MadeAGithubRepository extends LitElement {
  static override styles = style

  @property({ type: Object })
  repository: Repository | null

  override async firstUpdated() {
    const languages = this.getLanguagesFromLocalStorage()
    if (languages) {
      this._languages = languages
      this.requestUpdate()
    } else {
      await this.fetchLanguages()
    }
  }

  private _languages: Languages = {}

  public get languages(): Languages {
    return this._languages
  }

  public async fetchLanguages(): Promise<void> {
    if (this.repository?.languages_url) {
      try {
        const response = await fetch(this.repository.languages_url)
        if (!response.ok) {
          throw new Error('Failed to fetch languages')
        }
        const languages = await response.json()
        this._languages = languages
        this.saveLanguagesToLocalStorage(languages)
        this.requestUpdate()
      } catch (error) {
        console.error(error)
      }
    }
  }

  private saveLanguagesToLocalStorage(languages: Languages): void {
    const storageKey = `languages_${this.repository?.name}`
    const storageValue = JSON.stringify({
      data: languages,
      expiration: Date.now() + 24 * 60 * 60 * 1000 // Vervaldatum na 24 uur (in milliseconden)
    })
    localStorage.setItem(storageKey, storageValue)
  }

  private getLanguagesFromLocalStorage(): Languages | null {
    const storageKey = `languages_${this.repository?.name}`
    const storageValue = localStorage.getItem(storageKey)
    if (storageValue) {
      const languagesData = JSON.parse(storageValue)
      if (this.isLanguagesExpired(languagesData)) {
        localStorage.removeItem(storageKey)
        return null
      }
      return languagesData.data
    }
    return null
  }

  private isLanguagesExpired(languagesData: {data: Languages, expiration: number}): boolean {
    const expiration = languagesData.expiration
    return Date.now() > expiration
  }

  constructor() {
    super()
    this.repository = null
  }

  override render() {
    return html`
      <article class="made-a-github-repository" part="base">
        <a class="title" target="_blank" href="${this.repository?.html_url}">
          ${this.repository?.name}
        </a>
        <div class="description">
          <p>${this.repository?.description}</p>
        </div>
        <footer>
          <ul class="languages">
            ${Object.entries(this.languages).map(([language]) => html`
              <li>${language}</li>
            `)}
          </ul>
          <div class="stars">
            ${this.repository?.stargazers_count || null}
          </div>
        </footer>
      </article>
    `
  }
}
