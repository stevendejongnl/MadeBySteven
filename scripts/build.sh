#!/bin/sh

display_usage() {
  echo "Usage: bin/builder.sh [--watch=[typescript, rollup, styling]] [--only-types] [--cleanup] [--no-rollup] [--no-styling]"
  echo "       npm run build -- [--watch=[typescript, rollup, styling]] [--only-types] [--cleanup] [--no-rollup] [--no-styling]"
}

ARGUMENTS="$@"

if echo "$ARGUMENTS" | grep -q -- "--help"; then
  display_usage
  exit
fi

mkdir -p ./dist/images

PREPARE="./scripts/prepare.sh"
STYLING="npx sass src/main.scss dist/main.css"
IMAGES="cp -r ./src/images/* ./dist/images"
ROLLUP="npx rollup --config ./rollup.config.js"

if echo "$ARGUMENTS" | grep -q -- "--cleanup"; then
  npm run clean
fi

$PREPARE

if echo "$ARGUMENTS" | grep -q -- "--watch=rollup"; then
  $ROLLUP --watch
  ROLLUP_EXIT_CODE=$?
  exit $ROLLUP_EXIT_CODE
fi

if echo "$ARGUMENTS" | grep -q -- "--watch=styling"; then
  $STYLING --watch
  STYLING_EXIT_CODE=$?
  exit $STYLING_EXIT_CODE
fi

if echo "$ARGUMENTS" | grep -q -- "--no-rollup"; then
  echo "Skipping rollup"
  ROLLUP=""
fi

if echo "$ARGUMENTS" | grep -q -- "--no-styling"; then
  echo "Skipping styling"
  STYLING=""
fi

$IMAGES

echo "Run $ROLLUP"
$ROLLUP
ROLLUP_EXIT_CODE=$?

echo "Run $STYLING"
$STYLING
STYLING_EXIT_CODE=$?

exit $(($ROLLUP_EXIT_CODE + $STYLING_EXIT_CODE))
