'use strict';

const chalk = require('chalk');
const ansiStyles = require('ansi-styles');

module.exports = {
  name: 'warm',
  defaultOpen: ansiStyles.bold.open + ansiStyles.yellow.open,
  prompt: chalk.bold.red,
  normal: chalk.white,
  banner: chalk.bold.red,
  hint: chalk.bold.yellow,
  gamemaster: chalk.yellow,
  debug: chalk.gray,
  error: chalk.bold.red,
  traversed: chalk.dim.gray,
  visited: chalk.dim.red,
  unvisited: chalk.bold.red
};
