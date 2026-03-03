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
    box-sizing: border-box;
    color: #f8f8f2;
    font-family: 'Fira Mono', 'Consolas', 'Menlo', 'Monaco', monospace;
  }

  .main-title {
    font-size: 3rem;
    font-weight: 900;
    letter-spacing: 0;
    color: #50fa7b;
    margin: 0 0 24px 0;
    line-height: 1.2;
    min-height: 60px;
    display: inline-block;
    white-space: nowrap;
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

  .projects-section {
    margin-top: 48px;
    opacity: 0;
    animation: fadeIn 0.5s ease-out 2.6s forwards;
  }

  .projects-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #50fa7b;
    margin: 0 0 16px 0;
    letter-spacing: 0.05em;
  }

  .projects-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .project-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #8be9fd;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.2s ease, transform 0.2s ease;
  }

  .project-link:hover {
    color: #50fa7b;
    transform: translateX(4px);
  }

  .project-icon {
    font-size: 0.9rem;
    transition: transform 0.2s ease;
  }

  .project-link:hover .project-icon {
    transform: translateX(2px);
  }

  .project-name {
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease;
  }

  .project-link:hover .project-name {
    border-bottom-color: #50fa7b;
  }

  .recent-section {
    margin-top: 32px;
    opacity: 0;
    animation: fadeIn 0.5s ease-out 2.9s forwards;
  }

  .recent-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #bd93f9;
    margin: 0 0 16px 0;
    letter-spacing: 0.05em;
  }

  .recent-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .recent-item {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    color: #8be9fd;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.2s ease, transform 0.2s ease;
    flex-wrap: wrap;
  }

  .recent-item:hover {
    color: #bd93f9;
    transform: translateX(4px);
  }

  .recent-name {
    flex: 0 0 auto;
  }

  .recent-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.85rem;
    color: #6272a4;
    flex-wrap: wrap;
  }

  .recent-lang {
    color: #ffb86c;
  }

  .recent-stars {
    color: #f1fa8c;
  }

  .recent-date {
    color: #6272a4;
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
      padding: 20px 16px 80px;
    }

    .main-title {
      font-size: 2rem;
      letter-spacing: 0;
      white-space: normal;
      display: block;
      max-width: 100%;
    }

    .tagline {
      font-size: 0.95rem;
      max-width: 100%;
    }

    .skills-and-contributions {
      flex-direction: column;
      gap: 24px;
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

    .projects-section {
      margin-top: 24px;
    }
  }
`;
