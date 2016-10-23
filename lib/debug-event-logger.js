'use strict';

const bus = require('./message-bus');

const ItemFormatter = require('./item-formatter');
const style = require('./style');

class DebugEventLogger {
  static subscribe() {
    bus.eventChannel.subscribe('#', (data, envelope) => {
      switch (envelope.topic) {
        case 'game.started':
        case 'game.help-requested':
        case 'game.stop-requested':
        case 'game.stopped':
          log(`${envelope.topic}`);
          break;

        case 'player.location.moved':
          log(`${envelope.topic} => ${data.direction} from ${formatNode(data.previousNode)} to ${formatNode(data.currentNode)}`);
          break;

        case 'player.location.teleported':
          log(`${envelope.topic} => from ${formatNode(data.previousNode)} to ${formatNode(data.currentNode)}`);
          break;

        case 'player.location.move-blocked':
          log(`${envelope.topic} => trying to move ${data.direction} from ${formatNode(data.currentNode)}`);
          break;

        case 'player.inventory.added':
          for (const listItem of data.deltas) {
            log(`${envelope.topic} => ${ItemFormatter.formatDebugItem(listItem.item, listItem.count)}`);
          }
          break;

        case 'player.inventory.item-equipped':
          log(`${envelope.topic} => ${data.item.name}(${data.item.id})`);
          break;

        case 'item.conjured':
          log(`${envelope.topic} => ${ItemFormatter.formatDebugItem(data.item, data.count)} to ${data.target}`);
          break;

        case 'error':
          log(`${envelope.topic} => ${data}`);
          break;

        case 'player.inventory.list-requested':
          log(`${envelope.topic} => ${data.items.length} stacks in inventory`);
          break;

        default:
          log(`${envelope.topic} => NOT SET UP FOR DEBUGGING`);
      }
    });
  }
}

function log(text) {
  console.log(style.debug(text));
}

function formatNode(node) {
  return `${node.name}(${node.id})[${node.location.x},${node.location.y},${node.location.z}]`;
}

module.exports = DebugEventLogger;
