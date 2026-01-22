# Made by Steven - Development Guide

## Project Overview

This is a modern, professional personal portfolio website built with:
- **Frontend**: Lit web components with TypeScript and Vite
- **Backend**: FastAPI with Python 3.12, following layered DDD architecture
- **Deployment**: Docker multi-stage build, Kubernetes blue-green deployment

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Lit, TypeScript, Vite, Playwright |
| **Backend** | FastAPI, Uvicorn, Pydantic, httpx, dependency-injector |
| **Architecture** | Layered DDD (Domain, Application, Infrastructure, Presentation) |
| **Package Manager** | npm (frontend), uv (backend) |
| **Container** | Docker (multi-stage build) |
| **Orchestration** | Kubernetes with blue-green deployment |

## Quick Start

### Prerequisites
- Node.js 24 LTS (24.12.0+)
- Python 3.13 (3.13.1+)
- uv (Python package manager)
- Docker & Docker Compose (optional, for containerized development)

### Installation

```bash
# Install all dependencies
make install
```

### Development

#### Recommended: Docker-based Full Stack (single terminal)

```bash
make dev-full
```

This provides the complete development experience in one terminal:
- **Port 8000** - Backend API with frontend (Uvicorn auto-reload on source changes)
- **Port 3000** - Vite dev server with hot module replacement (HMR)

How it works:
1. Compiles fresh frontend locally (`npm run compile`)
2. Rebuilds Docker image with fresh backend and frontend
3. Mounts both `./backend/src` and `./public` into container for live changes
4. Both backend (Python) and frontend (TypeScript) auto-reload on file changes

**Note**: The Docker image rebuild happens once on startup. After containers are running:
- Frontend changes in `src/` trigger Vite HMR on port 3000 (instant)
- Backend changes in `backend/src/` trigger Uvicorn reload on port 8000 (instant)

To force a full rebuild without restarting:
```bash
make dev-full  # Stops containers, rebuilds image, restarts
```

#### Alternative: Native Dev Servers (if Docker not available)

**Backend only**:
```bash
make backend-dev
# Runs on http://localhost:8000
```

**Frontend only**:
```bash
make frontend-dev
# Runs on http://localhost:3000 with HMR
```

**Full stack** (2 terminals):
```bash
# Terminal 1
make backend-dev

# Terminal 2
make frontend-dev
```

This is faster for active development if you have Python and Node installed locally, but requires managing multiple terminals.

### Testing

```bash
# All tests
make test

# Backend tests
make backend-test

# Backend tests (fast mode, exit on first failure)
make backend-test-fast

# Frontend tests
make frontend-test

# Frontend tests (fast mode, Chromium only, no retries)
make frontend-test-fast
```

## Architecture

### Frontend (Lit Components)

All components are Lit `LitElement` web components with scoped CSS styling:

1. **Profile Card** (`src/components/profile-card/`)
   - Fetches GitHub user data via backend API
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

### Backend (Layered DDD Architecture)

The backend follows **Domain-Driven Design** with four distinct layers:

**1. Domain Layer** (`backend/src/domain/`)
- **Purpose**: Pure business logic with NO external dependencies
- **Components**:
  - `entities/` - Domain entities (e.g., `GitHubUser`)
  - `value_objects/` - Immutable value objects (e.g., `Username`)
  - `repositories/` - Repository interfaces (contracts for data access)
- **Benefits**: Highly testable, easily understood business rules

**2. Application Layer** (`backend/src/application/`)
- **Purpose**: Use cases that orchestrate domain logic
- **Components**:
  - `use_cases/` - Use case implementations (e.g., `FetchGitHubUser`)
  - `dtos/` - Data Transfer Objects for API responses
- **Benefits**: Clear separation between business logic and API concerns

**3. Infrastructure Layer** (`backend/src/infrastructure/`)
- **Purpose**: External service integrations and data access
- **Components**:
  - `repositories/` - Repository implementations (e.g., `GitHubHttpRepository`)
  - `cache/` - Caching strategy (in-memory cache with TTL)
  - `config.py` - Configuration management with pydantic-settings
- **Benefits**: Easy to swap implementations (e.g., Redis for in-memory cache)

**4. Presentation Layer** (`backend/src/presentation/`)
- **Purpose**: API routes and dependency injection
- **Components**:
  - `api/app.py` - FastAPI app factory with SPA routing
  - `api/routers/` - API route handlers
  - `container.py` - Dependency injection container
- **Benefits**: Clean separation of concerns, easy testing with mocked dependencies

### API Endpoints

All endpoints are under `/api/`:

- `GET /api/health` - Health check
- `GET /api/v1/profiles/github` - Fetch GitHub user profile
- `GET /api/v1/stats` - Fetch aggregated statistics
- `GET /api/docs` - Swagger UI documentation
- `GET /api/redoc` - ReDoc documentation
- `/*` - SPA catch-all (serves `index.html` for client-side routing)

