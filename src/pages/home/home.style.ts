import { css } from 'lit';

export const homeStyles = css`
  :host {
    display: block;
    width: 100%;
  }

  section {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 24px 100px 24px;
    color: #f8f8f2;
    font-family: 'Fira Mono', 'Consolas', 'Menlo', 'Monaco', monospace;
  }

  .main-title {
    font-size: 3.5rem;
    font-weight: 900;
    letter-spacing: 0.15em;
    color: #50fa7b;
    margin: 0 0 24px 0;
    line-height: 1.2;
    min-height: 60px;
    display: flex;
    align-items: center;
  }

  .title-cursor {
    display: inline-block;
    width: 8px;
    height: 1.2em;
    background-color: #50fa7b;
    margin-left: 4px;
    animation: blink 1s steps(1) infinite;
  }

  .tagline {
    font-size: 1.1rem;
    color: #f8f8f2;
    margin: 0 0 32px 0;
    font-weight: 300;
    line-height: 1.6;
    max-width: 600px;
    opacity: 0;
    animation: fadeIn 0.5s ease-out 1.8s forwards;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    margin-bottom: 32px;
    opacity: 0;
    animation: fadeIn 0.5s ease-out 2.2s forwards;
  }

  .skills-and-contributions {
    display: flex;
    gap: 48px;
    align-items: flex-start;
    margin-bottom: 32px;
    opacity: 0;
    animation: fadeIn 0.5s ease-out forwards;
  }

  .skills-section {
    flex: 0 0 auto;
    width: 280px;
    opacity: 1;
    animation: fadeIn 0.5s ease-out forwards;
  }

  .contributions-section {
    flex: 1 1 auto;
    min-width: 0;
    min-height: 0;
    opacity: 0;
    animation: fadeIn 0.5s ease-out forwards;
  }

  .stats-section {
    opacity: 0;
    animation: fadeIn 0.5s ease-out 3.8s forwards;
    margin-top: 24px;
  }

  .status-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 100;
    background-color: #282a36;
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

  @media (max-width: 768px) {
    section {
      padding: 24px 12px;
    }

    .main-title {
      font-size: 2rem;
    }

    .tagline {
      font-size: 1rem;
    }

    .skills-and-contributions {
      flex-direction: column;
      gap: 32px;
      width: 100%;
    }

    .skills-section {
      flex: 1 1 auto;
      width: 100%;
    }

    .contributions-section {
      flex: 1 1 auto;
      width: 100%;
      max-width: 100%;
    }
  }
`;
