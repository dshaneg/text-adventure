'use strict';

import chalk = require('chalk');
import ansiStyles = require('ansi-styles');

import { StyleDefinition } from './style-definition';

export const cool = {
  name: 'cool',
  defaultOpen: ansiStyles.bold.open + ansiStyles.cyan.open,
  prompt: chalk.bold.blue,
  normal: chalk.dim.green,
  banner: chalk.bold.blue,
  hint: chalk.bold.cyan,
  gamemaster: chalk.dim.cyan,
  debug: chalk.gray,
  error: chalk.red,
  traversed: chalk.dim.gray,
  visited: chalk.dim.cyan,
  unvisited: chalk.bold.cyan
} as StyleDefinition;
