'use strict';

const getopt = require('node-getopt');

const TextEngine = require('./text-engine');

const GameDefinitionRepository = require('./game-definition-repository');
const MapNodeRepository = require('./map-node-repository');
const ItemRepository = require('./item-repository');

const DebuggingGameFactory = require('./debugging-game-factory');
const GameFactory = require('./game-factory');

const opt = getopt.create([
  ['d', 'debug', 'turn on debug output'],
  ['', 'dev', 'turn on dev mode (enables cheats)'],
  ['h', 'help', 'display this help']
]).bindHelp()
  .parseSystem();

// command parsers
const MoveParser = require('./parsers/move-parser');
const ExitParser = require('./parsers/exit-parser');
const HelpParser = require('./parsers/help-parser');
const TeleportParser = require('./parsers/teleport-parser');

const commandParsers = [MoveParser, ExitParser, HelpParser];

if (opt.options.dev) {
  commandParsers.push(TeleportParser);
}

// command handlers
const MoveHandler = require('./command-handlers/move-handler');
const StopHandler = require('./command-handlers/stop-handler');
const HelpHandler = require('./command-handlers/help-handler');
const TeleportHandler = require('./command-handlers/teleport-handler');

const commandHandlers = [MoveHandler, StopHandler, HelpHandler, TeleportHandler];

const itemRepository = new ItemRepository();
const mapNodeRepository = new MapNodeRepository();
const gameDefinitionRepository = new GameDefinitionRepository();

const repositorySet = {
  itemRepository,
  gameDefinitionRepository,
  mapNodeRepository
};

let gameFactory = new GameFactory(repositorySet, commandHandlers);

if (opt.options.debug) {
  gameFactory = new DebuggingGameFactory(gameFactory);
}

const textEngine = new TextEngine(gameFactory, commandParsers);

textEngine.start();
