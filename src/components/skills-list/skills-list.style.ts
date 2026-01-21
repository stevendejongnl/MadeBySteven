import { css } from 'lit';

export const skillsListStyles = css`
  :host {
    display: block;
    animation: fadeIn 0.5s ease-out;
  }

  .skills-container {
    font-family: 'Fira Mono', 'Consolas', 'Menlo', 'Monaco', monospace;
    font-size: 14px;
    line-height: 1.8;
  }

  .skill-item {
    color: #f8f8f2;
    margin-bottom: 8px;
    min-height: 20px;
    display: flex;
    align-items: center;
  }

  .skill-bullet {
    color: #50fa7b;
    margin-right: 8px;
    font-weight: bold;
  }

  .skill-text {
    color: #8be9fd;
  }

  .skill-text.highlight {
    color: #50fa7b;
  }

  .cursor {
    display: inline-block;
    width: 8px;
    height: 1em;
    background-color: #44475a;
    margin-left: 4px;
    animation: blink 1s steps(1) infinite;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes blink {
    0%, 49% {
      opacity: 1;
    }
    50%, 100% {
      opacity: 0;
    }
  }
`;
