'use strict';

const getopt = require('node-getopt');

const TextEngine = require('./text-engine');

const gameDefinition = require('../game/game');
const mapDefinition = require('../game/map');

const DebuggingGameFactory = require('./debugging-game-factory');
const GameFactory = require('./game-factory');

// command parsers
const moveParser = require('./parsers/move-parser');
const exitParser = require('./parsers/exit-parser');

const commandParsers = [moveParser, exitParser];

// command handlers
const moveHandler = require('./command-handlers/move-handler');
const stopHandler = require('./command-handlers/stop-handler');

const commandHandlers = [moveHandler, stopHandler];

const opt = getopt.create([
  ['d', 'debug', 'turn on debug output'],
  ['h', 'help', 'display this help']
]).bindHelp()
  .parseSystem();

let gameFactory = new GameFactory(gameDefinition, mapDefinition, commandHandlers);

if (opt.options.debug) {
  gameFactory = new DebuggingGameFactory(gameFactory);
}

const textEngine = new TextEngine(gameFactory, commandParsers);

textEngine.start();
