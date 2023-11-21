import { merge } from '../../src/crossed/merge';
import type { State } from '@crossed/core';

const baseOne: State<any>[':active'] = {};
const baseTow: State<any>[':active'] = {};

const result = {};

describe('merge', () => {
  test('Merge empty one and empty two', () => {
    expect(merge({}, {})).toStrictEqual({
      ':active': {},
      ':focus': {},
      ':hover': {},
      ':disabled': {},
    });
  });

  test(':base', () => {
    expect(
      merge(
        {
          ':active': baseOne,
          'className': ['bg-neutral-700'],
          'props': { p1: 'ici', myProps: 'ici' },
        },
        {
          ':active': baseTow,
          'className': ['bg-neutral-600'],
          'props': { myProps: 'la', p2: false },
        }
      )
    ).toStrictEqual({
      ':active': result,
      'className': ['bg-neutral-600'],
      'props': { p1: 'ici', myProps: 'la', p2: false },
      ':focus': {},
      ':hover': {},
      ':disabled': {},
    });
  });

  test(':active', () => {
    expect(merge({ ':active': baseOne }, { ':active': baseTow })).toStrictEqual(
      {
        ':active': result,
        ':focus': {},
        ':hover': {},
        ':disabled': {},
      }
    );
  });

  test(':disabled', () => {
    expect(
      merge({ ':disabled': baseOne }, { ':disabled': baseTow })
    ).toStrictEqual({
      ':disabled': result,
      ':active': {},
      ':focus': {},
      ':hover': {},
    });
  });
  test(':focus', () => {
    expect(merge({ ':focus': baseOne }, { ':focus': baseTow })).toStrictEqual({
      ':focus': result,
      ':active': {},
      ':hover': {},
      ':disabled': {},
    });
  });
  test(':hover', () => {
    expect(merge({ ':hover': baseOne }, { ':hover': baseTow })).toStrictEqual({
      ':hover': result,
      ':active': {},
      ':focus': {},
      ':disabled': {},
    });
  });
});
