'use strict';

// repositories
import { GameDefinitionRepository } from './game-definition-repository';
import { MapNodeRepository } from './map-node-repository';
import { ItemRepository } from './item-repository';
import { GameSessionRepository } from './game-session-repository';

// game command handlers
import { CreateGameHandler } from './command-handlers/create-game-handler';
import { MoveHandler } from './command-handlers/move-handler';
import { ListInventoryHandler } from './command-handlers/list-inventory-handler';
import { HelpHandler } from './command-handlers/help-handler';
import { TeleportHandler } from './command-handlers/teleport-handler';
import { ConjureItemHandler } from './command-handlers/conjure-item-handler';
import { AddInventoryHandler } from './command-handlers/add-inventory-handler';
import { EquipItemHandler } from './command-handlers/equip-item-handler';
import { StartGameHandler } from './command-handlers/start-game-handler';
import { StopGameHandler } from './command-handlers/stop-game-handler';

// client command handlers
import { ListStylesHandler } from './command-handlers/list-styles-handler';
import { ApplyStyleHandler } from './command-handlers/apply-style-handler';

export class GameEngine {
  initialize() {
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
    this.style = gameDefinitionRepository.gameDefinition.style;
  }

  public style: any;
}

