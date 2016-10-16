'use strict';

const TextEngine = require('./text-engine');

const gameDefinition = require('../game/game');
const mapDefinition = require('../game/map');

const GameFactory = require('./game-factory');

// command parsers
const moveParser = require('./parsers/move-parser');

const commandParsers = [moveParser];

// command handlers
const moveHandler = require('./command-handlers/move-handler');

const commandHandlers = [moveHandler];

const gameFactory = new GameFactory(gameDefinition, mapDefinition, commandHandlers);
const textEngine = new TextEngine(gameFactory, commandParsers);

textEngine.start();
