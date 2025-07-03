import { LitElement, html, PropertyValues } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { styles } from './suggestions.style.js'

@customElement('mbs-suggestions')
export class MbsSuggestions extends LitElement {
  static override styles = styles

  @state()
  private displayedText = ''

  @state()
  private displayedTextList: string[] = []

  private suggestions = [
    { text: 'About', href: '/about' },
    { text: 'Projects', href: '/projects' },
    { text: 'Contact', href: '/contact' }
  ]

  private currentSuggestionIndex = 0
  private fullText = ''
  private typingTimeout?: number

  override connectedCallback() {
    super.connectedCallback()
    this.displayedText = ''
    this.displayedTextList = []
    this.currentSuggestionIndex = 0
    this.fullText = this.suggestions[0]?.text || ''
  }

  override firstUpdated(_changedProperties: PropertyValues) {
    this.typeText(this.fullText)
  }

  private typeText(remaining: string) {
    if (!remaining) {
      this.displayedTextList = [
        ...this.displayedTextList,
        this.displayedText
      ]
      if (this.currentSuggestionIndex < this.suggestions.length - 1) {
        this.typingTimeout = window.setTimeout(() => {
          this.currentSuggestionIndex++
          this.displayedText = ''
          this.fullText = this.suggestions[this.currentSuggestionIndex]?.text || ''
          this.typeText(this.fullText)
        }, 500)
      }
      return
    }
    this.displayedText += remaining[0]
    this.requestUpdate()
    this.typingTimeout = window.setTimeout(() => {
      this.typeText(remaining.slice(1))
    }, 80)
  }

  override disconnectedCallback() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout)
    }
    super.disconnectedCallback()
  }

  override render() {
    const allTyped = this.displayedTextList.length === this.suggestions.length;
    return html`
      <main>
        <span class="prompt">&gt;</span>
        <span class="commandline">
          ${this.suggestions.map((s, i) => {
            if (i < this.displayedTextList.length) {
              return html`<a class="commandlink" href="${s.href}">${this.displayedTextList[i]}</a> `
            } else if (i === this.displayedTextList.length && !allTyped) {
              return html`<a class="commandlink" href="${s.href}">${this.displayedText}</a><span class="cursor">_</span> `
            } else if (allTyped) {
              return html`<a class="commandlink" href="${s.href}">${s.text}</a> `
            }
            return null
          })}
        </span>
      </main>
    `
  }
}
