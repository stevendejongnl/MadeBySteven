#!/bin/bash
set -e

echo "Starting backend server in background..."
cd backend
uv run uvicorn src.main:app --host 0.0.0.0 --port 8000 > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to be ready
echo "Waiting for backend to be ready..."
for i in {1..30}; do
  if curl -s http://localhost:8000/api/health > /dev/null 2>&1; then
    echo "✓ Backend is ready"
    break
  fi
  if [ $i -eq 30 ]; then
    echo "✗ Backend failed to start"
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
  fi
  sleep 1
done

# Run all tests
echo "Running backend tests..."
cd backend
uv run pytest -x --tb=short
cd ..

echo "Running frontend E2E tests..."
npm run test:e2e

# Cleanup
echo "Cleaning up..."
kill $BACKEND_PID 2>/dev/null || true
wait $BACKEND_PID 2>/dev/null || true

echo "✓ All tests passed"
