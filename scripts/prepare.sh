#! /bin/sh

function write_version() {
  if [ -f package.json ]; then
    PACKAGE_VERSION=$(node -p "require('./package.json').version")
    echo "
const log = () => {
  const url = '/dist/images/phteven.jpg';
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

  console.log('%c MadeBySteven: 1.1.0', 'color: #ff0000')
}

export const version = () => {
  log()
  return '1.1.0'
}" > src/version.ts
  fi
}

write_version
