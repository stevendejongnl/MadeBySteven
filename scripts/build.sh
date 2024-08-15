#!/bin/sh

display_usage() {
  echo "Usage: bin/builder.sh [--watch=[typescript, rollup, styling]] [--only-types] [--cleanup] [--no-rollup] [--no-styling]"
  echo "       npm run builder -- [--watch=[typescript, rollup, styling]] [--only-types] [--cleanup] [--no-rollup] [--no-styling]"
}

ARGUMENTS="$@"

if echo "$ARGUMENTS" | grep -q -- "--help"; then
  display_usage
  exit
fi

MONITORING="sh ./src/monitoring/prepare.sh"
ANALYZE="npm run analyze"
TYPESCRIPT_COMPILE="tspc -b"
STYLING="sass --no-source-map src/main.scss dist/main.css"
STYLING_MINIFIED="sass --embed-sources ./src/main.scss ./dist/bundle.min.css --style=compressed"
ROLLUP="rollup --config ./rollup.config.js"

if echo "$ARGUMENTS" | grep -q -- "--cleanup"; then
  npm run clean
fi

# $MONITORING 

if echo "$ARGUMENTS" | grep -q -- "--watch=typescript"; then
  $TYPESCRIPT_COMPILE --watch
  TYPESCRIPT_COMPILE_EXIT_CODE=$?
  exit $(($TYPESCRIPT_COMPILE_EXIT_CODE + $TYPESCRIPT_DTS_FILES_EXIT_CODE))
fi

if echo "$ARGUMENTS" | grep -q -- "--watch=rollup"; then
  $ROLLUP --watch
  ROLLUP_EXIT_CODE=$?
  exit $ROLLUP_EXIT_CODE
fi

if echo "$ARGUMENTS" | grep -q -- "--watch=styling"; then
  $STYLING_MINIFIED
  STYLING_MINIFIED_EXIT_CODE=$?
  $STYLING --watch
  STYLING_EXIT_CODE=$?
  exit $(($STYLING_MINIFIED_EXIT_CODE + $STYLING_EXIT_CODE))
fi

if echo "$ARGUMENTS" | grep -q -- "--no-rollup"; then
  echo "Skipping rollup"
  ROLLUP=""
fi

if echo "$ARGUMENTS" | grep -q -- "--no-styling"; then
  echo "Skipping styling"
  STYLING=""
fi

echo "Run $TYPESCRIPT_COMPILE"
$TYPESCRIPT_COMPILE
TYPESCRIPT_COMPILE_EXIT_CODE=$?

echo "Run $TYPESCRIPT_DTS_FILES"
$TYPESCRIPT_DTS_FILES
TYPESCRIPT_DTS_FILES_EXIT_CODE=$?

echo "Run $ROLLUP"
$ROLLUP
ROLLUP_EXIT_CODE=$?

echo "Run $STYLING_MINIFIED"
$STYLING_MINIFIED
STYLING_MINIFIED_EXIT_CODE=$?

echo "Run $STYLING"
$STYLING
STYLING_EXIT_CODE=$?

# echo "Run $ANALYZE"
# $ANALYZE
ANALYZE_EXIT_CODE=$?

exit $(($TYPESCRIPT_COMPILE_EXIT_CODE + $TYPESCRIPT_DTS_FILES_EXIT_CODE + $ROLLUP_EXIT_CODE + $STYLING_MINIFIED_EXIT_CODE + $STYLING_EXIT_CODE + $ANALYZE_EXIT_CODE))
