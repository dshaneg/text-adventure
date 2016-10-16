'use strict';

const gameDefinitionRaw = require('../game/game');

class GameDefinitionRepository {

  get gameDefinition() {
    if (!this._gameDefinition) {
      this._gameDefinition = createGameDefinition(gameDefinitionRaw);
    }
    return this._gameDefinition;
  }
}

function createGameDefinition(definition) {
  const def = {};

  def.banner = definition.banner.join('\n');
  def.opening = definition.opening.join('\n');
  def.help = definition.help.join('\n');

  return def;
}


module.exports = GameDefinitionRepository;
