#!/bin/bash

BRANCH=$1

function clone_master {
  git clone --branch master --single-branch --depth 1 https://github.com/stevendejongnl/MadeBySteven.git master-branch
}

function build_master {
  cd master-branch
  npm ci
  npm run build:css && npm run rollup
  npm run move-files
  cd ../
}

function prepare_next {
  mkdir next-branch
  cp index.html next-branch
  cp -r pages/* next-branch
  cp -r dist next-branch/dist

  sed -i 's/\.\/dist\///g' next-branch/index.html
  sed -i 's/..\/dist\///g' next-branch/*.html
}

function cleanup_root {
  rm -rf index.html pages dist
}

function move_to_real_directories {
  cp -r master-branch/* .
  cp -r next-branch/* .
}

function deploy_next {
  BRANCH=$1
  if [ "$BRANCH" == "refs/heads/next" ]; then
    echo "Deploying to next"

    clone_master
    build_master
    prepare_next
    cleanup_root
    move_to_real_directories
  fi
}

deploy_next $BRANCH
