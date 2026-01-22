import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { homeStyles } from './home.style.js'
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
      </section>

      <div class="status-footer">
        <mbs-stats-bar .skillsFinished="${this.skillsFinished}"></mbs-stats-bar>
      </div>
    `
  }
}