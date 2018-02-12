#!/bin/bash

set -e

source bin/shared.sh

marquee "Package Step"
yarn install --prod

# TODO: do versioning by peeling out the verison from package.json
docker build -t dshaneg/text-adventure:0.1.0 .