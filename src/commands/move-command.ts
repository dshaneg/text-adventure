'use strict';

import {Command} from './command';

const topic = 'player.location.move';

/**
 * Class representing a command instructing the game to move the player in a direction.
 */
export class MoveCommand implements Command {

  /**
   * Creates an instance of MoveCommand.
   *
   * @param {string} sessionToken - string identifying the current game session
   * @param {String} direction - n|s|e|w|u|d
   *
   * @memberOf MoveCommand
   */
  constructor(sessionToken: string, direction: string) {
      this.sessionToken = sessionToken;
      this.direction = direction;
  }

  public sessionToken: string;
  public direction: string;

  static get topic() {
    return topic;
  }
}

