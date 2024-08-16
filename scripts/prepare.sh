#!/bin/sh

convert_image_to_base64() {
  if [ -f $1 ]; then
    echo "data:image/jpeg;base64,$(base64 $1 | tr -d '\n')"
  fi
}

write_version() {
  IMAGE=$(convert_image_to_base64 ./src/images/phteven.jpg)
  if [ -f package.json ]; then
    PACKAGE_VERSION=$(node -p "require('./package.json').version")
    echo "
const log = () => {
  const image_style = [
    'font-size: 1px;',
    'padding: 64px;',
    'background-size: 64px 64px;',
    'line-height: 16px;',
    'background: url("$IMAGE") no-repeat;',
    'background-size: contain;'
  ].join(' ');
  console.log('%c ', image_style)

  console.log('%c MadeBySteven: $PACKAGE_VERSION', 'background-color: #2E3440; color: #FFEEAD')
}

export const version = () => {
  log()
  return '$PACKAGE_VERSION'
}" > src/version.ts
  fi
}

write_version
