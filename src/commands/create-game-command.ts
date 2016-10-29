'use strict';

import { Command } from './command';

const topic = 'game.create';

/**
 * Class representing a command instructing the game wrangler to create a new game.
 */
export class CreateGameCommand implements Command {

  static get topic() {
    return topic;
  }
}
