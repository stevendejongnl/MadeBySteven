#!/bin/sh

rimraf -g ./dist/ ./tsconfig.tsbuildinfo
EXIT_CODE=$?
exit $EXIT_CODE
