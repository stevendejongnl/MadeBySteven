import { css } from 'lit';

export const contributionGraphStyles = css`
  :host {
    display: block;
    width: 100%;
  }

  .calendar-container {
    padding: 0;
    position: relative;
    width: 100%;
    max-width: 100%;
  }

  canvas {
    display: block;
    width: 100%;
  }

  .loading {
    text-align: center;
    color: #8be9fd;
    font-family: 'Fira Mono', 'Consolas', 'Menlo', 'Monaco', monospace;
    font-size: 14px;
    animation: pulse 1.5s ease-in-out infinite;
  }

  .tooltip {
    position: absolute;
    background-color: #282a36;
    border: 1px solid #44475a;
    border-radius: 4px;
    padding: 8px 12px;
    font-family: 'Fira Mono', 'Consolas', 'Menlo', 'Monaco', monospace;
    font-size: 12px;
    color: #f8f8f2;
    z-index: 1000;
    white-space: nowrap;
    pointer-events: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    animation: tooltipFadeIn 0.2s ease-out;
  }

  .tooltip-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .tooltip-date {
    color: #8be9fd;
    font-weight: bold;
  }

  .tooltip-count {
    color: #50fa7b;
  }

  .tooltip-arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #282a36;
    border: 1px solid #44475a;
    border-right: none;
    border-top: none;
    transform: rotate(45deg);
    bottom: -5px;
    left: 50%;
    margin-left: -4px;
  }

  .total-contributions {
    text-align: center;
    color: #8be9fd;
    font-family: 'Fira Mono', 'Consolas', 'Menlo', 'Monaco', monospace;
    font-size: 12px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #44475a;
  }

  @keyframes tooltipFadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
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
