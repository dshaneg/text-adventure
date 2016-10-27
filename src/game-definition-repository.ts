'use strict';

const gameDefinitionRaw = require('../game/game');

export class GameDefinitionRepository {
  private _gameDefinition: any;

  get gameDefinition() {
    if (!this._gameDefinition) {
      this._gameDefinition = createGameDefinition(gameDefinitionRaw);
    }
    return this._gameDefinition;
  }
}

function createGameDefinition(definition: any) {
  const def = {
    style: definition.style,
    banner: definition.banner.join('\n'),
    opening: definition.opening.join('\n'),
    help: definition.help.join('\n')
  };

  return def;
}

