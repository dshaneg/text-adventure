'use strict';

import { MoveParser } from '../../parsers/move-parser';
import { MoveCommand } from '../../commands/move-command';
import { commandChannel as channel } from '../../message-bus';

import postal = require('postal');
import chai = require('chai');

const expect = chai.expect;

const session = 'x';

describe('MoveParser', () => {
  let parser: MoveParser;

  beforeEach(() => {
    parser = new MoveParser();
  });

  describe('parse', () => {
    it('should return a valid move south command on "go south"', () => {
      const input = 'go south';

      const result = parser.parse(session, input);

      expect(result.channel.channel).to.equal(channel.channel);

      const command = result.command as MoveCommand;

      expect(command.sessionToken).to.equal(session);
      expect(command.direction).to.equal('s');
    });

    it('should return a valid move south command on "south"', () => {
      const input = 'south';

      const result = parser.parse(session, input);

      const command = result.command as MoveCommand;

      expect(command.direction).to.equal('s');
    });

    it('should return a valid move south command on "s"', () => {
      const input = 's';

      const result = parser.parse(session, input);

      const command = result.command as MoveCommand;

      expect(command.direction).to.equal('s');
    });

    it('should return a valid move south command on "S"', () => {
      const input = 'S';

      const result = parser.parse(session, input);

      const command = result.command as MoveCommand;

      expect(command.direction).to.equal('s');
    });

    it('should return a valid move south command on "Walk South."', () => {
      const input = 'Walk South.';

      const result = parser.parse(session, input);

      const command = result.command as MoveCommand;

      expect(command.direction).to.equal('s');
    });

    it('should return a valid move south command on "   RUN     SoutH  young man  !"', () => {
      const input = 'Walk South.';

      const result = parser.parse(session, input);

      const command = result.command as MoveCommand;

      expect(command.direction).to.equal('s');
    });

    it('should return a valid move south command on "South, you shall go. Yesss."', () => {
      const input = 'South, you shall go. Yesss.';

      const result = parser.parse(session, input);

      const command = result.command as MoveCommand;

      expect(command.direction).to.equal('s');
    });

    it('should return a valid move north command on "n"', () => {
      const input = 'n';

      const result = parser.parse(session, input);

      const command = result.command as MoveCommand;

      expect(command.direction).to.equal('n');
    });

    it('should return a valid move north command on "north"', () => {
      const input = 'north';

      const result = parser.parse(session, input);

      const command = result.command as MoveCommand;

      expect(command.direction).to.equal('n');
    });

    it('should return a valid move east command on "e"', () => {
      const input = 'e';

      const result = parser.parse(session, input);

      const command = result.command as MoveCommand;

      expect(command.direction).to.equal('e');
    });

    it('should return a valid move east command on "east"', () => {
      const input = 'east';

      const result = parser.parse(session, input);

      const command = result.command as MoveCommand;

      expect(command.direction).to.equal('e');
    });

    it('should return a valid move west command on "w"', () => {
      const input = 'w';

      const result = parser.parse(session, input);

      const command = result.command as MoveCommand;

      expect(command.direction).to.equal('w');
    });

    it('should return a valid move west command on "west"', () => {
      const input = 'west';

      const result = parser.parse(session, input);

      const command = result.command as MoveCommand;

      expect(command.direction).to.equal('w');
    });

    it('should return a valid move up command on "u"', () => {
      const input = 'u';

      const result = parser.parse(session, input);

      const command = result.command as MoveCommand;

      expect(command.direction).to.equal('u');
    });

    it('should return a valid move up command on "up"', () => {
      const input = 'up';

      const result = parser.parse(session, input);

      const command = result.command as MoveCommand;

      expect(command.direction).to.equal('u');
    });

    it('should return a valid move down command on "d"', () => {
      const input = 'd';

      const result = parser.parse(session, input);

      const command = result.command as MoveCommand;

      expect(command.direction).to.equal('d');
    });

    it('should return a valid move down command on "down"', () => {
      const input = 'down';

      const result = parser.parse(session, input);

      const command = result.command as MoveCommand;

      expect(command.direction).to.equal('d');
    });

    it('should return a valid move down command on "dn"', () => {
      const input = 'dn';

      const result = parser.parse(session, input);

      const command = result.command as MoveCommand;

      expect(command.direction).to.equal('d');
    });

    it('should return undefined on "sou"', () => {
      const input = 'sou';

      const result = parser.parse(session, input);

      expect(result).to.be.undefined;
    });

    it('should return undefined on valid, but not its own input: "help"', () => {
      const input = 'help';

      const result = parser.parse(session, input);

      expect(result).to.be.undefined;
    });

    it('should return undefined on empty string', () => {
      const input = '';

      const result = parser.parse(session, input);

      expect(result).to.be.undefined;
    });
  });
});