'use strict';

import {Command} from './command';

const topic = 'game.stop';

export type StopGameData = { sessionToken: string, force: boolean };

/** Class representing a command instructing the game to stop.
 */
export class StopGameCommand implements Command {

  /**
   * Create an instance of StopGameCommand.
   */
  constructor(sessionToken: string, force?: boolean) {
    this.topic = topic;
    this.data = { sessionToken, force };
  }

  public topic: string;
  public data: { sessionToken: string, force: boolean }

  static get topic() {
    return topic;
  }
}

