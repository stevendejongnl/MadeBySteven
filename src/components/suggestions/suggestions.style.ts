import { css } from 'lit';
import { MbsColorScheme } from '../../styles.js'

export const styles = css`
    main {
        display: grid;
        grid-template-columns: min-content auto min-content;
        grid-template-areas: "prompt commandline cursor";
        font-weight: bold;
    }
    .prompt {
        grid-area: prompt;
        color: ${MbsColorScheme.prompt};
        padding-right: 0.5rem;
    }
    .commandline {
        grid-area: commandline;
        color: ${MbsColorScheme.text};
        text-wrap: nowrap;

        .commandlink {
            color: ${MbsColorScheme.text};
            text-decoration: none;
            transition: color 0.3s ease;
        }
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
