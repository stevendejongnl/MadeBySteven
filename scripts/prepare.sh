#!/bin/sh

write_version() {
  if [ -f package.json ]; then
    PACKAGE_VERSION=$(node -p "require('./package.json').version")
    echo "
const log = () => {
  const url = './images/phteven.jpg';
  const image = new Image();
  image.src = url;
  image.onload = function() {
    const image_style = [
      'font-size: 1px;',
      \`padding: \$\{image.height/100*50\}px \$\{image.width/100*50\}px;\`,
      \`background: url(\${url}) no-repeat;\`,
      'background-size: contain;'
    ].join(' ');
    console.log('%c ', image_style)
  }

  console.log('%c MadeBySteven: $PACKAGE_VERSION', 'background-color: #2E3440; color: #FFEEAD')
}

export const version = () => {
  log()
  return '$PACKAGE_VERSION'
}" > src/version.ts
  fi
}

write_version
