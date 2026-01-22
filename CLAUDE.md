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

**Backend only** (API server on port 8000):
```bash
make backend-dev
# or: cd backend && uv run uvicorn src.main:app --reload
```

**Frontend only** (Dev server on port 3000):
```bash
make frontend-dev
# or: npm start
```

**Full stack** (both backend and frontend):
```bash
make dev-full
# or: docker-compose --profile dev up
```

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

All endpoints are under `/api/v1/`:

- `GET /api/health` - Health check
- `GET /api/v1/github/user/{username}` - Fetch GitHub user profile
- `GET /api/v1/github/stats/{username}` - Fetch GitHub statistics
- `GET /api/docs` - Swagger UI documentation
- `GET /api/redoc` - ReDoc documentation
- `/*` - SPA catch-all (serves `index.html` for client-side routing)

### GitHub API Integration

**File**: `src/services/github-api.ts` (frontend) + `backend/src/infrastructure/repositories/github_http_repository.py` (backend)

- Backend proxies GitHub API calls via `GitHubHttpRepository`
- Two-layer caching:
  - Backend: In-memory cache with TTL (1hr for user, 30min for stats)
  - Frontend: `localStorage` cache with TTL (same durations)
- Graceful error handling with fallback values
- Avatar URL uses GitHub redirect: `https://github.com/{username}.png`

## Important Files

### Frontend

| File | Purpose |
|------|---------|
| `src/pages/home/home.ts` | Main page component with animation orchestration |
| `src/components/profile-card/` | GitHub profile display |
| `src/components/stats-bar/` | GitHub stats with event-based loading |
| `src/services/github-api.ts` | Backend API client with localStorage caching |
| `src/styles.ts` | Global Dracula theme colors |
| `vite.config.ts` | Vite dev server config with API proxy |

### Backend

| File | Purpose |
|------|---------|
| `backend/src/main.py` | FastAPI app entry point |
| `backend/src/domain/entities/github_user.py` | Domain entity with validation |
| `backend/src/application/use_cases/fetch_github_user.py` | Use case for fetching GitHub user |
| `backend/src/infrastructure/repositories/github_http_repository.py` | GitHub API HTTP client |
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

6. **Multi-stage Docker Build**: `backend/Dockerfile` builds web app first (stage 1), then Python runtime (stage 2+). Ensure both Node.js and Python dependencies are installed

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
