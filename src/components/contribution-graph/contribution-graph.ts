import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { fetchGitHubContributions, ContributionDay, ContributionWeek } from '../../services/github-api.js';
import { contributionGraphStyles } from './contribution-graph.style.js';

interface MonthLabel {
  name: string;
  startIndex: number;
}

@customElement('mbs-contribution-graph')
export class MbsContributionGraph extends LitElement {
  static override styles = contributionGraphStyles;

  @state() private weeks: ContributionWeek[] = [];

  @state() private loading: boolean = true;

  @state() private totalContributions: number = 0;

  @state() private monthLabels: MonthLabel[] = [];

  @state() private tooltipData: { date: string; count: number; x: number; y: number } | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this.loadContributions();
  }

  private async loadContributions(): Promise<void> {
    try {
      const contributions = await fetchGitHubContributions();
      this.weeks = contributions.weeks;
      this.totalContributions = contributions.total_contributions;
      this.calculateMonthLabels();
      this.loading = false;
      this.requestUpdate();

      // Trigger animation after render
      window.requestAnimationFrame(() => {
        this.animateCalendar();
      });
    } catch (error) {
      console.error('Failed to load contributions:', error);
      this.loading = false;
      this.requestUpdate();
    }
  }

  private calculateMonthLabels(): void {
    const labels: MonthLabel[] = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let lastMonth = -1;

    this.weeks.forEach((week, index) => {
      // Use first day of week to determine month
      const firstDay = week.days[0];
      if (firstDay && firstDay.date) {
        const date = new Date(firstDay.date);
        const month = date.getMonth();

        // New month detected
        if (month !== lastMonth) {
          const monthName = monthNames[month];
          if (monthName) {
            labels.push({
              name: monthName,
              startIndex: index
            });
          }
          lastMonth = month;
        }
      }
    });

    this.monthLabels = labels;
  }

  private animateCalendar(): void {
    // Get all day cells and apply staggered animation
    const cells = this.shadowRoot?.querySelectorAll('.contribution-cell');
    if (!cells) return;

    cells.forEach((cell, index) => {
      const delay = Math.floor(index / 7) * 30; // 30ms per week
      (cell as HTMLElement).style.setProperty('--animation-delay', `${delay}ms`);
    });
  }

  private handleMouseEnter(event: MouseEvent, day: ContributionDay): void {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const hostRect = this.shadowRoot?.host.getBoundingClientRect();

    // Calculate tooltip position
    const x = hostRect ? rect.left - hostRect.left : 0;
    const y = hostRect ? rect.top - hostRect.top : 0;

    this.tooltipData = {
      date: day.date,
      count: day.count,
      x,
      y,
    };
  }

  private handleMouseLeave(): void {
    this.tooltipData = null;
  }

  private getLevelColor(level: number): string {
    switch (level) {
      case 1:
        return 'rgba(80, 250, 123, 0.2)';
      case 2:
        return 'rgba(80, 250, 123, 0.4)';
      case 3:
        return 'rgba(80, 250, 123, 0.6)';
      case 4:
        return '#50fa7b';
      default:
        return '#44475a';
    }
  }

  override render() {
    return html`
      <div class="calendar-container">
        ${this.loading
          ? html`<div class="loading">Loading contributions...</div>`
          : html`
              <!-- Month labels above calendar -->
              <div class="month-labels">
                ${this.monthLabels.map(
                  (label) => html`
                    <span
                      class="month-label"
                      style="grid-column: ${label.startIndex + 1}"
                    >
                      ${label.name}
                    </span>
                  `
                )}
              </div>

              <!-- Calendar grid -->
              <div class="calendar-grid">
                ${this.weeks.map(
                  (week) => html`
                    <div class="calendar-week">
                      ${week.days.map(
                        (day: ContributionDay) => html`
                          <div
                            class="contribution-cell"
                            style="background-color: ${this.getLevelColor(day.level)}"
                            @mouseenter=${(e: MouseEvent) => this.handleMouseEnter(e, day)}
                            @mouseleave=${() => this.handleMouseLeave()}
                            title="${day.date}: ${day.count} contributions"
                          ></div>
                        `
                      )}
                    </div>
                  `
                )}
              </div>

              ${this.tooltipData
                ? html`
                    <div
                      class="tooltip"
                      style="left: ${this.tooltipData.x}px; top: ${this.tooltipData.y - 50}px"
                    >
                      <div class="tooltip-content">
                        <span class="tooltip-date">${this.tooltipData.date}</span>
                        <span class="tooltip-count">${this.tooltipData.count} ${this.tooltipData.count === 1 ? 'contribution' : 'contributions'}</span>
                      </div>
                      <div class="tooltip-arrow"></div>
                    </div>
                  `
                : ''}

              ${this.weeks.length > 0
                ? html`<div class="total-contributions">Total: ${this.totalContributions} contributions</div>`
                : ''}
            `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mbs-contribution-graph': MbsContributionGraph
  }
}
