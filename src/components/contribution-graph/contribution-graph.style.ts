import { css } from 'lit';

export const contributionGraphStyles = css`
  :host {
    display: block;
    width: 100%;
  }

  .calendar-container {
    container-type: inline-size;
    container-name: calendar;
    padding: 0;
    position: relative;
    width: 100%;
    max-width: 100%;
  }

  .month-labels {
    display: grid;
    grid-template-columns: repeat(52, 1fr);
    gap: 3px;
    margin-bottom: 8px;
    font-family: 'Fira Mono', 'Consolas', 'Menlo', 'Monaco', monospace;
    font-size: 10px;
    color: #6272a4;
  }

  .month-label {
    text-align: left;
    padding-left: 2px;
    grid-column: span 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .loading {
    text-align: center;
    color: #8be9fd;
    font-family: 'Fira Mono', 'Consolas', 'Menlo', 'Monaco', monospace;
    font-size: 14px;
    animation: pulse 1.5s ease-in-out infinite;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(52, minmax(0, 1fr));
    gap: 3px;
    padding: 16px 0;
    width: 100%;
  }

  .calendar-week {
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 100%;
  }

  .contribution-cell {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid transparent;
    animation: fadeIn 0.5s ease-out forwards;
    animation-delay: var(--animation-delay, 0ms);
    opacity: 0;
    min-width: 3px;
    max-width: 12px;
  }

  .contribution-cell:hover {
    border-color: #8be9fd;
    transform: scale(1.2);
    box-shadow: 0 0 8px rgba(139, 233, 253, 0.3);
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

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
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

  /* Container-based responsive sizing */
  @container calendar (max-width: 450px) {
    .calendar-grid {
      gap: 2px;
    }

    .calendar-week {
      gap: 2px;
    }

    .contribution-cell {
      max-width: 10px;
    }

    .month-labels {
      gap: 2px;
      font-size: 9px;
    }
  }

  /* Extra small containers */
  @container calendar (max-width: 350px) {
    .contribution-cell {
      max-width: 8px;
    }

    .month-labels {
      font-size: 8px;
    }
  }

  /* Fallback for browsers without container query support */
  @supports not (container-type: inline-size) {
    @media (max-width: 600px) {
      .calendar-grid {
        gap: 2px;
      }

      .calendar-week {
        gap: 2px;
      }

      .contribution-cell {
        max-width: 10px;
      }

      .month-labels {
        gap: 2px;
        font-size: 9px;
      }

      .tooltip {
        font-size: 11px;
        padding: 6px 10px;
      }
    }
  }
`;
