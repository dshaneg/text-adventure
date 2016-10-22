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
const ListInventoryParser = require('./parsers/list-inventory-parser');
const ExitParser = require('./parsers/exit-parser');
const HelpParser = require('./parsers/help-parser');
// dev-mode (cheat) command parsers
const TeleportParser = require('./parsers/teleport-parser');
const ConjureItemParser = require('./parsers/conjure-item-parser');

const commandParsers = [MoveParser, ListInventoryParser, ExitParser, HelpParser];

if (opt.options.dev) {
  commandParsers.push(TeleportParser);
  commandParsers.push(ConjureItemParser);
}

// repositories
const itemRepository = new ItemRepository();
const mapNodeRepository = new MapNodeRepository();
const gameDefinitionRepository = new GameDefinitionRepository();

const repositorySet = {
  itemRepository,
  gameDefinitionRepository,
  mapNodeRepository
};

// command handlers
const MoveHandler = require('./command-handlers/move-handler');
const ListInventoryHandler = require('./command-handlers/list-inventory-handler');
const HelpHandler = require('./command-handlers/help-handler');
const TeleportHandler = require('./command-handlers/teleport-handler');
const ConjureItemHandler = require('./command-handlers/conjure-item-handler');
const AddInventoryHandler = require('./command-handlers/add-inventory-handler');
const EquipItemHandler = require('./command-handlers/equip-item-handler');
const StartGameHandler = require('./command-handlers/start-game-handler');
const StopGameHandler = require('./command-handlers/stop-game-handler');

new MoveHandler().subscribe();
new TeleportHandler(mapNodeRepository).subscribe();
new AddInventoryHandler().subscribe();
new EquipItemHandler().subscribe();
new StartGameHandler(repositorySet).subscribe();

const commandHandlers = [
  ListInventoryHandler, StopGameHandler, HelpHandler,
  ConjureItemHandler
];

let gameFactory = new GameFactory(repositorySet, commandHandlers);

if (opt.options.debug) {
  gameFactory = new DebuggingGameFactory(gameFactory);
}

const textEngine = new TextEngine(gameFactory, commandParsers);

textEngine.start();
