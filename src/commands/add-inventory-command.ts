'use strict';

import {Command} from './command';

const topic = 'player.inventory.add';

/** Class representing a command instructing the game to add a list of item deltas to inventory.
 * Item deltas consist of an item and a count.
 */
export class AddInventoryCommand implements Command {

  /**
   * Creates an instance of AddInventoryCommand.
   *
   * @param {string} sessionToken
   * @param {Array<{item: any, count: number}>} deltas
   *
   * @memberOf AddInventoryCommand
   */
  constructor(sessionToken: string, deltas: Array<{item: any, count: number}>) {
    this.topic = topic;
    this.deltas = deltas;
    this.sessionToken = sessionToken;
  }

  public topic: string;
  public sessionToken: string;
  public deltas: Array<{item: any, count: number}>;

  public get data(): { sessionToken: string, deltas: Array<{item: any, count: number}>} {
    return { sessionToken: this.sessionToken, deltas: this.deltas };
  }

  /**
   * Adds an item delta (item and acount) to the command.
   *
   * @param {any} item - the item to add to inventory
   * @param {any} count - the quantity of item you wish to add
   *
   * @memberOf AddInventoryCommand
   */
  addDelta(item: any, count: number) {
    this.deltas.push({ item, count });
  }

  static get topic() {
    return topic;
  }
}
