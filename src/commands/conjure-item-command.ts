'use strict';

import {Command} from './command';

const topic = 'item.conjure';

/**
 * Class representing a command instructing the game conjure an item from the nether.
 */
export class ConjureItemCommand implements Command {

  constructor(sessionToken: string, itemId: number, count: number) {
      this.sessionToken = sessionToken;
      this.itemId = itemId;
      this.count = count;
  }

  public sessionToken: string;
  public itemId: number;
  public count: number;

  static get topic() {
    return topic;
  }
}
