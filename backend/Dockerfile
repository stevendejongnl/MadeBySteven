# Stage 1: Build web app
FROM node:24-slim AS web-builder
WORKDIR /web-app
COPY package*.json ./
RUN npm ci
COPY src ./src
COPY public ./public
COPY vite.config.ts tsconfig.json tsconfig.check.json ./
RUN npm run compile

# Stage 2: Python dependencies
FROM ghcr.io/astral-sh/uv:python3.13-bookworm-slim AS python-builder
WORKDIR /app
COPY backend/pyproject.toml backend/.python-version ./
RUN uv sync --frozen --no-dev

# Stage 3: Runtime
FROM python:3.13-slim
WORKDIR /app

# Copy Python dependencies from builder
COPY --from=python-builder /app/.venv /app/.venv
ENV PATH="/app/.venv/bin:$PATH"

# Copy backend source
COPY backend/src ./src

# Copy compiled web app from builder
COPY --from=web-builder /web-app/public ../web-app/public

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
