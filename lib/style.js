'use strict';

const definitions = [];

definitions.push(require('./styles/royal'));
definitions.push(require('./styles/greenscreen'));
definitions.push(require('./styles/pastel'));
definitions.push(require('./styles/warm'));
definitions.push(require('./styles/cool'));

class Style {
  constructor() {
    this._set(definitions[0]);
  }

  static get definitionNames() {
    return definitions.map((item) => {
      const name = this.name === item.name ? `${item.name}*` : item.name;
      return name;
    });
  }

  set(definitionName) {
    const definition = definitions.find(item => item.name.toUpperCase() === definitionName.toUpperCase());
    if (!definition) {
      throw new Error(`Can not apply style. No style definition named '${definitionName}.`);
    }

    this._set(definition);
  }

  _set(styleDefinition) {
    this.name = styleDefinition.name;
    this.prompt = styleDefinition.prompt;
    this.normal = styleDefinition.normal;
    this.banner = styleDefinition.banner;
    this.hint = styleDefinition.hint;
    this.gamemaster = styleDefinition.gamemaster;
    this.debug = styleDefinition.debug;
    this.error = styleDefinition.error;
    this.traversed = styleDefinition.traversed;
    this.visited = styleDefinition.visited;
    this.unvisited = styleDefinition.unvisited;
  }
}

module.exports = new Style();
