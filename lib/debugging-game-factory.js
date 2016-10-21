'use strict';

const postal = require('postal');

const style = require('./style');

class DebuggingGameFactory {
  constructor(gameFactory) {
    this._gameFactory = gameFactory;

    this.eventChannel = postal.channel('events');
  }

  createGame() {
    const game = this._gameFactory.createGame();

    this.eventChannel.subscribe('#', (data, envelope) => {
      switch (envelope.topic) {
        case 'player.location.moved':
          log(`${envelope.topic} => ${data.direction} from ${formatNode(data.previousNode)} to ${formatNode(data.currentNode)}`);
          break;
        case 'player.location.teleported':
          log(`${envelope.topic} => from ${formatNode(data.previousNode)} to ${formatNode(data.currentNode)}`);
          break;
        case 'player.location.blocked':
          log(`${envelope.topic} => trying to move ${data.direction} from ${formatNode(data.currentNode)}`);
          break;
        case 'error':
          log(`${envelope.topic} => ${data}`);
          break;
        default:
          log(`${envelope.topic} => NOT SET UP FOR DEBUGGING`);
      }
    });

    const gameStarted = 'game-started';
    game.on(gameStarted, () =>
      log(`${gameStarted}`)
    );

    const stopRequested = 'stop-game-requested';
    game.on(stopRequested, () =>
      log(`${stopRequested}`)
    );

    const gameStopped = 'game-stopped';
    game.on(gameStopped, () =>
      log(`${gameStopped}`)
    );

    const helpRequested = 'help-requested';
    game.on(helpRequested, () =>
      log(`${helpRequested}`)
    );

    const inventoryAdded = 'inventory-added';
    game.on(inventoryAdded, (event) => {
      for (const listItem of event) {
        log(`${inventoryAdded} => ${listItem.item.name}(${listItem.item.id})${getCountText(listItem.count)}`);
      }
    });

    const itemConjured = 'item-conjured';
    game.on(itemConjured, event =>
      log(`${itemConjured} => ${event.item.name}(${event.item.id})${getCountText(event.count)} to ${event.target}`)
    );

    const inventoryRemoved = 'inventory-removed';
    game.on(inventoryRemoved, event =>
      log(`${inventoryRemoved} => ${event.item.name}(${event.item.id})${getCountText(event.count)}`)
    );

    const itemEquipped = 'item-equipped';
    game.on(itemEquipped, event =>
      log(`${itemEquipped} => ${event.item.name}(${event.item.id})`)
    );

    const itemUnequipped = 'item-unequipped';
    game.on(itemUnequipped, event =>
      log(`${itemUnequipped} => ${event.item.name}(${event.item.id})`)
    );

    const inventoryRequested = 'inventory-requested';
    game.on(inventoryRequested, event =>
      log(`${inventoryRequested} => ${event.items.length} stacks in inventory; ${event.equipped.length} items equipped`)
    );

    const error = 'error';
    game.on(error, event =>
      log(`${error} => ${event}`)
    );

    return game;
  }
}

function log(text) {
  console.log(style.debug(text));
}

function getCountText(count) {
  return count === 1 ? '' : ` x ${count}`;
}

function formatNode(node) {
  return `${node.name}(${node.id})[${node.location.x},${node.location.y},${node.location.z}]`;
}

module.exports = DebuggingGameFactory;
