#!/bin/bash

set -e

source bin/shared.sh

marquee "Package Step"
yarn install --prod

package_version=$(node -p -e "require('./package.json').version")

docker build -t dshaneg/text-adventure:$package_version -t dshaneg/text-adventure:latest .