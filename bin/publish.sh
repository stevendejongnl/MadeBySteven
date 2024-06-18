#!/bin/sh

if [ "$1" == "refs/heads/next" ]; then
  echo "Moving files to dist/next"

  git clone --branch master --single-branch --depth 1 https://github.com/stevendejongnl/MadeBySteven.git master-branch
  cd master-branch
  npm ci
  npm run build:css && npm run rollup
  npm run move-files

  cd ../

  mkdir next-branch
  cp index.html next-branch
  cp -r pages/* next-branch
  cp -r dist/* next-branch

  cp -r master-branch/dist/* dist
  mkdir dist/next
  cp -r next-branch/* dist/next

  sed -i 's/\.\/dist\///g' next-branch/index.html
  sed -i 's/..\/dist\///g' next-branch/*.html
  exit 0
fi

cp CNAME dist/
cp index.html dist/$
cp -r pages/* dist/
sed -i 's/\.\/dist\///g' dist/index.html
sed -i 's/..\/dist\///g' dist/*.html
