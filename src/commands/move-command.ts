'use strict';

import {Command} from './command';

const topic = 'player.location.move';

/**
 * Class representing a command instructing the game conjure an item from the nether.
 */
export class MoveCommand implements Command {

  /**
   * Creates an instance of ConjureItemCommand.
   *
   * @param {string} sessionToken - string identifying the current game session
   * @param {String} direction - n|s|e|w|u|d
   *
   * @memberOf ConjureItemCommand
   */
  constructor(sessionToken: string, direction: string) {
    this.topic = topic;
    this.data = {
      sessionToken,
      direction
    };
  }

  public topic: string;
  public data: { sessionToken: string, direction: string };

  static get topic() {
    return topic;
  }
}

