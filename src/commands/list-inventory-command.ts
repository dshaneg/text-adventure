'use strict';

import {Command} from './command';

const topic = 'player.inventory.list';

/**
 * Class representing a command instructing the game to provide the contents of the player's inventory.
 */
export class ListInventoryCommand implements Command {

  constructor(sessionToken: string) {
    this.sessionToken = sessionToken;
  }

  public sessionToken: string;

  static get topic() {
    return topic;
  }
}
