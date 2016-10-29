'use strict';

import {Command} from './command';

const topic = 'game.stop';

/** Class representing a command instructing the game to stop.
 */
export class StopGameCommand implements Command {

  /**
   * Create an instance of StopGameCommand.
   */
  constructor(sessionToken: string, force?: boolean) {
    this.sessionToken = sessionToken;
    this.force = force;
  }

  public sessionToken: string;
  public force: boolean;

  static get topic() {
    return topic;
  }
}

