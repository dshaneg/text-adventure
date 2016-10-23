'use strict';

const styleDefinitions = [];

styleDefinitions.push(require('./styles/greenscreen'));
styleDefinitions.push(require('./styles/pastel'));
styleDefinitions.push(require('./styles/royal'));
styleDefinitions.push(require('./styles/warm'));
styleDefinitions.push(require('./styles/cool'));

const ansiStyles = require('ansi-styles');

class Style {
  constructor(definitions) {
    this.definitions = definitions;
    this._set(definitions[0]); // first one as default
  }

  get definitionNames() {
    return this.definitions.map(item => item.name);
  }

  isStyle(definitionName) {
    return Boolean(this.findDefinition(definitionName));
  }

  findDefinition(definitionName) {
    const definition = this.definitions.find(item => item.name.toUpperCase() === definitionName.toUpperCase());
    return definition;
  }

  set(definitionName) {
    const definition = this.findDefinition(definitionName);
    if (!definition) {
      throw new Error(`Can not apply style. No style definition named '${definitionName}.`);
    }

    this._set(definition);
  }

  _set(styleDefinition) {
    this.name = styleDefinition.name;
    this.defaultOpen = styleDefinition.defaultOpen;
    this.defaultClose = ansiStyles.reset.open;
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

module.exports = new Style(styleDefinitions);
