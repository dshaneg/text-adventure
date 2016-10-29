'use strict';

import { CommandHandler } from './command-handler';
import { commandChannel, eventChannel } from '../message-bus';

import { StartGameCommand } from '../commands/start-game-command';
import { AddInventoryCommand } from '../commands/add-inventory-command';
import { EquipItemCommand } from '../commands/equip-item-command';
import { TeleportCommand } from '../commands/teleport-command';

import { ItemRepository, StartItemDef } from '../item-repository';
import { GameDefinitionRepository } from '../game-definition-repository';
import { MapNodeRepository } from '../map-node-repository';
import { GameSessionRepository } from '../game-session-repository';

type RepositorySet = {
  itemRepository: ItemRepository,
  gameDefinitionRepository: GameDefinitionRepository,
  mapNodeRepository: MapNodeRepository,
  gameSessionRepository: GameSessionRepository
};

export class StartGameHandler extends CommandHandler {
  constructor(repositorySet: RepositorySet) {
    super();
    this.itemRepository = repositorySet.itemRepository;
    this.gameDefinitionRepository = repositorySet.gameDefinitionRepository;
    this.mapNodeRepository = repositorySet.mapNodeRepository;
    this.gameSessionRepository = repositorySet.gameSessionRepository;
  }

  private gameSessionRepository: GameSessionRepository;
  private itemRepository: ItemRepository;
  private gameDefinitionRepository: GameDefinitionRepository;
  private mapNodeRepository: MapNodeRepository;

  subscribeToTopic() {
    commandChannel.subscribe(StartGameCommand.topic, (command: StartGameCommand) => this.handle(command));
  }

  handle(command: StartGameCommand) {
    try {
      const game = this.gameSessionRepository.get(command.sessionToken);

      game.start();

      // initialize starting inventory
      commandChannel.publish(AddInventoryCommand.topic, new AddInventoryCommand(command.sessionToken, this.itemRepository.startSet));

      for (const startItem of this.itemRepository.startSet) {
        if (startItem.equip) {
          commandChannel.publish(EquipItemCommand.topic, new EquipItemCommand(command.sessionToken, startItem.item));
        }
      }

      // game.started is a trigger for other subscribers (notably text-engine) to add their subscriptions after initialization
      eventChannel.publish('game.started', {
        sessionToken: command.sessionToken,
        banner: this.gameDefinitionRepository.gameDefinition.banner,
        text: this.gameDefinitionRepository.gameDefinition.opening
      });

      commandChannel.publish(TeleportCommand.topic, new TeleportCommand(command.sessionToken, this.mapNodeRepository.entryNode.id));
    } catch (error) {
      eventChannel.publish('error', {
        sessionToken: command.sessionToken,
        error
      });
    }
  }
}

