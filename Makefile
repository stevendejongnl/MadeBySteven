.PHONY: help install dev dev-full test backend-test frontend-test backend-dev frontend-dev clean

help:
	@echo "Available commands:"
	@echo "  make install         - Install all dependencies"
	@echo "  make dev             - Start backend only (port 8000)"
	@echo "  make dev-full        - Start backend + frontend with HMR (ports 8000, 3000)"
	@echo "  make backend-dev     - Start backend dev server with auto-reload"
	@echo "  make frontend-dev    - Start frontend dev server with HMR"
	@echo "  make test            - Run all tests (backend + frontend)"
	@echo "  make backend-test    - Run backend tests"
	@echo "  make backend-test-fast - Run backend tests quickly (exit on first failure)"
	@echo "  make frontend-test   - Run frontend tests"
	@echo "  make frontend-test-fast - Run frontend tests (Chromium only, no retries)"
	@echo "  make clean           - Clean up Docker containers"

install:
	npm ci
	cd backend && uv sync

dev:
	docker-compose up --build app

dev-full:
	npm run precompile && npm run compile && docker-compose --profile dev up --build

backend-dev:
	cd backend && uv run uvicorn src.main:app --reload

frontend-dev:
	npm start

test:
	cd backend && uv run pytest
	npm test

backend-test:
	cd backend && uv run pytest

backend-test-fast:
	cd backend && uv run pytest -x

frontend-test:
	npm test

frontend-test-fast:
	npm run test:fast

clean:
	docker-compose down -v
