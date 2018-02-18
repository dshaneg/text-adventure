'use strict';

import { Command, EventPublisher, GameState, Voice } from '@dshaneg/text-adventure-core';
import { style } from '../style';

/**
 * Class representing a command instructing the client to apply a new color palette.
 */
export class ApplyStyleCommand implements Command {

  constructor(private styleName: string) {
  }

  execute(gameState: GameState, publisher: EventPublisher) {
    try {
      style.set(this.styleName);
      publisher.publish({
        topic: 'client.style.applied',
        message: 'As you command.',
        voice: Voice.gamemaster,
        styleName: this.styleName
      });
    } catch (error) {
      publisher.publish({
        topic: 'error',
        message: `Could not find a style named '${this.styleName}'.`,
        voice: Voice.warden
      });
    }
  }
}
