import { css, CSSResultGroup, unsafeCSS } from 'lit'

// Colors for highlighting in the IDE.
const backgroundColor: CSSResultGroup = unsafeCSS('#282A36')
const foregroundColor: CSSResultGroup = unsafeCSS('#F8F8F2')
const textColor: CSSResultGroup = unsafeCSS('#8BE9FD')
const promptColor: CSSResultGroup = unsafeCSS('#50FA7B')
const cursorColor: CSSResultGroup = unsafeCSS('#44475A')
const borderColor: CSSResultGroup = unsafeCSS('#44475A')

export const MbsColorScheme = {
  background: css`var(--mbs-color-scheme-background, ${backgroundColor})`,
  foreground: css`var(--mbs-color-scheme-foreground, ${foregroundColor})`,
  text: css`var(--mbs-color-scheme-text, ${textColor})`,
  prompt: css`var(--mbs-color-scheme-prompt, ${promptColor})`,
  cursor: css`var(--mbs-color-scheme-cursor, ${cursorColor})`,
  border: css`var(--mbs-color-scheme-border, ${borderColor})`
}