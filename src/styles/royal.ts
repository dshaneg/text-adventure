'use strict';

import chalk = require('chalk');
import ansiStyles = require('ansi-styles');

import { StyleDefinition } from './style-definition';

export const royal = {
  name: 'royal',
  defaultOpen: ansiStyles.bold.open + ansiStyles.yellow.open,
  prompt: chalk.bold.magenta,
  normal: chalk.dim.magenta,
  banner: chalk.bold.magenta,
  hint: chalk.bold.yellow,
  gamemaster: chalk.dim.yellow,
  debug: chalk.gray,
  error: chalk.red,
  traversed: chalk.dim.magenta,
  visited: chalk.dim.yellow,
  unvisited: chalk.bold.yellow
} as StyleDefinition;
