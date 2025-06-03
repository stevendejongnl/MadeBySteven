import { css } from 'lit';
import { MbsColorScheme } from '../../styles.js'

export const styles = css`
    :host {
        padding-bottom: 2rem;
        border-bottom: 1px solid ${MbsColorScheme.border};
    }
    header {
        display: grid;
        grid-template-columns: repeat(3, min-content);
        grid-template-areas: "prompt name cursor";
        font-weight: bold;
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
`