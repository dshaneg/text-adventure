'use strict';

import { Event } from './event';

const topic = 'player.inventory.added';

export class InventoryAddedEvent implements Event {

  constructor(sessionToken: string, deltas: Array<{item: any, count: number}>) {
    this.sessionToken = sessionToken;
    this.deltas = deltas;
  }

  public sessionToken: string;
  public deltas: Array<{item: any, count: number}>;

  static get topic() {
    return topic;
  }
}
