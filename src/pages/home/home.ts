import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { homeStyles } from './home.style.js'
import { fetchGitHubUser, GitHubUser } from '../../services/github-api.js'
import '../../components/profile-card/profile-card.js'
import '../../components/skills-list/skills-list.js'
import '../../components/stats-bar/stats-bar.js'
import '../../components/contribution-graph/contribution-graph.js'

@customElement('mbs-home-page')
export class MbsHomePage extends LitElement {
  static override styles = homeStyles

  @state() private titleDisplayed: string = ''

  @state() private showTagline: boolean = false

  @state() private showProfile: boolean = false

  @state() private showSkills: boolean = false

  @state() private skillsFinished: boolean = false

  @state() private user: GitHubUser | null = null

  private titleTimeout: number | undefined

  private profileTimeout: number | undefined

  private fullTitle: string = 'MADE BY STEVEN'

  private taglines: string[] = [
    'Creating practical apps and developer tools.',
    'Building cross-platform apps and developer utilities.',
    'Making tools and applications that solve problems.'
  ]

  private tagline: string = ''

  override connectedCallback(): void {
    super.connectedCallback()
    this.tagline = this.taglines[Math.floor(Math.random() * this.taglines.length)]!
    this.showTagline = true
    this.startTitleAnimation()
    fetchGitHubUser().then(user => {
      this.user = user
      this.requestUpdate()
    })
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    this.clearTimeouts()
  }

  private clearTimeouts(): void {
    if (this.titleTimeout) clearTimeout(this.titleTimeout)
    if (this.profileTimeout) clearTimeout(this.profileTimeout)
  }

  private startTitleAnimation(): void {
    let charIndex = 0
    const titleDelay = 50

    const animate = () => {
      if (charIndex < this.fullTitle.length) {
        this.titleDisplayed = this.fullTitle.substring(0, charIndex + 1)
        this.requestUpdate()
        charIndex++
        this.titleTimeout = window.setTimeout(animate, titleDelay)
      } else {
        this.onTitleComplete()
      }
    }

    animate()
  }

  private onTitleComplete(): void {
    this.onTaglineComplete()
  }

  private onTaglineComplete(): void {
    this.profileTimeout = window.setTimeout(() => {
      this.showProfile = true
      this.showSkills = true
      this.requestUpdate()
    }, 200)
  }

  private onSkillsFinished(): void {
    window.setTimeout(() => {
      this.skillsFinished = true
      this.requestUpdate()
    }, 200)
  }

  // TODO: Implement this function to convert ISO dates to human-readable labels.
  // Examples: "today", "yesterday", "3 days ago", "last week", "2 months ago", "last year"
  // pushed_at is an ISO 8601 string like "2024-11-15T12:34:56Z"
  private formatPushedAt(pushed_at: string): string {
    const now = new Date()
    const pushed = new Date(pushed_at)
    const diffMs = now.getTime() - pushed.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'today'
    if (diffDays === 1) return 'yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 14) return 'last week'
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 60) return 'last month'
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    if (diffDays < 730) return 'last year'
    return `${Math.floor(diffDays / 365)} years ago`
  }

  override render() {
    return html`
      <section>
        <h1 class="main-title">
          ${this.titleDisplayed}<span
            class="title-cursor"
            style="display: ${this.titleDisplayed.length === this.fullTitle.length
              ? 'none'
              : 'inline-block'};"
          ></span>
        </h1>

        ${this.showTagline ? html`<p class="tagline">${this.tagline}</p>` : ''}

        ${this.showProfile
          ? html`<div class="content-grid">
              <mbs-profile-card></mbs-profile-card>
            </div>`
          : ''}

        ${this.showSkills
          ? html`<div class="skills-and-contributions">
              <div class="skills-section">
                <mbs-skills-list
                  @skills-finished="${() => this.onSkillsFinished()}"
                ></mbs-skills-list>
              </div>

              <div class="contributions-section">
                <mbs-contribution-graph></mbs-contribution-graph>
              </div>
            </div>`
          : ''}

        ${this.showProfile
          ? html`<div class="projects-section">
              <h2 class="projects-title">Projects</h2>
              <div class="projects-list">
                <a href="https://ask.steven-dejong.nl" target="_blank" rel="noopener noreferrer" class="project-link">
                  <span class="project-icon">→</span>
                  <span class="project-name">Ask Steven</span>
                </a>
                <a href="https://stevendejongnl.github.io/print-files/" target="_blank" rel="noopener noreferrer" class="project-link">
                  <span class="project-icon">→</span>
                  <span class="project-name">Print Files</span>
                </a>
                <a href="https://github.com/stevendejongnl/retrospekt" target="_blank" rel="noopener noreferrer" class="project-link">
                  <span class="project-icon">→</span>
                  <span class="project-name">Retrospekt</span>
                </a>
                <a href="https://github.com/stevendejongnl/guidr" target="_blank" rel="noopener noreferrer" class="project-link">
                  <span class="project-icon">→</span>
                  <span class="project-name">Guidr</span>
                </a>
              </div>
            </div>`
          : ''}

        ${this.showProfile && this.user && this.user.recent_repos.length > 0
          ? html`<div class="recent-section">
              <h2 class="recent-title">Recently Active</h2>
              <div class="recent-list">
                ${this.user.recent_repos.map(repo => html`
                  <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="recent-item">
                    <span class="recent-name">→ ${repo.name}</span>
                    <span class="recent-meta">
                      ${repo.primary_language
                        ? html`<span class="recent-lang">${repo.primary_language}</span>`
                        : ''}
                      ${repo.stars > 0
                        ? html`<span class="recent-stars">★ ${repo.stars}</span>`
                        : ''}
                      <span class="recent-date">${this.formatPushedAt(repo.pushed_at)}</span>
                    </span>
                  </a>
                `)}
              </div>
            </div>`
          : ''}
      </section>

      <div class="status-footer">
        <mbs-stats-bar .skillsFinished="${this.skillsFinished}"></mbs-stats-bar>
      </div>
    `
  }
}