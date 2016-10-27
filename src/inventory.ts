'use strict';

export class Inventory {
  constructor() {
    this.map = new Map();
    this.equippedSet = new Set(); // using a set means can't equip two of the same item unless we put stacks in this set
  }

  private map: Map<number, any>;
  private equippedSet: Set<any>;

  add(item: any, count: number) {
    let itemStack = this.map.get(item.id);

    if (!itemStack) {
      itemStack = { item, count: 0 };
      this.map.set(item.id, itemStack);
    }

    itemStack.count += count;
  }

  remove(itemId: number) {
    const itemStack = this.map.get(itemId);

    if (itemStack && itemStack.count > 0) {
      itemStack.count -= 1;
    }
  }

  getStack(itemId: number) {
    return this.map.get(itemId);
  }

  getEquipped() {
    return Array.from(this.equippedSet.values());
  }

  getAll() {
    const items = Array.from(this.map.values());
    return items;
  }

  // i'm not sure i trust these methods. need some tests.

  equip(item: any) {
    this.equippedSet.add(item);
  }
}

