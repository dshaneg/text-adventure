'use strict';

const readline = require('readline');
const chalk = require('chalk');

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

    return this.handleGameResponse({ text: `Huh? I didn't understand that. Type ${chalk.yellow('help')} if you're stuck.` });
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
      this.handleGameResponse({ text: event.currentNode.description, prompt: event.currentNode.name })
    );

    game.on('player-move-blocked', event =>
      this.handleGameResponse({ text: `can't go ${event.direction}.`, prompt: event.currentNode.name })
    );

    game.on('game-started', (event) => {
      console.log('\x1Bc');
      console.log(chalk.bold.yellow(event.text));
    });

    game.on('stop-requested', () => {
      this._rl.question('Are you sure you want to leave the game? ', (answer) => {
        if (answer.match(/^y$|^yes$/i)) {
          this._game.acceptCommand({ command: 'stop' });
        } else {
          this._rl.prompt();
        }
      });
    });

    game.on('game-stopped', () => {
      console.log(('See you next time.\n'));
      this._rl.close();
    });
  }

  handleGameResponse(response) {
    console.log();
    console.log(response.text);

    if (response.prompt) {
      this._rl.setPrompt(chalk.bold.cyan(`\n${response.prompt} > `));
    }

    this._rl.prompt();
  }
}

module.exports = TextEngine;
