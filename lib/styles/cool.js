'use strict';

const chalk = require('chalk');

module.exports = {
  name: 'cool',
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
};
