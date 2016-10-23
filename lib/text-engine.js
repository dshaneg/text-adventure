'use strict';

const bus = require('./message-bus');

const StartGameCommand = require('./commands/start-game-command');
const StopGameCommand = require('./commands/stop-game-command');

const readline = require('readline');
const style = require('./style');
const ItemFormatter = require('./item-formatter');

const nodeCleanup = require('node-cleanup');

// makes sure that wonky colors don't hang around after the program terminates
nodeCleanup(() => process.stdout.write(style.defaultClose));

const CLEAR_SCREEN_CODE = '\x1Bc';

class TextEngine {
  constructor(gameFactory, commandParsers) {
    this.gameEngine = gameFactory;
    this.commandParsers = commandParsers;

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  handleInput(input) {
    for (const parser of this.commandParsers) {
      const parseResponse = parser.parse(input, this._game);

      if (parseResponse) {
        parseResponse.channel.publish(parseResponse.command);
        return;
      }
    }

    this.handleGameResponse(style.gamemaster(`Huh? I didn't understand that. Type ${style.hint('help')} if you're stuck.`));
  }

  start() {
    this.gameEngine.createGame(); // need a command here too

    bus.eventChannel.subscribe('game.started', (data) => {
      this.hookHandlers();

      console.log(style.banner(data.banner));
      console.log();
      console.log(style.normal(data.text));
    }).once();

    this.rl.on('line', line => this.handleInput(line));

    console.log(CLEAR_SCREEN_CODE);

    bus.commandChannel.publish(new StartGameCommand());
  }

  hookHandlers() {
    bus.clientEventChannel.subscribe('#', (data, envelope) => {
      switch (envelope.topic) {
        case 'style.list-requested':
          this.handleGameResponse(data.styleNames.join(', '), style.gamemaster);
          break;
        case 'error':
          this.handleGameResponse(data, style.error);
          break;

        default:
          this._setPrompt();
          this.handleGameResponse('As you command.', style.gamemaster);
      }
    });

    bus.eventChannel.subscribe('#', (data, envelope) => {
      switch (envelope.topic) {
        case 'player.location.moved':
        case 'player.location.teleported':
          {
            this._setPrompt(data.currentNode);
            this.handleGameResponse(data.currentNode.description);
            break;
          }
        case 'player.location.move-blocked':
          {
            this.handleGameResponse(`The way ${data.direction} is not for you to travel.`, style.gamemaster);
            break;
          }
        case 'player.inventory.added':
          {
            const lines = [];
            for (const listItem of data.deltas) {
              lines.push(`You add ${ItemFormatter.formatProseItem(listItem.item, listItem.count)} to your pack.`);
            }
            this.handleGameResponse(lines.join('\n'));
            break;
          }
        case 'player.inventory.list-requested':
          {
            if (!data.items.length) {
              this.handleGameResponse(style.gamemaster('Inventory is empty.'));
              return;
            }

            const lines = [];
            lines.push(style.gamemaster('You are carrying the following items:'));
            for (const stack of data.items) {
              lines.push(ItemFormatter.formatListItem(stack.item, stack.count));
            }

            this.handleGameResponse(lines.join('\n'));
            break;
          }
        case 'player.inventory.item-equipped':
          {
            this.handleGameResponse(`You equip the ${data.item.name}.`);
            break;
          }
        case 'item.conjured':
          {
            console.log(style.gamemaster('\nThe air begins to crackle with energy and suddenly something materializes in your hands...'));
            break;
          }
        case 'game.help-requested':
          {
            this.handleGameResponse(highlightHints(data.text), style.gamemaster);
            break;
          }
        case 'game.stop-requested':
          {
            this.rl.question(style.gamemaster('\nAre you sure you want to leave the game? [Y/n] '), (answer) => {
              if (answer.match(/^y$|^yes$|^$/i)) {
                bus.commandChannel.publish(new StopGameCommand(true));
              } else {
                this.rl.prompt();
              }
            });
            break;
          }
        case 'game.stopped':
          {
            console.log((style.gamemaster('\nSee you next time.')));
            this.rl.close();
            break;
          }
        case 'error':
          {
            this.handleGameResponse(data, style.error);
            break;
          }
        default:
          {
            this.handleGameResponse(`${envelope.topic} not handled`, style.error);
          }
      }
    });
  }

  handleGameResponse(responseText, textStyle) {
    const currentStyle = textStyle || style.normal;
    console.log(currentStyle(`\n${responseText}`));

    this.rl.prompt();
  }

  _setPrompt(currentNode) {
    if (currentNode) {
      this.currentNode = currentNode;
    }

    this.rl.setPrompt(style.prompt(`\n${this.currentNode.name} [${buildActionList(this.currentNode)}] > `) + style.defaultOpen);
  }
}

function buildActionList(currentNode) {
  const node = currentNode;

  const directionStrings = [];

  for (const direction of node.getAvailableDirections()) {
    let color;
    if (direction.traversed) {
      color = style.traversed;
    } else if (direction.visited) {
      color = style.visited;
    } else {
      color = style.unvisited;
    }

    directionStrings.push(color(direction.direction));
  }

  return directionStrings.join(style.prompt(','));
}

function highlightHints(text) {
  return text.replace(/<<[a-z]+>>/g, match =>
    style.hint(match.substring(2, match.length - 2))
  );
}

module.exports = TextEngine;
