import { css } from 'lit';

export const statsBarStyles = css`
  :host {
    display: block;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .status-bar {
    padding: 16px 0;
    border-top: 1px solid #44475a;
    font-family: 'Fira Mono', 'Consolas', 'Menlo', 'Monaco', monospace;
    font-size: 12px;
    color: #8be9fd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
  }

  .stats-content {
    display: flex;
    align-items: center;
    gap: 24px;
    flex: 1;
    opacity: 0;
    animation: fadeIn 0.5s ease-out forwards;
  }

  .stats-content.hidden {
    opacity: 0;
    pointer-events: none;
    animation: none;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    white-space: nowrap;
  }

  .stat-item.loading {
    animation: pulse 1.5s ease-in-out infinite;
  }

  .stat-label {
    color: #f8f8f2;
  }

  .stat-value {
    color: #50fa7b;
    font-weight: bold;
  }

  .stat-lang {
    color: #ffb86c;
  }

  .stat-separator {
    color: #44475a;
  }

  @media (max-width: 768px) {
    :host {
      padding: 0 12px;
    }

    .status-bar {
      font-size: 11px;
      gap: 8px;
      padding: 10px 0;
    }

    .stats-content {
      gap: 8px;
      flex-wrap: wrap;
    }

    .stat-item {
      min-width: unset;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }
`;
