# Made by Steven

A personal portfolio website built with Lit web components and TypeScript, featuring a modern terminal-inspired design with the Dracula color scheme.

## Features

- **Profile Card Component** - Displays GitHub profile picture with avatar loading animation
- **Skills List Component** - Animated list of developer skills with typewriter effect
- **Stats Bar Component** - GitHub statistics (contributions, public repos, followers) with fixed positioning
- **Responsive Design** - Mobile-friendly layout with Dracula theme
- **Event-Based State Management** - Synchronized loading states across components

## Architecture

The application uses Lit web components with atomic design principles:

```
src/
├── components/
│   ├── profile-card/      # GitHub profile display
│   ├── skills-list/       # Animated skills section
│   ├── stats-bar/         # GitHub statistics bar
│   ├── terminal-header/   # Navigation header
│   └── main/              # Layout components
├── pages/
│   └── home/              # Homepage with animations
└── services/
    └── github-api.ts      # GitHub API integration with caching
```

## Tech Stack

- **Framework**: Lit (Web Components)
- **Language**: TypeScript
- **Build**: Vite
- **Styling**: CSS-in-JS with Lit
- **Data**: GitHub API with localStorage caching

## Getting Started

```bash
npm install
npm run dev      # Start dev server
npm run build    # Build for production
npm run test:pw  # Run Playwright tests
```

## Component Highlights

### Profile Card
- Fetches GitHub user data via API
- Displays avatar with fade-in animation
- Shows username and link to profile
- Fallback SVG avatar with initials

### Skills List
- Randomly selected from 4 skill combinations
- Character-by-character typing animation
- Emits `skills-finished` event on completion

### Stats Bar
- Fixed positioning at bottom of page
- Event-based loading state management
- Displays: Contributions, Public Repos, Followers
- Status indicator ("Loading..." → "Ready ⚡")

## Key Implementation Details

- **Event-Based Loading**: Stats bar loading state depends on both GitHub API data AND skills animation completion
- **GitHub API Caching**: 1-hour TTL for user data, 30-minute TTL for stats
- **Responsive Typography**: Terminal-style monospace font (Fira Mono) with Dracula theme
- **Staggered Animations**: Title → Tagline → Profile → Skills → Stats with precise timing
