import { css } from 'lit';
import { MbsColorScheme } from 'styles.js';

export const styles = css`
    :host {
        display: block;
        min-height: 100vh;
        background: ${MbsColorScheme.background};
        color: ${MbsColorScheme.foreground};
        font-family: 'Fira Mono', 'Consolas', 'Menlo', 'Monaco', monospace;
    }
    main {
        display: grid;
        grid-template-rows: auto 1fr;
        margin: 0 auto;
        padding: 2rem;
        row-gap: 1rem;
    }
`