'use strict';

const style = require('./style');

class DebuggingGameFactory {
  constructor(gameFactory) {
    this._gameFactory = gameFactory;
  }

  createGame() {
    const game = this._gameFactory.createGame();

    const playerMoved = 'player-moved';
    game.on(playerMoved, event =>
      console.log(style.debug(`event: ${playerMoved} => ${event.direction} from ${formatNode(event.previousNode)} to ${formatNode(event.currentNode)}`))
    );

    const playerTeleported = 'player-teleported';
    game.on(playerTeleported, event =>
      console.log(style.debug(`event: ${playerTeleported} => from ${formatNode(event.previousNode)} to ${formatNode(event.currentNode)}`))
    );

    const playerMoveBlocked = 'player-move-blocked';
    game.on(playerMoveBlocked, event =>
      console.log(style.debug(`event: ${playerMoveBlocked} => trying to move ${event.direction} from ${formatNode(event.currentNode)}`))
    );

    const gameStarted = 'game-started';
    game.on(gameStarted, () =>
      console.log(style.debug(`event: ${gameStarted}`))
    );

    const stopRequested = 'stop-requested';
    game.on(stopRequested, () =>
      console.log(style.debug(`event: ${stopRequested}`))
    );

    const gameStopped = 'game-stopped';
    game.on(gameStopped, () =>
      console.log(style.debug(`event: ${gameStopped}`))
    );

    const helpRequested = 'help-requested';
    game.on(helpRequested, () =>
      console.log(style.debug(`event: ${helpRequested}`))
    );

    const inventoryAdded = 'inventory-added';
    game.on(inventoryAdded, event =>
      console.log(style.debug(`event: ${inventoryAdded} => ${event.item.name}(${event.item.id})${getCountText(event.count)}`))
    );

    const itemConjured = 'item-conjured';
    game.on(itemConjured, event =>
      console.log(style.debug(`event: ${itemConjured} => ${event.item.name}(${event.item.id})${getCountText(event.count)} to ${event.target}`))
    );

    const inventoryRemoved = 'inventory-removed';
    game.on(inventoryRemoved, event =>
      console.log(style.debug(`event: ${inventoryRemoved} => ${event.item.name}(${event.item.id})${getCountText(event.count)}`))
    );

    const itemEquipped = 'item-equipped';
    game.on(itemEquipped, event =>
      console.log(style.debug(`event: ${itemEquipped} => ${event.item.name}(${event.item.id})`))
    );

    const itemUnequipped = 'item-unequipped';
    game.on(itemUnequipped, event =>
      console.log(style.debug(`event: ${itemUnequipped} => ${event.item.name}(${event.item.id})`))
    );

    const inventoryRequested = 'inventory-requested';
    game.on(inventoryRequested, event =>
      console.log(style.debug(`event: ${inventoryRequested} => ${event.items.length} stacks in inventory; ${event.equipped.length} items equipped`))
    );

    const error = 'error';
    game.on(error, event =>
      console.log(style.debug(`event: ${error} => ${event}`))
    );

    return game;
  }
}

function getCountText(count) {
  return count === 1 ? '' : ` x ${count}`;
}

function formatNode(node) {
  return `${node.name}(${node.id})[${node.location.x},${node.location.y},${node.location.z}]`;
}

module.exports = DebuggingGameFactory;
