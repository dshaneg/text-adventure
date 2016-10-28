'use strict';

import {Command} from './command';

const topic = 'player.inventory.equip-item';

/** Class representing a command instructing the game equip an item on the player.
 */
export class EquipItemCommand implements Command {

  /**
   * Create an instance of StartCommand.
   */
  constructor(sessionToken: string, item: any) {
    this.topic = topic;
    this.data = {
      sessionToken,
      item
    };
  }

  public topic: string;
  public data: { sessionToken: string, item: any };

  static get topic() {
    return topic;
  }
}
