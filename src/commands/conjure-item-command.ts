'use strict';

import {Command} from './command';

const topic = 'item.conjure';

/**
 * Class representing a command instructing the game conjure an item from the nether.
 */
export class ConjureItemCommand implements Command {

  constructor(sessionToken: string, itemId: number, count: number) {
    this.topic = topic;
    this.data = {
      sessionToken,
      itemId,
      count
    };
  }

  public topic: string;
  public data: {sessionToken: string, itemId: number, count: number};

  static get topic() {
    return topic;
  }
}
