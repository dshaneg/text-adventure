'use strict';

import { Command } from './command';
import { style } from '../style';

/**
 * Class representing a command instructing the client to apply a new color palette.
 */
export class ApplyStyleCommand implements Command {

  constructor(private styleName: string) {
  }

  public data: { sessionToken: string, styleName: string };
  execute(events: Array<any>) {
    try {
      style.set(this.styleName);
      events.push({
        topic: 'client.style.applied',
        message: 'As you command.',
        styleName: this.styleName
      });
    } catch (error) {
      events.push({ topic: 'error', message: `Could not find a style named '${this.styleName}'.` });
    }
  }
}
