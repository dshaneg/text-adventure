'use strict';

const getopt = require('node-getopt');

const TextEngine = require('./text-engine');

const DebugEventLogger = require('./debug-event-logger');
const style = require('./style');

const opt = getopt.create([
  ['d', 'debug', 'turn on debug output'],
  ['', 'dev', 'turn on dev mode (enables cheats)'],
  ['', 'style=ARG', 'set the color palette for the game'],
  ['h', 'help', 'display this help']
]).bindHelp()
  .parseSystem();

if (opt.options.debug) {
  DebugEventLogger.subscribe();
}

// command parsers
const MoveParser = require('./parsers/move-parser');
const ListInventoryParser = require('./parsers/list-inventory-parser');
const ExitParser = require('./parsers/exit-parser');
const HelpParser = require('./parsers/help-parser');
const ListStylesParser = require('./parsers/list-styles-parser');
const ApplyStyleParser = require('./parsers/apply-style-parser');

// dev-mode (cheat) command parsers
const TeleportParser = require('./parsers/teleport-parser');
const ConjureItemParser = require('./parsers/conjure-item-parser');

const parser = new MoveParser();
const chainTail = parser
  .setNext(new ListInventoryParser())
  .setNext(new ExitParser())
  .setNext(new HelpParser())
  .setNext(new ListStylesParser())
  .setNext(new ApplyStyleParser());

if (opt.options.dev) {
  chainTail
    .setNext(new TeleportParser())
    .setNext(new ConjureItemParser());
}

const GameEngine = require('./game-engine');

GameEngine.initialize(opt.options.dev, opt.options.style);

const initialStyle = style.isStyle(opt.options.style) ?
  opt.options.style :
  GameEngine.style;

const textEngine = new TextEngine(parser, initialStyle);

textEngine.start();
