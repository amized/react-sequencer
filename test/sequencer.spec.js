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
      expect(function() {
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
      expect(function() {
        s = new Sequencer({
          steps: 'hello'
        });
      }).to.throw();
    });

    it('should error', () => {
      expect(function() {
        s = new Sequencer({
          steps: [
            ['threww', 5, 600]
          ]
        });
      }).to.throw();
    });

    it('should error', () => {
      expect(function() {
        s = new Sequencer({
          steps: [
            [6, 'hello']
          ]
        });
      }).to.throw();
    });
  });

  describe('when I initialise with an initial step', () => {
    it('should be in the correct step initially', () => {
      const s = new Sequencer({
        steps: [
          ['one', 100],
          ['two', 2000]
        ],
        initialStep: 'two'
      });

      expect(s.currentStep).to.equal(1);
      expect(s.currentTimeIn).to.equal(100);
    });

    it('should set to step 0 if the initial step is not found', () => {
      const s = new Sequencer({
        steps: [
          ['two', 10],
          ['three', 5],
          ['four', 23]
        ],
        initialStep: 'one'
      });

      expect(s.currentStep).to.equal(0);
      expect(s.currentTimeIn).to.equal(0);
    });
  });

  describe('when I start the sequencer', () => {
    before(() => {
      s = new Sequencer({
        steps: [
          ['one', 0],
          ['two', 2000]
        ]
      });
      s.play();
    });

    it('should be in the correct state while playing', (done) => {
      setTimeout(() => {
        expect(s.status).to.equal('sequencer/STATUS_PLAYING');
        expect(s.currentStep).to.equal(1);
        done();
      }, 1000);
    }).timeout(5000);

    it('should be in the correct state when finished', (done) => {
      setTimeout(() => {
        expect(s.status).to.equal('sequencer/STATUS_COMPLETE');
        expect(s.currentStep).to.equal(1);
        done();
      }, 2100);
    }).timeout(5000);
  });

  describe('when I pause the sequencer', () => {
    before(() => {
      s = new Sequencer({
        steps: [
          ['one', 0],
          ['two', 2000]
        ]
      });
      s.play();
      s.pause();
    });

    it('should be in the correct state', (done) => {
      setTimeout(() => {
        expect(s.status).to.equal('sequencer/STATUS_IDLE');
        expect(s.currentStep).to.equal(0);
        done();
      }, 500);
    }).timeout(5000);
  });

  describe('a complex sequence', () => {
    before(() => {
      s = new Sequencer({
        steps: [
          ['one', 400],
          ['two', 500],
          ['three', 200],
          ['four', 600],
          ['five', 500]
        ]
      });
      s.play();
    });

    it('should sequence through the correct states', (done) => {
      setTimeout(() => {
        expect(s.currentStep).to.equal(0);
      }, 300);

      setTimeout(() => {
        expect(s.currentStep).to.equal(1);
      }, 500);

      setTimeout(() => {
        expect(s.currentStep).to.equal(2);
      }, 1000);

      setTimeout(() => {
        expect(s.currentStep).to.equal(3);
      }, 1200);

      setTimeout(() => {
        expect(s.currentStep).to.equal(4);
        done();
      }, 1800);

    }).timeout(5000);
  });

  describe('when I run a sequence on loop mode', () => {
    before(() => {
      s = new Sequencer({
        steps: [
          ['one', 500],
          ['two', 500]
        ],
        loop: true
      });
      s.play();
    });

    it('should start the sequence over once it finishes', (done) => {
      setTimeout(() => {
        expect(s.currentStep).to.equal(0);
      }, 250);
      setTimeout(() => {
        expect(s.currentStep).to.equal(1);
      }, 750);
      setTimeout(() => {
        expect(s.currentStep).to.equal(0);
      }, 1250);
      setTimeout(() => {
        expect(s.currentStep).to.equal(1);
        s.stop();
        done();
      }, 1750);
    }).timeout(5000);
  });

  describe('when I subscribe to a sequencer', () => {
    before(() => {
      s = new Sequencer({
        steps: [
          ['one', 400],
          ['two', 500],
          ['three', 200],
          ['four', 600],
          ['five', 500]
        ]
      });
    });

    it('should notify me when the sequencer state changes', (done) => {
      let updateCount = 0;

      s.onChange(seq => {
        switch (updateCount) {
          case 0:
            expect(seq.current).to.equal('one');
            break;
          case 1:
            expect(seq.current).to.equal('two');
            break;
          case 2:
            expect(seq.current).to.equal('three');
            break;
          case 3:
            expect(seq.current).to.equal('four');
            break;
          case 4:
            expect(seq.current).to.equal('five');
            break;
          case 5:
            expect(seq.current).to.equal('five');
            expect(seq.isComplete).to.equal(true);
            done();
            break;
          default:
            break;
        }
        updateCount++;
      });

      s.play();

    }).timeout(5000);
  });

});
