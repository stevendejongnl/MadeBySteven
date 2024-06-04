#! /bin/bash

if [ "$1" == "refs/heads/next" ]; then
  echo "Moving files to dist/next"

  mkdir -p dist/next
  mkdir -p dist/next/components
  mkdir -p dist/next/elements
  mkdir -p dist/next/helpers

  cp CNAME dist/
  cp index.html dist/next
  cp -r pages/* dist/next
  cp -r components/* dist/next/components
  cp -r elements/* dist/next/elements
  cp -r helpers/* dist/next/helpers
  cp *.css dist/next
  cp *.js dist/next
  cp *.d.ts dist/next

  sed -i 's/\.\/dist\///g' dist/next/index.html
  sed -i 's/..\/dist\///g' dist/next/*.html
  exit 0
fi

cp CNAME dist/
cp index.html dist/$
cp -r pages/* dist/
sed -i 's/\.\/dist\///g' dist/index.html
sed -i 's/..\/dist\///g' dist/*.html
