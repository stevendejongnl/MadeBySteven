import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { fetchAggregatedContributions, ContributionDay, ContributionWeek } from '../../services/github-api.js';
import { contributionGraphStyles } from './contribution-graph.style.js';

const CELL_GAP = 3;
const MONTH_LABEL_HEIGHT = 20;
const WEEK_DELAY_MS = 30;
const FADE_DURATION_MS = 500;
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

@customElement('mbs-contribution-graph')
export class MbsContributionGraph extends LitElement {
  static override styles = contributionGraphStyles;

  @state() private weeks: ContributionWeek[] = [];
  @state() private loading: boolean = true;
  @state() private totalContributions: number = 0;
  @state() private tooltipData: { date: string; count: number; x: number; y: number } | null = null;
  @state() private isSmallDevice: boolean = window.innerWidth <= 768;

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private cellSize: number = 10;
  private offsetX: number = 0;
  private offsetY: number = MONTH_LABEL_HEIGHT;
  private alphaByWeek: number[] = [];
  private animationId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private hoveredCell: { col: number; row: number } | null = null;

  private resizeListener = () => {
    this.isSmallDevice = window.innerWidth <= 768;
    this.requestUpdate();
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this.loadContributions();
    window.addEventListener('resize', this.resizeListener);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.resizeListener);
    this.resizeObserver?.disconnect();
    if (this.animationId !== null) cancelAnimationFrame(this.animationId);
  }

  private async loadContributions(): Promise<void> {
    try {
      const contributions = await fetchAggregatedContributions();
      this.weeks = contributions.weeks;
      this.totalContributions = contributions.total_contributions;
      this.loading = false;
      this.requestUpdate();
      await this.updateComplete;
      this.setupCanvas();
      // Defer until browser layout is complete so offsetWidth is non-zero
      requestAnimationFrame(() => {
        this.resizeCanvas();
        this.animateCalendar();
      });
    } catch (error) {
      console.error('Failed to load contributions:', error);
      this.loading = false;
      this.requestUpdate();
    }
  }

  private setupCanvas(): void {
    this.canvas = this.shadowRoot?.getElementById('contribution-canvas') as HTMLCanvasElement | null;
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.canvas.addEventListener('mousemove', (e) => this.handleCanvasMouseMove(e));
    this.canvas.addEventListener('mouseleave', () => this.handleCanvasMouseLeave());

    this.resizeObserver?.disconnect();
    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas();
      if (this.weeks.length > 0) this.drawFrame(this.alphaByWeek);
    });
    // Observe the container div, not the canvas — canvas has no intrinsic CSS size
    const container = this.canvas.parentElement;
    if (container) this.resizeObserver.observe(container);
  }

  private resizeCanvas(): void {
    if (!this.canvas || !this.ctx) return;

    const container = this.canvas.parentElement;
    if (!container) return;

    // Use getBoundingClientRect for accurate post-layout width
    const cssWidth = container.getBoundingClientRect().width || container.offsetWidth;

    // Layout not ready yet — retry next frame
    if (cssWidth <= 0) {
      requestAnimationFrame(() => this.resizeCanvas());
      return;
    }
    const numWeeks = Math.max(this.weeks.length, 52);
    this.cellSize = (cssWidth - numWeeks * CELL_GAP) / numWeeks;
    const cssHeight = MONTH_LABEL_HEIGHT + 7 * (this.cellSize + CELL_GAP);

    const dpr = window.devicePixelRatio || 1;
    this.canvas.style.width = `${cssWidth}px`;
    this.canvas.style.height = `${cssHeight}px`;
    this.canvas.width = Math.round(cssWidth * dpr);
    this.canvas.height = Math.round(cssHeight * dpr);

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);

    this.offsetX = 0;
    this.offsetY = MONTH_LABEL_HEIGHT;
  }

  private animateCalendar(): void {
    if (this.animationId !== null) cancelAnimationFrame(this.animationId);
    const numWeeks = this.weeks.length;
    this.alphaByWeek = new Array(numWeeks).fill(0);
    const startTime = performance.now();

    const loop = (now: number) => {
      const elapsed = now - startTime;
      let allDone = true;
      for (let i = 0; i < numWeeks; i++) {
        const t = (elapsed - i * WEEK_DELAY_MS) / FADE_DURATION_MS;
        this.alphaByWeek[i] = Math.min(Math.max(t, 0), 1);
        if ((this.alphaByWeek[i] ?? 0) < 1) allDone = false;
      }
      this.drawFrame(this.alphaByWeek);
      if (!allDone) this.animationId = requestAnimationFrame(loop);
      else this.animationId = null;
    };

    this.animationId = requestAnimationFrame(loop);
  }

  private drawFrame(alphaByWeek: number[]): void {
    if (!this.ctx || !this.canvas) return;
    const cssWidth = parseFloat(this.canvas.style.width) || this.canvas.offsetWidth;
    const cssHeight = parseFloat(this.canvas.style.height) || this.canvas.offsetHeight;

    this.ctx.clearRect(0, 0, cssWidth, cssHeight);
    this.drawMonthLabels(this.ctx);
    this.drawCells(this.ctx, alphaByWeek);
  }

  private drawMonthLabels(ctx: CanvasRenderingContext2D): void {
    ctx.font = '10px "Fira Mono", Consolas, Menlo, Monaco, monospace';
    ctx.fillStyle = '#6272a4';
    ctx.textBaseline = 'top';

    let lastMonth = -1;
    this.weeks.forEach((week, col) => {
      const firstDay = week.days[0];
      if (!firstDay?.date) return;
      const month = new Date(firstDay.date).getMonth();
      if (month !== lastMonth) {
        const x = this.offsetX + col * (this.cellSize + CELL_GAP);
        ctx.fillText(MONTH_NAMES[month] ?? '', x, 2);
        lastMonth = month;
      }
    });
  }

  private drawCells(ctx: CanvasRenderingContext2D, alphaByWeek: number[]): void {
    const r = Math.max(2, this.cellSize * 0.18);

    this.weeks.forEach((week, col) => {
      const alpha = alphaByWeek[col] ?? 0;
      if (alpha <= 0) return;

      week.days.forEach((day: ContributionDay, row) => {
        const x = this.offsetX + col * (this.cellSize + CELL_GAP);
        const y = this.offsetY + row * (this.cellSize + CELL_GAP);

        const isHovered = this.hoveredCell?.col === col && this.hoveredCell?.row === row;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.getLevelColor(day.level);
        this.roundRect(ctx, x, y, this.cellSize, this.cellSize, r);
        ctx.fill();

        if (isHovered) {
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = '#8be9fd';
          ctx.lineWidth = 1.5;
          this.roundRect(ctx, x, y, this.cellSize, this.cellSize, r);
          ctx.stroke();
        }
      });
    });

    ctx.globalAlpha = 1;
  }

  private roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }
  }

  private getLevelColor(level: number): string {
    switch (level) {
      case 1: return 'rgba(80, 250, 123, 0.2)';
      case 2: return 'rgba(80, 250, 123, 0.4)';
      case 3: return 'rgba(80, 250, 123, 0.6)';
      case 4: return '#50fa7b';
      default: return '#44475a';
    }
  }

  private handleCanvasMouseMove(event: MouseEvent): void {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const col = Math.floor((mouseX - this.offsetX) / (this.cellSize + CELL_GAP));
    const row = Math.floor((mouseY - this.offsetY) / (this.cellSize + CELL_GAP));

    const week = this.weeks[col];
    const day = week?.days[row];

    if (day && col >= 0 && col < this.weeks.length && row >= 0 && row < 7) {
      this.hoveredCell = { col, row };
      const hostRect = this.shadowRoot?.host.getBoundingClientRect();
      const containerWidth = (this.shadowRoot?.host as HTMLElement)?.offsetWidth ?? 300;
      const TOOLTIP_HALF_WIDTH = 70;
      const rawX = hostRect ? event.clientX - hostRect.left : event.clientX;
      const clampedX = Math.max(TOOLTIP_HALF_WIDTH, Math.min(rawX, containerWidth - TOOLTIP_HALF_WIDTH));
      this.tooltipData = {
        date: day.date,
        count: day.count,
        x: clampedX,
        y: hostRect ? event.clientY - hostRect.top : event.clientY,
      };
    } else {
      this.hoveredCell = null;
      this.tooltipData = null;
    }

    this.requestUpdate();
    if (this.animationId === null) this.drawFrame(this.alphaByWeek);
  }

  private handleCanvasMouseLeave(): void {
    this.hoveredCell = null;
    this.tooltipData = null;
    this.requestUpdate();
    if (this.animationId === null) this.drawFrame(this.alphaByWeek);
  }

  override render() {
    return html`
      <div class="calendar-container">
        ${this.loading
          ? html`<div class="loading">Loading contributions...</div>`
          : html`
              <canvas id="contribution-canvas"></canvas>

              ${this.tooltipData
                ? html`
                    <div
                      class="tooltip"
                      style="left: ${this.tooltipData.x}px; top: ${this.tooltipData.y - 50}px; transform: translateX(-50%)"
                    >
                      <div class="tooltip-content">
                        <span class="tooltip-date">${this.tooltipData.date}</span>
                        <span class="tooltip-count">${this.tooltipData.count} ${this.tooltipData.count === 1 ? 'contribution' : 'contributions'}</span>
                      </div>
                      <div class="tooltip-arrow"></div>
                    </div>
                  `
                : ''}

              ${this.weeks.length > 0 && this.isSmallDevice
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
