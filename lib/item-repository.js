'use strict';

const itemDefinitions = require('../game/items');

class ItemRepository {

  get itemMap() {
    if (!this._map) {
      this._map = createMap(itemDefinitions);
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


module.exports = ItemRepository;
