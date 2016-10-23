'use strict';

const chalk = require('chalk');

module.exports = {
  name: 'greenscreen',
  prompt: chalk.bold.green,
  normal: chalk.green,
  banner: chalk.bold.green,
  hint: chalk.bold.green,
  gamemaster: chalk.green,
  debug: chalk.gray,
  error: chalk.bgGreen.gray,
  traversed: chalk.gray,
  visited: chalk.dim.green,
  unvisited: chalk.bold.green
};
