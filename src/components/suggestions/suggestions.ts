import { LitElement, html, PropertyValues } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { styles } from './suggestions.style.js'

@customElement('mbs-suggestions')
export class MbsSuggestions extends LitElement {
  static override styles = styles

  @state()
  private displayedText = ''

  @state()
  private typedSuggestions: string[] = []

  private suggestionList = [
    { text: 'About', href: '/about' },
    { text: 'Projects', href: '/projects' },
    { text: 'Contact', href: '/contact' }
  ]

  private currentIndex = 0
  private currentText = ''
  private typingTimeout?: number

  private initState() {
    this.displayedText = ''
    this.typedSuggestions = new Array(this.suggestionList.length).fill('')
    this.currentIndex = 0
    this.currentText = this.suggestionList[0]?.text || ''
  }

  private startTyping() {
    this.typeText(this.currentText)
  }

  private handleSuggestionEnd() {
    this.typedSuggestions[this.currentIndex] = this.displayedText
    if (this.currentIndex < this.suggestionList.length - 1) {
      this.typingTimeout = window.setTimeout(() => {
        this.currentIndex++
        this.displayedText = ''
        this.currentText = this.suggestionList[this.currentIndex]?.text || ''
        this.typeText(this.currentText)
      }, 500)
    } else {
      this.displayedText = ''
      this.handleAllSuggestionsTyped()
    }
  }

  private handleAllSuggestionsTyped() {
    this.dispatchEvent(new CustomEvent('suggestions-finished', { bubbles: true, composed: true }))
  }

  override connectedCallback() {
    super.connectedCallback()
    this.initState()
  }

  override firstUpdated(_changedProperties: PropertyValues) {
    this.startTyping()
  }

  private typeText(remaining: string) {
    if (!remaining) {
      this.handleSuggestionEnd()
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
    const allTyped = this.typedSuggestions.every(text => text.length > 0) && this.displayedText === '';
    return html`
      <main>
        <span class="prompt">&gt;</span>
        <span class="commandline">
          ${this.suggestionList.map((suggestion, index) => {
            if (this.typedSuggestions[index] && (index < this.currentIndex || allTyped)) {
              return html`<a class="commandlink" href="${suggestion.href}">${this.typedSuggestions[index]}</a> `
            } else if (index === this.currentIndex && !allTyped) {
              return html`<a class="commandlink" href="${suggestion.href}">${this.displayedText}</a>${!allTyped ? html`<span class="cursor">_</span>` : ''} `
            } else if (allTyped) {
              return html`<a class="commandlink" href="${suggestion.href}">${suggestion.text}</a> `
            }
            return null
          })}
        </span>
      </main>
    `
  }
}
