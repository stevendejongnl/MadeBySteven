import { css } from 'lit';

export const terminalHeaderStyles = css`
  :host {
    display: block;
    background-color: #44475a;
    border-bottom: 1px solid #44475a;
    padding: 0;
  }

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 0 16px;
    gap: 16px;
  }

  .traffic-lights {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .traffic-light {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }

  .traffic-light:hover {
    opacity: 0.8;
  }

  .traffic-light.red {
    background-color: #ff5f56;
  }

  .traffic-light.yellow {
    background-color: #ffbd2e;
  }

  .traffic-light.green {
    background-color: #27c93f;
  }

  .tabs-container {
    display: flex;
    gap: 8px;
    flex: 1;
    justify-content: center;
  }

  .tab {
    color: #f8f8f2;
    text-decoration: none;
    padding: 4px 12px;
    border: 1px solid transparent;
    border-bottom: 2px solid transparent;
    font-family: 'Fira Mono', 'Consolas', 'Menlo', 'Monaco', monospace;
    font-size: 12px;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .tab:hover {
    color: #50fa7b;
    border-color: #50fa7b;
  }

  .tab.active {
    color: #50fa7b;
    border-bottom-color: #50fa7b;
  }

  .spacer {
    width: 60px;
  }
`;
