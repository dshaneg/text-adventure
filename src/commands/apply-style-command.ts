'use strict';

import {Command} from './command';

const topic = 'style.apply';

/**
 * Class representing a command instructing the client to apply a new color palette.
 */
export class ApplyStyleCommand implements Command {

  constructor(sessionToken: string, styleName: string) {
    this.topic = topic;
    this.data = {
      sessionToken,
      styleName
    };
  }

  public topic: string;
  public data: { sessionToken: string, styleName: string };

  static get topic() {
    return topic;
  }
}
