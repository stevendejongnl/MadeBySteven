import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { repositories } from './repositories.data.js'

@customElement('mbs-github-repositories')
export class MBSGithubRepositories extends LitElement {
  @state()
  private repositories: any[] = []

  override connectedCallback() {
    super.connectedCallback()

    // const response = await fetch("https://api.github.com/users/stevendejongnl/repos", {
    //   "method": "GET",
    // })
    //
    // this.repositories = await response.json()
    this.repositories = repositories
  }

  override render() {
    return html`
      <h1>My GitHub Repositories</h1>
      <ul>
        ${this.repositories.map((repo: any) =>
          html`<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
        )}
      </ul>
    `
  }
}
