#!/bin/bash

set -e

source bin/shared.sh

# tslint wants you to make sure the code compiles before linting
marquee "Transpile Step"
yarn tsc

marquee "Lint Step"
yarn lint

marquee "Unit Test Step"
yarn test

# marquee "Package Step"
# yarn pack
