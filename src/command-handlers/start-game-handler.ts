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
    commandChannel.subscribe(StartGameCommand.topic, (data: { sessionToken: string }) => this.handle(data));
  }

  handle(data: { sessionToken: string }) {
    try {
      const game = this.gameSessionRepository.get(data.sessionToken);

      game.start();

      // initialize starting inventory
      commandChannel.publish(new AddInventoryCommand(data.sessionToken, this.itemRepository.startSet));

      for (const startItem of this.itemRepository.startSet) {
        if (startItem.equip) {
          commandChannel.publish(new EquipItemCommand(data.sessionToken, startItem.item));
        }
      }

      // game.started is a trigger for other subscribers (notably text-engine) to add their subscriptions after initialization
      eventChannel.publish({
        topic: 'game.started',
        sessionToken: data.sessionToken,
        data: {
          banner: this.gameDefinitionRepository.gameDefinition.banner,
          text: this.gameDefinitionRepository.gameDefinition.opening
        }
      });

      commandChannel.publish(new TeleportCommand(data.sessionToken, this.mapNodeRepository.entryNode.id));
    } catch (error) {
      eventChannel.publish({
        topic: 'error',
        sessionToken: data.sessionToken,
        data: error
      });
    }
  }
}

