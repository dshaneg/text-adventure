'use strict';

const readline = require('readline');
const TextEngine = require('./text-engine');
const map = require('../game/map');
const GameEngine = require('./game-factory');

const gameEngine = new GameEngine(map);
const textEngine = new TextEngine(gameEngine);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

handleGameResponse(textEngine.createGame());

rl.on('line', (line) => {
  handleGameResponse(textEngine.respond(line));
});

function handleGameResponse(response) {
  console.log();
  console.log(response.text);
  rl.setPrompt(`\n${response.locName} > `);
  rl.prompt();
}
