'use strict';

import {Command} from './command';

const topic = 'style.list';

/**
 * Class representing a command instructing the client to list the available color palettes.
 *
 * @export
 * @class ListStylesCommand
 */
export class ListStylesCommand implements Command {
  /**
   * Creates an instance of ListStylesCommand.
   *
   * @param {string} sessionToken
   *
   * @memberOf ListStylesCommand
   */
  constructor(sessionToken: string) {
    this.sessionToken = sessionToken;
  }

  public sessionToken: string;

  static get topic() {
    return topic;
  }
}

