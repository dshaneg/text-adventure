'use strict';

const itemDefinitions = require('../game/items');

class ItemRepository {

  get startSet() {
    if (!this._startSet) {
      this._startSet = buildStartSet(itemDefinitions.startSet, this.itemMap);
    }

    return this._startSet;
  }

  get itemMap() {
    if (!this._map) {
      this._map = createMap(itemDefinitions.items);
    }

    return this._map;
  }

  getItem(itemId) {
    return this.itemMap.get(itemId);
  }
}

function createMap(definitions) {
  const map = new Map();

  // is it cheating to just take the existing object and jam the text together in place?
  // maybe, but it sure is nicer to deal with.

  for (const item of definitions) {
    item.description = item.description.join('\n');
    map.set(item.id, item);
  }

  return map;
}

function buildStartSet(startSetDefinition, itemMap) {
  const list = [];

  for (const startItemDefinition of startSetDefinition) {
    const item = itemMap.get(startItemDefinition.id);

    if (item) {
      list.push({ item, count: startItemDefinition.count, equip: startItemDefinition.equip });
    }
  }

  return list;
}

module.exports = ItemRepository;