### GitHub API Integration

**File**: `src/services/github-api.ts` (frontend) + `backend/src/infrastructure/repositories/github_http_repository.py` (backend)

- GitHub username is configured via `GITHUB_USERNAME` environment variable (defaults to `stevendejongnl`)
- Backend proxies GitHub API calls via `GitHubHttpRepository`
- Two-layer caching:
  - Backend: In-memory cache with TTL (1hr for user, 30min for stats)
  - Frontend: `localStorage` cache with TTL (same durations)
- Graceful error handling with fallback values
- Avatar URL uses GitHub redirect: `https://github.com/{username}.png`
- Architecture supports multiple profile providers (GitHub, GitLab, Gitea, etc.) via extensible `/api/v1/profiles/{service}` pattern

## Important Files

### Frontend

| File | Purpose |
|------|---------|
| `src/pages/home/home.ts` | Main page component with animation orchestration |
| `src/components/profile-card/` | GitHub profile display |
| `src/components/stats-bar/` | GitHub stats with event-based loading |
| `src/components/contribution-graph/` | GitHub contribution calendar grid |
| `src/services/github-api.ts` | Backend API client with localStorage caching |
| `src/styles.ts` | Global Dracula theme colors |
| `vite.config.ts` | Vite dev server config with API proxy |

### Backend

| File | Purpose |
|------|---------|
| `backend/src/main.py` | FastAPI app entry point |
| `backend/src/domain/entities/github_user.py` | Domain entity with validation |
| `backend/src/domain/entities/contribution_calendar.py` | Contribution calendar entity |
| `backend/src/domain/value_objects/contribution_day.py` | Individual day contribution data |
| `backend/src/domain/value_objects/contribution_week.py` | Weekly contribution collection |
| `backend/src/application/dtos/contribution_dto.py` | Contribution data transfer objects |
| `backend/src/application/use_cases/fetch_github_user.py` | Use case for fetching GitHub user |
| `backend/src/application/use_cases/fetch_github_contributions.py` | Use case for fetching contributions with level calculation |
| `backend/src/infrastructure/repositories/github_http_repository.py` | GitHub API HTTP client with GraphQL |
| `backend/src/infrastructure/cache/in_memory_cache.py` | In-memory cache implementation |
| `backend/src/presentation/api/routers/github.py` | API route handlers |
| `backend/src/presentation/container.py` | Dependency injection container |

### DevOps

| File | Purpose |
|------|---------|
| `backend/Dockerfile` | Multi-stage build: web app + backend |
| `compose.yml` | Docker Compose for local development |
| `deployment.yaml` | Kubernetes blue-green deployment |
| `.github/workflows/deploy.yml` | CI/CD pipeline for blue-green deployment |
| `Makefile` | Development convenience commands |

## Development Workflow

### Test-Driven Development (Red-Green-Refactor)

The backend uses TDD with co-located tests:

1. **RED**: Write failing test in `*_test.py` file next to source
   ```bash
   # Example: backend/src/domain/value_objects/username_test.py
   cd backend && uv run pytest src/domain/value_objects/username_test.py
   ```

2. **GREEN**: Write minimal code to make test pass
   ```python
   # backend/src/domain/value_objects/username.py
   @dataclass(frozen=True)
   class Username:
       value: str
       def __post_init__(self):
           if not self.value:
               raise ValueError("Username cannot be empty")
   ```

3. **REFACTOR**: Clean up code while keeping tests green
   ```bash
   cd backend && uv run pytest
   ```

### Adding a New Backend Feature

1. **Create domain entity/value object** (with tests)
   - Add to `backend/src/domain/`
   - Write tests in `*_test.py` files
   - No external dependencies

2. **Create use case** (with tests)
   - Add to `backend/src/application/use_cases/`
   - Write tests for orchestration logic
   - Mock repository dependency

3. **Create infrastructure implementation** (with tests)
   - Add to `backend/src/infrastructure/`
   - Implement repository interface
   - Add to DI container

4. **Create API route** (with tests)
   - Add to `backend/src/presentation/api/routers/`
   - Wire dependency injection
   - Test with FastAPI test client

### Frontend Development

- **Style Guide**: Dracula theme (all colors defined in `src/styles.ts`)
- **Component Pattern**: Lit `LitElement` with scoped CSS
- **State Management**: `@state()` for internal, `@property()` for external
- **Testing**: Playwright E2E tests in `tests/` directory

### Testing Visual Changes with Playwright

**Important workflow for testing UI/styling changes:**

1. **Start the development server**:
   ```bash
   make dev-full
   ```
   This runs the complete stack and serves the app at **http://localhost:8000** (not localhost:3000)

