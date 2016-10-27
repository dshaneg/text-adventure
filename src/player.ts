'use strict';

import { MapNode } from './map-node';
import { Inventory } from './inventory';

export class Player {
  constructor(currentNode: MapNode) {
    this.inventory = new Inventory();
    this.currentNode = currentNode;
  }

  public inventory: Inventory;

  private _currentNode: MapNode;

  get currentNode() {
    return this._currentNode;
  }

  set currentNode(node) {
    this._currentNode = node;
    node.visit();
  }
}

