'use strict';

import { commandChannel, eventChannel, clientEventChannel } from './message-bus';

import { CreateGameCommand } from './commands/create-game-command';

import { StartGameCommand } from './commands/start-game-command';
import { StopGameCommand } from './commands/stop-game-command';

import readline = require('readline');
import { style } from './style';
import { ItemFormatter } from './item-formatter';
import { Parser } from './parsers/parser';
import { MapNode } from './map-node';

const nodeCleanup = require('node-cleanup');

// makes sure that wonky colors don't hang around after the program terminates
nodeCleanup(() => process.stdout.write(style.defaultClose));

const CLEAR_SCREEN_CODE = '\x1Bc';

export class TextEngine {
  constructor(parser: Parser, initialStyle: string) {
    this.parser = parser;

    if (initialStyle) {
      try {
        style.set(initialStyle);
      } catch (error) {
        // eat it
      }
    }

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  private parser: Parser;
  private rl: readline.ReadLine;
  private currentNode: MapNode;

  handleInput(sessionToken: string, input: string) {
    const parseResponse = this.parser.parse(sessionToken, input);

    if (!parseResponse) {
      this.handleGameResponse(style.gamemaster(`Huh? I didn't understand that. Type ${style.hint('help')} if you're stuck.`));
      return;
    }

    parseResponse.channel.publish(parseResponse.topic, parseResponse.command);
  }

  start() {
    // eventually, the game.created event will contain a token or something identifying your game.
    // it will become useful when the engine runs as a server with multiple clients.
    // Then we'll have to pass that token around with all the commands and events.
    eventChannel.subscribe('game.created', (data: any) => this.onGameCreated(data)).once();

    commandChannel.publish(CreateGameCommand.topic, new CreateGameCommand());
  }

  onGameCreated(data: any) {
    eventChannel.subscribe('game.started', (startedData: any) => {
      this.hookHandlers();

      console.log(style.banner(startedData.banner));
      console.log();
      console.log(style.normal(startedData.text));
    }).once();

    this.rl.on('line', (line: string) => this.handleInput(data.sessionToken, line));

    console.log(CLEAR_SCREEN_CODE);

    commandChannel.publish(StartGameCommand.topic, new StartGameCommand(data.sessionToken));
  }

  hookHandlers() {
    clientEventChannel.subscribe('#', (data: any, envelope: any) => {
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

    eventChannel.subscribe('#', (data: any, envelope: any) => {
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
            const lines: string[] = [];
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

            const lines: string[] = [];
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
                commandChannel.publish(StopGameCommand.topic, new StopGameCommand(data.sessionToken, true));
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

  handleGameResponse(responseText: string, textStyle?: any) {
    const currentStyle = textStyle || style.normal;
    console.log(currentStyle(`\n${responseText}`));

    this.rl.prompt();
  }

  _setPrompt(currentNode?: MapNode) {
    if (currentNode) {
      this.currentNode = currentNode;
    }

    this.rl.setPrompt(style.prompt(`\n${this.currentNode.name} [${buildActionList(this.currentNode)}] > `) + style.defaultOpen);
  }
}

function buildActionList(currentNode: MapNode) {
  const node = currentNode;

  const directionStrings: string[] = [];

  for (const direction of node.getAvailableDirections()) {
    let color: any;
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

function highlightHints(text: string) {
  return text.replace(/<<[a-z]+>>/g, match =>
    style.hint(match.substring(2, match.length - 2))
  );
}

