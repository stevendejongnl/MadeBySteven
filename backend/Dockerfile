# Stage 1: Build web app
FROM node:24-slim AS web-builder
WORKDIR /web-app
COPY package*.json ./
RUN npm ci
COPY src ./src
COPY index.html vite.config.ts tsconfig.json tsconfig.check.json ./
RUN npm run compile

# Stage 2: Python dependencies
FROM ghcr.io/astral-sh/uv:python3.13-bookworm-slim AS python-builder
WORKDIR /app
COPY backend/pyproject.toml backend/.python-version backend/uv.lock* ./
RUN uv export --frozen --no-dev -o requirements.txt

# Stage 3: Runtime
FROM python:3.13-slim
WORKDIR /app

# Install dependencies from requirements.txt
COPY --from=python-builder /app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY backend/src ./src

# Copy compiled web app from builder
COPY --from=web-builder /web-app/public ../web-app/public

ENV PYTHONUNBUFFERED=1
EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
