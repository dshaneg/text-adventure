'use strict';

import { StyleDefinition } from './styles/style-definition';

import { greenscreen } from './styles/greenscreen';
import { pastel } from './styles/pastel';
import { royal } from './styles/royal';
import { warm } from './styles/warm';
import { cool } from './styles/cool';

const styleDefinitions = [
  greenscreen,
  pastel,
  royal,
  warm,
  cool
];

const ansiStyles = require('ansi-styles');

class Style implements StyleDefinition {
  constructor(definitions: any[]) {
    this.definitions = definitions;
    this._set(definitions[0]); // first one as default
  }

  private definitions: any[];

  get definitionNames() {
    return this.definitions.map(item => item.name);
  }

  isStyle(definitionName: string) {
    if (!definitionName) {
      return false;
    }

    return Boolean(this.findDefinition(definitionName));
  }

  findDefinition(definitionName: string) {
    const definition = this.definitions.find(item => item.name.toUpperCase() === definitionName.toUpperCase());
    return definition;
  }

  set(definitionName: string) {
    const definition = this.findDefinition(definitionName);
    if (!definition) {
      throw new Error(`Can not apply style. No style definition named '${definitionName}.`);
    }

    this._set(definition);
  }

  private _set(styleDefinition: any) {
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

  public name: string;
  public defaultOpen: any;
  public defaultClose: any;
  public prompt: any;
  public normal: any;
  public banner: any;
  public hint: any;
  public gamemaster: any;
  public debug: any;
  public error: any;
  public traversed: any;
  public visited: any;
  public unvisited: any;
}

export const style = new Style(styleDefinitions);
