/* global describe, it, before */

import chai from 'chai';
import {Sequencer} from '../src';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of my Sequencer library', () => {
  before(() => {
    lib = new Sequencer();
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('Sequencer');
    });
  });

  describe('when I initialise the sequence', () => {
    it('should generate a sequence array', () => {
      const s = new Sequencer([
        ['one', 0],
        ['two', 10],
        ['three', 5]
      ]);

      expect(s.steps).to.deep.equal([
        {
          name: 'one',
          position: '0'
        },
        {
          name: 'two',
          position: '10'
        },
        {
          name: 'three',
          position: '15'
        }
      ]);


    });
  });

});
