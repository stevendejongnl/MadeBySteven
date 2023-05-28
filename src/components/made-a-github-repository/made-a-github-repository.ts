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
    await this.fetchLanguages()
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
        this._languages = await response.json()
        this.requestUpdate()
      } catch (error) {
        console.error(error)
      }
    }
  }
  constructor() {
    super()

    this.repository = null
  }

  override render() {
    return html`
      <article class="made-a-github-repository">
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