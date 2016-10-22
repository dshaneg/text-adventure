'use strict';

const bus = require('./message-bus');

const StartGameCommand = require('./commands/start-game-command');
const StopGameCommand = require('./commands/stop-game-command');

const readline = require('readline');
const style = require('./style');
const pluralize = require('pluralize');
const numberConverter = require('number-to-words');

const CLEAR_SCREEN_CODE = '\x1Bc';

class TextEngine {
  constructor(gameFactory, commandParsers) {
    this._gameFactory = gameFactory;
    this._commandParsers = commandParsers;

    this._rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  handleInput(input) {
    for (const parser of this._commandParsers) {
      const command = parser.parse(input, this._game);

      if (command && command.topic) {
        bus.commandChannel.publish(command.topic, command.data);
        return;
      }

      if (command) {
        this._game.acceptCommand(command);
        return;
      }
    }

    this.handleGameResponse(style.gamemaster(`Huh? I didn't understand that. Type ${style.hint('help')} if you're stuck.`));
  }

  start() {
    this._gameFactory.createGame(); // need a command here too

    bus.eventChannel.subscribe('game.started', (data) => {
      this.hookHandlers();

      console.log(style.banner(data.banner));
      console.log();
      console.log(style.normal(data.text));
    }).once();

    this._rl.on('line', line => this.handleInput(line));

    console.log(CLEAR_SCREEN_CODE);

    bus.commandChannel.publish(new StartGameCommand());
  }

  hookHandlers() {
    bus.eventChannel.subscribe('#', (data, envelope) => {
      switch (envelope.topic) {
        case 'player.location.moved':
        case 'player.location.teleported':
          this._setPrompt(data.currentNode);
          this.handleGameResponse(data.currentNode.description);
          break;

        case 'player.location.move-blocked':
          this.handleGameResponse(`The way ${data.direction} is not for you to travel.`, style.gamemaster);
          break;

        case 'player.inventory.added':
          for (const listItem of data.deltas) {
            let itemName = pluralize(listItem.item.name, listItem.count);
            if (listItem.item.suffix) {
              itemName = `${itemName} ${listItem.item.suffix}`;
            }
            const numberOrArticle = getNumberArticle(listItem.item.name, listItem.item.isProperNoun, listItem.count);
            console.log(`\nYou add ${numberOrArticle}${itemName} to your pack.`);
          }
          this._rl.prompt();
          break;

        case 'player.inventory.item-equipped':
          this.handleGameResponse(`You equip the ${data.item.name}.`);
          break;

        case 'item.conjured':
          console.log(style.gamemaster('The air begins to crackle with energy and suddenly something materializes in your hands...'));
          break;

        case 'game.help-requested':
          this.handleGameResponse(highlightHints(data.text), style.gamemaster);
          break;

        case 'player.inventory.list-requested':
          if (!data.items.length) {
            this.handleGameResponse(style.gamemaster('Inventory is empty.'));
            return;
          }

          console.log(style.gamemaster('\nYou are carrying the following items:'));
          for (const stack of data.items) {
            const count = stack.count === 1 ? '' : `(${stack.count})`;
            console.log(style.gamemaster(`${stack.item.name} ${count}`));
          }

          this._rl.prompt();
          break;

        case 'game.stop-requested':
          this._rl.question(style.gamemaster('\nAre you sure you want to leave the game? [Y/n] '), (answer) => {
            if (answer.match(/^y$|^yes$|^$/i)) {
              bus.commandChannel.publish(new StopGameCommand(true));
            } else {
              this._rl.prompt();
            }
          });
          break;

        case 'game.stopped':
          console.log((style.gamemaster('\nSee you next time.')));
          this._rl.close();
          break;

        case 'error':
          this.handleGameResponse(data, style.error);
          break;

        default:
          this.handleGameResponse(`${envelope.topic} not handled`, style.error);
      }
    });
  }

  handleGameResponse(responseText, textStyle) {
    const currentStyle = textStyle || style.normal;
    console.log(currentStyle(`\n${responseText}`));

    this._rl.prompt();
  }

  _setPrompt(currentNode) {
    this._rl.setPrompt(style.prompt(`\n${currentNode.name} [${buildActionList(currentNode)}] > `));
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

function getNumberArticle(name, isProperName, count) {
  if (count !== 1) {
    return `${numberConverter.toWords(count)} `;
  }

  if (isProperName) {
    return '';
  }

  return /^[aeiou]/i.test(name) ? 'an ' : 'a ';
}

function highlightHints(text) {
  return text.replace(/<<[a-z]+>>/g, match =>
    style.hint(match.substring(2, match.length - 2))
  );
}

module.exports = TextEngine;
