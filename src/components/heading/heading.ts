import { LitElement, html, PropertyValues } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { styles } from './heading.style.js'

@customElement('mbs-heading')
export class MbsHeading extends LitElement {
  static override styles = styles

  @state()
  private displayedText = ''

  private fullText = 'Made by Steven'
  private typingTimeout?: number

  override connectedCallback() {
    super.connectedCallback()
    this.displayedText = ''
  }

  override firstUpdated(_changedProperties: PropertyValues) {
    this.typeText(this.fullText)
  }

  private typeText(remaining: string) {
    if (!remaining) return
    this.displayedText += remaining[0]
    this.requestUpdate()
    this.typingTimeout = window.setTimeout(() => {
      this.typeText(remaining.slice(1))
    }, 150)
  }

  override disconnectedCallback() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout)
    }
    super.disconnectedCallback()
  }

  override render() {
    return html`
      <header>
        <span class="prompt">&gt;</span>
        <a class="name" href="/">${this.displayedText}</a>
        <span class="cursor">_</span>
        <nav class="menu">
          <a href="https://ask.steven-dejong.nl" target="_blank" rel="noopener noreferrer">
            Ask
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none" style="vertical-align: middle; margin-left: 2px;"><path d="M7 13L13 7M13 7H8M13 7V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </nav>
      </header>
    `
  }
}