'use strict';

import chalk = require('chalk');
import ansiStyles = require('ansi-styles');

import { StyleDefinition } from './style-definition';

export const greenscreen = {
  name: 'greenscreen',
  defaultOpen: ansiStyles.bold.open + ansiStyles.green.open,
  prompt: chalk.bold.green,
  normal: chalk.dim.green,
  banner: chalk.bold.green,
  hint: chalk.bold.green,
  gamemaster: chalk.dim.green,
  debug: chalk.dim.gray,
  error: chalk.dim.white,
  traversed: chalk.dim.gray,
  visited: chalk.dim.green,
  unvisited: chalk.bold.green
} as StyleDefinition;
