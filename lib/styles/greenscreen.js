'use strict';

const chalk = require('chalk');
const ansiStyles = require('ansi-styles');

module.exports = {
  name: 'greenscreen',
  defaultOpen: ansiStyles.bold.open + ansiStyles.green.open,
  prompt: chalk.bold.green,
  normal: chalk.green,
  banner: chalk.bold.green,
  hint: chalk.bold.green,
  gamemaster: chalk.green,
  debug: chalk.gray,
  error: chalk.dim.white,
  traversed: chalk.gray,
  visited: chalk.dim.green,
  unvisited: chalk.bold.green
};
