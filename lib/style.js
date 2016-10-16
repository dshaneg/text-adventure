'use strict';

const chalk = require('chalk');

module.exports = {
  prompt: chalk.bold.cyan,
  normal: chalk.white,
  banner: chalk.bold.yellow,
  hint: chalk.yellow,
  gamemaster: chalk.magenta,
  debug: chalk.gray,
  error: chalk.red,
  traversed: chalk.cyan,
  visited: chalk.bold.white,
  unvisited: chalk.bold.yellow
};
