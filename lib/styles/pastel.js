'use strict';

const chalk = require('chalk');
const ansiStyles = require('ansi-styles');

module.exports = {
  name: 'pastel',
  defaultOpen: ansiStyles.bold.open + ansiStyles.yellow.open,
  prompt: chalk.bold.cyan,
  normal: chalk.dim.white,
  banner: chalk.bold.yellow,
  hint: chalk.bold.yellow,
  gamemaster: chalk.dim.magenta,
  debug: chalk.dim.gray,
  error: chalk.dim.red,
  traversed: chalk.dim.cyan,
  visited: chalk.bold.white,
  unvisited: chalk.bold.yellow
};
