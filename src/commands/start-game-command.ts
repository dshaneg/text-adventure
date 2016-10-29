'use strict';

import {Command} from './command';

const topic = 'game.start';

/**
 * Class representing a command instructing the game to initialize and start.
 */
export class StartGameCommand implements Command {
  constructor(sessionToken: string) {
    this.sessionToken = sessionToken;
  }

  public sessionToken: string;

  static get topic() {
    return topic;
  }
}

