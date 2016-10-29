'use strict';

import {Command} from './command';

const topic = 'game.help';

/**
 * Class representing a command instructing the provide help text.
 */
export class HelpCommand implements Command {
  /**
   * Create an instance of StartCommand.
   */
  constructor(sessionToken: string) {
    this.sessionToken = sessionToken;
  }

  public sessionToken: string;

  static get topic() {
    return topic;
  }
}
