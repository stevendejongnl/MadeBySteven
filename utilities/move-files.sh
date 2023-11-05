#! /bin/bash

cp CNAME dist/
cp index.html dist/
cp -r pages/* dist/
sed -i 's/\.\/dist\///g' dist/index.html
sed -i 's/..\/dist\///g' dist/*.html
