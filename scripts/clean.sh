#!/bin/sh

echo "Cleaning up..."
rm -rf ./dist/ ./.rollup.cache ./tsconfig.tsbuildinfo
EXIT_CODE=$?
exit $EXIT_CODE
