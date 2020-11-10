import React, { useReducer, useEffect } from 'react';
import sinon from 'sinon';
import { classNames, mockState, randomString, generateId } from '../src/utils';
import { render, waitFor } from '@testing-library/react';

describe('utils.js', () => {
  describe('classNames(...classes)', () => {
    it('should merge arguments into a list of css classes', () => {
      expect(classNames('test', 'secondTest')).toBe('test secondTest');
    });

    it('should ignore falsy arguments when compiling classes', () => {
      const secondTest = null;
      const thirdTest = undefined;
      const fourthTest = false;
      expect(classNames('test', secondTest, thirdTest, fourthTest))
        .toBe('test');
    });

    it('should allow to use an object argument to defined classes based on ' +
      'conditions', () => {
      const secondTest = true;
      expect(classNames('test', { secondTest })).toBe('test secondTest');
    });

    it('should merge classes if argument is an array', () => {
      const thirdTest = false;
      expect(classNames('test', ['secondTest'], [{ thirdTest }, 'fourthTest']))
        .toBe('test secondTest fourthTest');
    });

  });

  describe('mockState(state, action)', () => {
    it('should merge current state with new action values', () => {
      let foo = { bar: 2 };
      foo = mockState(foo, { bar: 5 });
      expect(foo.bar).toBe(5);
    });

    it('should act as a reducer to useReducer hook', async () => {
      const onReady = sinon.spy();
      const Test = () => {
        const [state, dispatch] = useReducer(mockState, { ready: false });

        useEffect(() => {
          dispatch({ ready: true });
        }, []);

        useEffect(() => {
          if (state.ready) {
            onReady();
          }
        }, [state.ready]);

        return null;
      };

      render(<Test />);
      await waitFor(() => {
        expect(onReady.called).toBe(true);
      });
    });
  });

  describe('randomString()', () => {
    it('should generate a 5 chars length random string', () => {
      expect(randomString().length).toBe(5);
    });
  });

  describe('generateId()', () => {
    it('should generate an id if it doesn\'t already exist in the doc', () => {
      expect(/poool-.{5}-.{5}/.test(generateId())).toBe(true);
    });
  });
});
