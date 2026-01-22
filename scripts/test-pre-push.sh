#!/bin/bash
set -e

echo "Running backend tests..."
cd backend
uv run pytest -x --tb=short
cd ..

echo "✓ Backend tests passed"
echo ""
echo "For E2E tests, run: make dev-full && npm run test:e2e"
echo "E2E tests will run in CI pipeline automatically."
