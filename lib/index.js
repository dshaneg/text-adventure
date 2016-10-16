'use strict';

const getopt = require('node-getopt');

const TextEngine = require('./text-engine');

const gameDefinition = require('../game/game');
const mapDefinition = require('../game/map');

const DebuggingGameFactory = require('./debugging-game-factory');
const GameFactory = require('./game-factory');

const opt = getopt.create([
  ['d', 'debug', 'turn on debug output'],
  ['', 'dev', 'turn on dev mode (enables cheats)'],
  ['h', 'help', 'display this help']
]).bindHelp()
  .parseSystem();

// command parsers
const moveParser = require('./parsers/move-parser');
const exitParser = require('./parsers/exit-parser');
const helpParser = require('./parsers/help-parser');
const teleportParser = require('./parsers/teleport-parser');

const commandParsers = [moveParser, exitParser, helpParser];

if (opt.options.dev) {
  commandParsers.push(teleportParser);
}

// command handlers
const moveHandler = require('./command-handlers/move-handler');
const stopHandler = require('./command-handlers/stop-handler');
const helpHandler = require('./command-handlers/help-handler');
const teleportHandler = require('./command-handlers/teleport-handler');

const commandHandlers = [moveHandler, stopHandler, helpHandler, teleportHandler];

let gameFactory = new GameFactory(gameDefinition, mapDefinition, commandHandlers);

if (opt.options.debug) {
  gameFactory = new DebuggingGameFactory(gameFactory);
}

const textEngine = new TextEngine(gameFactory, commandParsers);

textEngine.start();
