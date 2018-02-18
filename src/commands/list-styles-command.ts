'use strict';

import { Command, EventPublisher, GameState, Voice } from '@dshaneg/text-adventure-core';
import { style } from '../style';

/**
 * Class representing a command instructing the client to list the available color palettes.
 *
 * @export
 * @class ListStylesCommand
 */
export class ListStylesCommand implements Command {

  execute(gameState: GameState, publisher: EventPublisher) {
    publisher.publish({
      topic: 'client.style.list-requested',
      message: style.definitionNames.join(', '),
      voice: Voice.gamemaster,
      styles: style.definitionNames
    });
  }
}

