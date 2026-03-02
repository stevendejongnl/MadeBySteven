import { css } from 'lit';
import { MbsColorScheme } from '../styles.js';

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
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: auto 1fr;
        margin: 0 auto;
        padding: 2rem;
        row-gap: 1rem;
    }

    @media (max-width: 768px) {
        main {
            padding: 0;
        }
    }
`