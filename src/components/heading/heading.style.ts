import { css } from 'lit';
import { MbsColorScheme } from '../../styles.js'

export const styles = css`
    :host {
        padding-bottom: 2rem;
        border-bottom: 1px solid ${MbsColorScheme.border};
    }
    header {
        display: grid;
        grid-template-columns: auto auto auto 1fr;
        grid-template-areas: 'prompt name cursor menu';
        align-items: center;
        width: 100%;
    }

    .prompt {
        grid-area: prompt;
        color: ${MbsColorScheme.prompt};
        padding-right: 0.5rem;
    }
    .name {
        grid-area: name;
        color: ${MbsColorScheme.text};
        text-wrap: nowrap;
        text-decoration: none;
    }
    .cursor {
        grid-area: cursor;
        color: ${MbsColorScheme.cursor};
        animation: blink 1s steps(1) infinite;
    }
    @keyframes blink {
        0%, 49% { opacity: 1; }
        50%, 100% { opacity: 0; }
    }

    .menu {
        grid-area: menu;
        margin-left: auto;
    }

    .menu a {
        color: inherit;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        font-weight: 500;
        padding: 0 0.5em;
        transition: color 0.2s;
    }

    .menu a:hover {
        color: #0078d4;
    }
`
