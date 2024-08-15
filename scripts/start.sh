#!/bin/sh

npm run build
npx concurrently \
  "npx rollup --config ./rollup.config.js --watch"\
  "npx sass src/main.scss dist/main.css --watch"\
  "npx http-server -c-1 --gzip ."
