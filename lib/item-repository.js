'use strict';

const itemDefinitions = require('../game/items');

class ItemRepository {
  constructor() {
    this.itemMap = createMap(itemDefinitions.items);
    this.startSet = buildStartSet(itemDefinitions.startSet, this.itemMap);
  }

  get(itemId) {
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
