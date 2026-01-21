# Made by Steven - Development Guide

## Project Setup

This is a Lit-based personal portfolio website built with TypeScript and Vite.

### Tech Stack
- **Lit**: Web components framework
- **TypeScript**: Type-safe development
- **Vite**: Build tool and dev server
- **Playwright**: E2E testing

### Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (auto-rebuilds)
npm run build        # Production build
npm run test:pw      # Run Playwright tests
npm run lint         # Lint code
```

## Architecture

### Component Structure

All components are Lit `LitElement` web components with scoped CSS styling:

1. **Profile Card** (`src/components/profile-card/`)
   - Fetches GitHub user data on `connectedCallback()`
   - Uses `@state()` for reactive properties
   - Handles image load errors with fallback SVG

2. **Skills List** (`src/components/skills-list/`)
   - Manages character-by-character animation
   - Emits custom `skills-finished` event
   - Randomly selects from predefined skill combinations

3. **Stats Bar** (`src/components/stats-bar/`)
   - Receives `skillsFinished` property from parent
   - Implements event-based loading state
   - Uses property getter/setter for reactive updates

4. **Home Page** (`src/pages/home/`)
   - Orchestrates animation timing
   - Manages visibility state for sections
   - Passes `skillsFinished` flag to stats bar

### State Management

- **@state()**: For internal reactive properties
- **@property()**: For external properties from parent components
- **Custom getters/setters**: For computed reactive state

The stats bar uses a custom getter/setter pattern for `skillsFinished`:

```typescript
@property()
get skillsFinished(): boolean {
  return this._skillsFinished;
}

set skillsFinished(value: boolean) {
  this._skillsFinished = value;
  this.updateLoading();
  this.requestUpdate();
}
```

This ensures `updateLoading()` is called whenever the property changes externally.

### GitHub API Integration

**File**: `src/services/github-api.ts`

- Fetches user data from `https://api.github.com/users/{username}`
- Caches data in `localStorage` with TTL
- Avatar URL uses GitHub redirect: `https://github.com/{username}.png`
- Graceful error handling with fallback values

## Important Files

| File | Purpose |
|------|---------|
| `src/pages/home/home.ts` | Main page component with animation orchestration |
| `src/components/profile-card/` | GitHub profile display |
| `src/components/stats-bar/` | GitHub stats with event-based loading |
| `src/services/github-api.ts` | GitHub API client with caching |
| `src/styles.ts` | Global Dracula theme colors |

## Styling

- **Dracula Theme**: All colors from Dracula color scheme
- **Scoped Styles**: Each component has its own CSS via Lit's `css` template
- **Animations**: CSS keyframes for fade-in, pulse, and typewriter effects
- **Monospace Font**: Fira Mono for terminal aesthetic

## Known Gotchas

1. **Avatar Loading**: GitHub's direct avatar URLs sometimes fail; the component uses `https://github.com/{username}.png` redirect which is more reliable

2. **Loading State Sync**: The stats bar loading state must sync with skills animation completion. Use the `skillsFinished` property, not time-based delays

3. **Shadow DOM**: Components render in Shadow DOM, so global styles don't apply. Define all styles in component CSS

4. **Playwright Testing**: Components are nested in Shadow DOM, so use `querySelector()` + `shadowRoot` to access them

## Common Tasks

### Add a new component

1. Create directory: `src/components/{name}/`
2. Create files:
   - `{name}.ts` (main component)
   - `{name}.style.ts` (styles)
3. Export from parent component

### Modify GitHub API

Edit `src/services/github-api.ts`. Remember:
- Cache TTL for user data: 3600000ms (1 hour)
- Cache TTL for stats: 1800000ms (30 minutes)
- API base: `https://api.github.com`

### Update colors

Edit `src/styles.ts` and update Dracula theme variables across all components.

### Debug in browser

1. Open DevTools (F12)
2. The profile card, skills list, and stats bar are custom elements
3. Check `shadowRoot` property to inspect their internal DOM
4. Use `console.log()` statements in component methods

## Performance Notes

- GitHub API responses are cached to reduce network requests
- Animation timings are synchronized to avoid jank
- Lit only re-renders when state changes (reactive rendering)
- Fixed positioning for status bar prevents layout recalculations