2. **CSS changes require rebuild**: When you modify CSS files (`.style.ts`), you must restart the dev server:
   ```bash
   # Stop the running dev-full (Ctrl+C)
   # Then rebuild and restart:
   make dev-full
   ```
   CSS changes are bundled during the initial Docker build and don't auto-reload like TypeScript changes do. The rebuild compiles the updated CSS and includes it in the served assets.

3. **Always test with Playwright plugin** before committing visual changes:
   - Use the Playwright MCP plugin to take screenshots at multiple screen sizes
   - Test at minimum: desktop (1280px), tablet (768px), and mobile (375px)
   - Verify responsive behavior and CSS changes across all breakpoints

4. **Example Playwright testing commands**:
   - Navigate to http://localhost:8000
   - Resize viewport: `browser_resize(width, height)`
   - Take screenshots: `browser_take_screenshot(filename)`
   - Check element state: `browser_snapshot()`

This ensures CSS changes render correctly before deployment and catches responsive design issues early.

### Git Hooks

This project uses `simple-git-hooks` for automated quality checks:

- **pre-commit**: Runs TypeScript type checking (`npm run typecheck`)
- **pre-push**: Runs fast test suite (`npm run test:fast`)

To skip hooks in emergencies:
```bash
git commit --no-verify
git push --no-verify
```

## Known Gotchas

1. **Avatar Loading**: GitHub's direct avatar URLs sometimes fail; use `https://github.com/{username}.png` redirect

2. **Loading State Sync**: Stats bar loading state must sync with skills animation completion via `skillsFinished` property

3. **Shadow DOM**: Lit components render in Shadow DOM; global styles don't apply. Define styles in component CSS

4. **Playwright Testing**: Components in Shadow DOM require `querySelector()` + `shadowRoot` to access

5. **API Proxy Development**: Frontend dev server proxies `/api` to backend (see `vite.config.ts`); ensure backend is running on port 8000

6. **Fresh Docker Builds**: `make dev-full` rebuilds frontend locally before starting Docker. This ensures port 8000 serves fresh code. If you change source and the browser shows old code, restart `make dev-full` to rebuild.

7. **Multi-stage Docker Build**: `backend/Dockerfile` builds web app first (stage 1), then Python runtime (stage 2+). Ensure both Node.js and Python dependencies are installed

8. **GitHub Contribution Graph**: Requires `GITHUB_TOKEN` for GraphQL API access:
   - Create a token at https://github.com/settings/tokens (classic token)
   - Minimum scope: `read:user`
   - Add to `.env` file in project root: `GITHUB_TOKEN=ghp_xxxxxxxxxxxx`
   - Without token, GraphQL API returns HTTP 401 error
   - Frontend gracefully shows empty calendar if backend fails
   - Token is NOT shared with frontend; all GitHub API calls go through backend

9. **CSS Changes Require Docker Rebuild**: Unlike TypeScript changes which auto-reload, CSS modifications (`.style.ts` files) are bundled during Docker build. Always run `make dev-full` again after editing CSS to pick up changes. Changes to TypeScript component files will auto-reload, but CSS needs a rebuild.

## Common Tasks

### Add a new frontend component

1. Create directory: `src/components/{name}/`
2. Create files:
   - `{name}.ts` (main component)
   - `{name}.style.ts` (styles)
3. Export from parent component

### Modify backend API

1. Update domain entity/value object (with tests)
2. Create use case (with tests)
3. Create/update infrastructure implementation
4. Add/update route in `backend/src/presentation/api/routers/github.py`
5. Run tests: `cd backend && uv run pytest`

### Update colors

Edit `src/styles.ts` and update Dracula theme variables across all components.

### Deploy to Kubernetes

1. Push changes to main branch
2. GitHub Actions runs:
   - Determines blue/green color
   - Builds multi-stage Docker image
   - Pushes to GHCR
   - Deploys to Kubernetes
   - Switches traffic to new deployment
   - Cleans up old deployment
3. Blue-green allows instant rollback by updating service selector

### Debug in browser

1. Open DevTools (F12)
2. Components are custom elements in Shadow DOM
3. Use `$0.shadowRoot` in console to inspect internal DOM
4. Add `console.log()` statements in component methods

## Performance Considerations

- **Frontend**: Lit only re-renders when state changes; animations are CSS-based
- **Backend**: Two-layer caching (backend in-memory + frontend localStorage) reduces GitHub API calls
- **Infrastructure**: Blue-green deployment ensures zero-downtime updates
- **Container**: Multi-stage Docker build produces small production images

## Future Enhancements

1. **GraphQL for Contributions**: Real contribution count via GitHub GraphQL API (currently placeholder)
2. **Redis Cache**: Replace in-memory cache for multi-replica deployments
3. **Rate Limiting**: Protect API from abuse
4. **Monitoring**: Add Prometheus metrics and Sentry error tracking
5. **Authentication**: Protect sensitive endpoints
6. **Database**: Persistent storage for caching instead of in-memory
