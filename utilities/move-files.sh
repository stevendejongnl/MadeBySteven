#! /bin/bash

if [ "$1" == "refs/heads/next" ]; then
  echo "Moving files to dist/next"

  git clone https://github.com/stevendejongnl/MadeBySteven.git dist
  git switch gh-pages

  mkdir -p dist/next
  mkdir -p dist/next/components
  mkdir -p dist/next/elements
  mkdir -p dist/next/helpers

  cp index.html dist/next
  cp -r pages/* dist/next
  cp -r dist/* dist/next

  rm -rf dist/next/CNAME

  sed -i 's/\.\/dist\///g' dist/next/index.html
  sed -i 's/..\/dist\///g' dist/next/*.html
  exit 0
fi

cp CNAME dist/
cp index.html dist/$
cp -r pages/* dist/
sed -i 's/\.\/dist\///g' dist/index.html
sed -i 's/..\/dist\///g' dist/*.html
