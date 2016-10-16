'use strict';

const readline = require('readline');
const chalk = require('chalk');

const style = {
  prompt: chalk.bold.cyan,
  normal: chalk.white,
  banner: chalk.bold.yellow,
  hint: chalk.yellow,
  question: chalk.magenta,
  error: chalk.magenta,
  traversed: chalk.gray,
  visited: chalk.white,
  unvisited: chalk.yellow
};

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

      if (command) {
        return this._game.acceptCommand(command);
      }
    }

    return this.handleGameResponse(style.error(`Huh? I didn't understand that. Type ${style.hint('help')} if you're stuck.`));
  }

  start() {
    this._game = this._gameFactory.createGame();

    this.hookGameHandlers(this._game);

    this._rl.on('line', line => this.handleInput(line));

    this._game.start();

    return {
      locName: this._game.currentNode.name,
      text: this._game.currentNode.description
    };
  }

  hookGameHandlers(game) {
    game.on('player-moved', event =>
      this.handleGameResponse(event.currentNode.description)
    );

    game.on('player-move-blocked', event =>
      this.handleGameResponse(style.error(`can't go ${event.direction}.`))
    );

    game.on('game-started', (event) => {
      console.log('\x1Bc');
      console.log(style.banner(event.text));
    });

    game.on('stop-requested', () => {
      this._rl.question(style.question('\nAre you sure you want to leave the game? '), (answer) => {
        if (answer.match(/^y$|^yes$/i)) {
          this._game.acceptCommand({ command: 'stop' });
        } else {
          this._rl.prompt();
        }
      });
    });

    game.on('game-stopped', () => {
      console.log((style.normal('See you next time.')));
      this._rl.close();
    });
  }

  handleGameResponse(responseText) {
    console.log();
    console.log(style.normal(responseText));

    const actions = this.buildActionList();
    this._rl.setPrompt(style.prompt(`\n${this._game.currentNode.name} [${actions}] > `));

    this._rl.prompt();
  }

  buildActionList() {
    const node = this._game.currentNode;

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
}

module.exports = TextEngine;
