'use strict';

import { CommandHandler } from './command-handler';
import { commandChannel, eventChannel } from '../message-bus';
import { TeleportCommand } from '../commands/teleport-command';
import { GameSessionRepository } from '../game-session-repository';
import { MapNodeRepository } from '../map-node-repository';

export class TeleportHandler extends CommandHandler {
  constructor(gameSessionRepository: GameSessionRepository, mapNodeRepository: MapNodeRepository) {
    super();
    this.gameSessionRepository = gameSessionRepository;
    this.mapNodeRepository = mapNodeRepository;
  }

  private gameSessionRepository: GameSessionRepository;
  private mapNodeRepository: MapNodeRepository;

  subscribeToTopic() {
    commandChannel.subscribe(TeleportCommand.topic, (command: TeleportCommand) => this.handle(command));
  }

  handle(command: TeleportCommand) {
    try {
      const targetNode = this.mapNodeRepository.get(command.targetNodeId);

      if (!targetNode) {
        eventChannel.publish('error', `Could not teleport. No node with id ${command.targetNodeId}.`);
        return;
      }

      const game = this.gameSessionRepository.get(command.sessionToken);

      game.player.currentNode = targetNode;

      eventChannel.publish('player.location.teleported',
        { previousNode: game.player.currentNode, currentNode: targetNode }
      );
    } catch (error) {
      eventChannel.publish('error', error);
    }
  }
}

