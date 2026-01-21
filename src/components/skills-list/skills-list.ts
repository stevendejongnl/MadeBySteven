import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { skillsListStyles } from './skills-list.style.js';

interface Skill {
  text: string
  displayedText: string
  isComplete: boolean
}

@customElement('mbs-skills-list')
export class MbsSkillsList extends LitElement {
  static override styles = skillsListStyles;

  private skillCombinations: Skill[][] = [
    [
      { text: 'Web components & developer interfaces', displayedText: '', isComplete: false },
      { text: 'Frontend tools & UI utilities', displayedText: '', isComplete: false },
      { text: 'Python & TypeScript driven solutions', displayedText: '', isComplete: false },
    ],
    [
      { text: 'Apps for iOS, Android & web', displayedText: '', isComplete: false },
      { text: 'Home automation & IoT projects', displayedText: '', isComplete: false },
      { text: 'Python & TypeScript driven solutions', displayedText: '', isComplete: false },
    ],
    [
      { text: 'Frontend tools & UI utilities', displayedText: '', isComplete: false },
      { text: 'Developer-focused utilities & tools', displayedText: '', isComplete: false },
      { text: 'Python & TypeScript driven solutions', displayedText: '', isComplete: false },
    ],
    [
      { text: 'Web components & developer interfaces', displayedText: '', isComplete: false },
      { text: 'Apps for iOS, Android & web', displayedText: '', isComplete: false },
      { text: 'Home automation & IoT projects', displayedText: '', isComplete: false },
    ],
  ];

  @state() private skills: Skill[] = [];

  @state() private currentSkillIndex: number = 0;

  @state() private currentCharIndex: number = 0;

  private animationTimeout: number | undefined;

  private animationDelay: number = 50;

  override connectedCallback(): void {
    super.connectedCallback();
    const randomIndex = Math.floor(Math.random() * this.skillCombinations.length);
    this.skills = this.skillCombinations[randomIndex]!.map(skill => ({ ...skill }));
    this.startAnimation();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }

  private startAnimation(): void {
    if (this.currentSkillIndex >= this.skills.length) {
      this.dispatchEvent(
        new CustomEvent('skills-finished', {
          bubbles: true,
          composed: true,
        })
      );
      return;
    }

    const currentSkill = this.skills[this.currentSkillIndex];

    if (currentSkill && this.currentCharIndex < currentSkill.text.length) {
      currentSkill.displayedText = currentSkill.text.substring(
        0,
        this.currentCharIndex + 1
      );
      this.requestUpdate();
      this.currentCharIndex++;
      this.animationTimeout = window.setTimeout(
        () => this.startAnimation(),
        this.animationDelay
      );
    } else if (currentSkill) {
      currentSkill.isComplete = true;
      this.currentSkillIndex++;
      this.currentCharIndex = 0;
      this.animationTimeout = window.setTimeout(
        () => this.startAnimation(),
        150
      );
    }
  }

  override render() {
    return html`
      <div class="skills-container">
        ${this.skills.map(
          (skill, index) => html`
            <div class="skill-item">
              <span class="skill-bullet">▸</span>
              <span class="skill-text">
                ${skill.displayedText}${!skill.isComplete && index === this.currentSkillIndex
                  ? html`<span class="cursor"></span>`
                  : ''}
              </span>
            </div>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mbs-skills-list': MbsSkillsList
  }
}
