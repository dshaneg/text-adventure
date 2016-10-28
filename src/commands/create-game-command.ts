'use strict';

import { Command } from './command';

const topic = 'game.create';

/**
 * Class representing a command instructing the game wrangler to create a new game.
 */
export class CreateGameCommand implements Command {
  constructor() {
    this.topic = topic;
    this.data = { };
  }

  public topic: string;
  public data: {};

  static get topic() {
    return topic;
  }
}
