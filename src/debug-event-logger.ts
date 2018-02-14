'use strict';

import { EventHandler } from './event-handler';

import { style } from './style';

export class DebugEventLogger implements EventHandler {
  constructor(private eventHandler: EventHandler) {
  }

  handle(gameState: any, event: any): void {
    log(event.topic, JSON.stringify(event));

    this.eventHandler.handle(gameState, event);
  }
}

function log(topic: string, text: string) {
  console.log(style.debug(`${topic} => ${text}`));
}
