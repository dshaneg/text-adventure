'use strict';

import {Command, AddEventCall} from './command';
import { style } from '../style';

/**
 * Class representing a command instructing the client to list the available color palettes.
 *
 * @export
 * @class ListStylesCommand
 */
export class ListStylesCommand implements Command {

  execute(addEvent: AddEventCall) {
    addEvent({
      topic: 'client.style.list-requested',
      message: style.definitionNames.join(', '),
      styles: style.definitionNames
    });
  }
}

