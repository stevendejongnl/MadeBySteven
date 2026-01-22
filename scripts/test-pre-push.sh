#!/bin/bash
set -e

echo "=========================================="
echo "Running backend tests..."
echo "=========================================="
cd backend
uv run pytest -x --tb=short
cd ..
echo "✓ Backend tests passed"
echo ""

echo "=========================================="
echo "Running frontend tests..."
echo "=========================================="
npm run compile  # Ensure fresh build
npm run test:fast  # Chromium only, no retries
echo "✓ Frontend tests passed"
echo ""

echo "=========================================="
echo "✓ All pre-push checks passed!"
echo "=========================================="
