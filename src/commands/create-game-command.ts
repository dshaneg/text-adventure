'use strict';

import {Command} from './command';

const topic = 'game.create';

/**
 * Class representing a command instructing the game wrangler to create a new game.
 */
export class CreateGameCommand implements Command {
  constructor(sessionToken: string) {
    this.topic = topic;
    this.data = { sessionToken };
  }

  public topic: string;
  public data: { sessionToken: string };

  static get topic() {
    return topic;
  }
}
