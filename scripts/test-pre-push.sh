#!/bin/bash
set -e

echo "Running backend tests..."
cd backend
uv run pytest -x --tb=short
cd ..

echo "✓ Backend tests passed"
echo ""

echo "Running frontend tests..."
npm run test:fast

echo "✓ Frontend tests passed"
echo ""
echo "✓ All pre-push checks passed!"
