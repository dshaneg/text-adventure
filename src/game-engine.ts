'use strict';

// repositories
const GameDefinitionRepository = require('./game-definition-repository');
const MapNodeRepository = require('./map-node-repository');
const ItemRepository = require('./item-repository');
const GameSessionRepository = require('./game-session-repository');

// game command handlers
const CreateGameHandler = require('./command-handlers/create-game-handler');
const MoveHandler = require('./command-handlers/move-handler');
const ListInventoryHandler = require('./command-handlers/list-inventory-handler');
const HelpHandler = require('./command-handlers/help-handler');
const TeleportHandler = require('./command-handlers/teleport-handler');
const ConjureItemHandler = require('./command-handlers/conjure-item-handler');
const AddInventoryHandler = require('./command-handlers/add-inventory-handler');
const EquipItemHandler = require('./command-handlers/equip-item-handler');
const StartGameHandler = require('./command-handlers/start-game-handler');
const StopGameHandler = require('./command-handlers/stop-game-handler');

// client command handlers
const ListStylesHandler = require('./command-handlers/list-styles-handler');
const ApplyStyleHandler = require('./command-handlers/apply-style-handler');

class GameEngine {
  static initialize() {
    // repositories
    const itemRepository = new ItemRepository();
    const mapNodeRepository = new MapNodeRepository();
    const gameDefinitionRepository = new GameDefinitionRepository();
    const gameSessionRepository = new GameSessionRepository();

    const repositorySet = {
      itemRepository,
      gameDefinitionRepository,
      mapNodeRepository,
      gameSessionRepository
    };

    new CreateGameHandler(gameSessionRepository).subscribe();
    new MoveHandler(gameSessionRepository).subscribe();
    new TeleportHandler(gameSessionRepository, mapNodeRepository).subscribe();
    new AddInventoryHandler(gameSessionRepository).subscribe();
    new EquipItemHandler(gameSessionRepository).subscribe();
    new ConjureItemHandler(gameSessionRepository, itemRepository).subscribe();
    new StartGameHandler(repositorySet).subscribe();
    new StopGameHandler(gameSessionRepository).subscribe();
    new ListInventoryHandler(gameSessionRepository).subscribe();

    new HelpHandler(gameDefinitionRepository).subscribe();
    new ListStylesHandler().subscribe();
    new ApplyStyleHandler().subscribe();

    // todo: this feels wrong, but the initial style comes from gameDefinition for now and is needed outside this module
    // it probably needs to be read further downstream at game creation or game start time then passed back to the client at that time
    GameEngine.style = gameDefinitionRepository.gameDefinition.style;
  }
}

module.exports = GameEngine;
