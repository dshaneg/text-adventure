'use strict';

import { Command } from './command';
import { Voice } from '@dshaneg/text-adventure-core';
import { style } from '../style';

/**
 * Class representing a command instructing the client to list the available color palettes.
 *
 * @export
 * @class ListStylesCommand
 */
export class ListStylesCommand implements Command {

  execute(events: Array<any>) {
    events.push({
      topic: 'client.style.list-requested',
      message: style.definitionNames.join(', '),
      voice: Voice.gamemaster,
      styles: style.definitionNames
    });
  }
}

