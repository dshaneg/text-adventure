'use strict';

import { Event } from './event';

const topic = 'player.inventory.item-equipped';

export class ItemEquippedEvent implements Event {

  constructor(sessionToken: string, item: any) {
    this.sessionToken = sessionToken;
    this.item = item;
  }

  public sessionToken: string;
  public item: any;

  static get topic() {
    return topic;
  }
}
