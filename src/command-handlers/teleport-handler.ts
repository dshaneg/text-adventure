'use strict';

import { CommandHandler } from './command-handler';
import { commandChannel, eventChannel } from '../message-bus';
import { TeleportCommand, TeleportData } from '../commands/teleport-command';
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
    bus.commandChannel.subscribe(TeleportCommand.topic, (data: TeleportData) => this.handle(data));
  }

  handle(data: TeleportData) {
    try {
      const targetNode = this.mapNodeRepository.get(data.targetNodeId);

      if (!targetNode) {
        bus.eventChannel.publish({
          topic: 'error',
          data: `Could not teleport. No node with id ${data.targetNodeId}.`
        });

        return;
      }

      const game = this.gameSessionRepository.get(data.sessionToken);

      game.player.currentNode = targetNode;

      bus.eventChannel.publish({
        topic: 'player.location.teleported',
        data: { previousNode: game.player.currentNode, currentNode: targetNode }
      });
    } catch (error) {
      bus.eventChannel.publish({ topic: 'error', data: error });
    }
  }
}

