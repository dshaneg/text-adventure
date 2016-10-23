'use strict';

const chalk = require('chalk');

module.exports = {
  name: 'pastel',
  prompt: chalk.bold.cyan,
  normal: chalk.white,
  banner: chalk.bold.yellow,
  hint: chalk.yellow,
  gamemaster: chalk.magenta,
  debug: chalk.gray,
  error: chalk.red,
  traversed: chalk.dim.cyan,
  visited: chalk.bold.white,
  unvisited: chalk.bold.yellow
};
