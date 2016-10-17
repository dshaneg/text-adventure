'use strict';

class Inventory {
  constructor() {
    this._map = new Map();
    this._equippedSet = new Set(); // using a set means can't equip two of the same item unless we put stacks in this set
  }

  add(item, count) {
    let itemStack = this._map.get(item.id);

    if (!itemStack) {
      itemStack = { item, count: 0 };
      this._map.set(item.id, itemStack);
    }

    itemStack.count += count;
  }

  remove(itemId) {
    const itemStack = this._map.get(itemId);

    if (itemStack && itemStack.count > 0) {
      itemStack.count -= 1;
    }
  }

  getStack(itemId) {
    return this._map.get(itemId);
  }

  // i'm not sure i trust these methods. need some tests.

  equip(item) {
    this._equippedSet.add(item);
  }

  unequip(item) {
    this._equippedSet.remove(item);
  }
}

module.exports = Inventory;
