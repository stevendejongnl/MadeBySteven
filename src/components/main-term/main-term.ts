import { LitElement, html, PropertyValues } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { styles } from './main-term.style.js'

@customElement('mbs-main-term')
export class MbsMainTerm extends LitElement {
  static override styles = styles

  @state()
  private displayedText = ''

  private fullText = ''
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
      <main>
        <span class="prompt">></span>
        <span class="name">${this.displayedText}</span>
        <span class="cursor">|</span>
      </main>
    `
  }
}