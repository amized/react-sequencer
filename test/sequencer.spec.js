/* global describe, it, before */

import chai from 'chai';
import Sequencer from '../src/sequencer';

chai.expect();

const expect = chai.expect;

let s;

describe('Given an instance of my Sequencer library', () => {
  describe('when I initialise the sequence', () => {
    it('should generate a sequence array', () => {
      s = new Sequencer({
        steps: [
          ['one', 0],
          ['two', 10],
          ['three', 5],
          ['four', 23]
        ]
      });

      expect(s.steps).to.deep.equal([
        {
          name: 'one',
          startPos: 0,
          endPos: 0
        },
        {
          name: 'two',
          startPos: 0,
          endPos: 10
        },
        {
          name: 'three',
          startPos: 10,
          endPos: 15
        },
        {
          name: 'four',
          startPos: 15,
          endPos: 38
        }
      ]);
    });
  });

  describe('if i initalise it with a badly formatted steps property', () => {
    it('should error', () => {
      expect(function () {
        s = new Sequencer({
          steps: [
            5,
            ['two', 10],
            ['three', 5],
            ['four', 23]
          ]
        });
      }).to.throw();
    });

    it('should error', () => {
      expect(function () {
        s = new Sequencer({
          steps: 'hello'
        });
      }).to.throw();
    });

    it('should error', () => {
      expect(function () {
        s = new Sequencer({
          steps: [
            ['threww', 5, 600]
          ]
        });
      }).to.throw();
    });

    it('should error', () => {
      expect(function () {
        s = new Sequencer({
          steps: [
            [6, 'hello']
          ]
        });
      }).to.throw();
    });
  });

  describe('when I initialise in complete state', () => {
    it('should be in complete state initially', () => {
      const s = new Sequencer({
        steps: [
          ['one', 100],
          ['two', 2000]
        ],
        complete: true
      });
      expect(s.currentStep).to.equal(1);
      expect(s.status).to.equal('sequencer/STATUS_COMPLETE');
    });
  });

});
