'use strict';

const topic = 'player.inventory.add';

/** Class representing a command instructing the game to add a list of item deltas to inventory.
 * Item deltas consist of an item and a count.
 */
class AddInventoryCommand {

  /**
   * Create an instance of AddInventoryCommand.
   *
   * @param {Object[]} [deltas=[]] - list of inventory additions to make
   * @param {Object} deltas[].item - an item object from {@link ItemRepository}
   * @param {number} deltas[].count - the quantity of the item you wish to add
   */
  constructor(deltas) {
    this.topic = topic;
    this.data = {
      deltas: deltas || []
    };
  }

  /**
   * Adds an item delta (item and acount) to the command.
   *
   * @param {any} item - the item to add to inventory
   * @param {any} count - the quantity of item you wish to add
   *
   * @memberOf AddInventoryCommand
   */
  addDelta(item, count) {
    this.deltas.push({ item, count });
  }

  static get topic() {
    return topic;
  }
}

module.exports = AddInventoryCommand;
