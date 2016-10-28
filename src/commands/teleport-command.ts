'use strict';

import {Command} from './command';

const topic = 'player.location.teleport';

export type TeleportData = { sessionToken: string, targetNodeId: number };

/**
 * Class representing a command to send a player to a node that is not necessarily adjacent to the current node.
 */
export class TeleportCommand implements Command {

  /**
   * Create an instance of StartCommand.
   */
  constructor(sessionToken: string, targetNodeId: number) {
    this.topic = topic;
    this.data = {
      sessionToken,
      targetNodeId
    };
  }

  public topic: string;
  public data: TeleportData;

  static get topic() {
    return topic;
  }
}

