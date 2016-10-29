'use strict';

import {Command} from './command';

const topic = 'player.location.teleport';

/**
 * Class representing a command to send a player to a node that is not necessarily adjacent to the current node.
 */
export class TeleportCommand implements Command {

  /**
   * Create an instance of StartCommand.
   */
  constructor(sessionToken: string, targetNodeId: number) {
      this.sessionToken = sessionToken;
      this.targetNodeId = targetNodeId;
  }

  public sessionToken: string;
  public targetNodeId: number;

  static get topic() {
    return topic;
  }
}

