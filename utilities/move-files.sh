#! /bin/bash

NEXT_DIR=''

if [ "$1" == "next" ]; then
  echo "Moving files to dist/next"

  mkdir -p dist/next
  NEXT_DIR='next/'

  exit 0
fi

cp CNAME dist/
cp index.html dist/$NEXT_DIR
cp -r pages/* dist/$NEXT_DIR
sed -i 's/\.\/dist\///g' "dist/${NEXT_DIR}index.html"
sed -i 's/..\/dist\///g' "dist/${NEXT_DIR}*.html"
