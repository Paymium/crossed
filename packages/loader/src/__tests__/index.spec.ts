/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Loader } from '../index';
import { getAst } from './getAst';
import { Registry } from '@crossed/styled';

Registry.setThemes({ dark: {} }).setThemeName('dark' as unknown as never);

jest.mock('esbuild', () => {});

describe('@crossed/loader', () => {
  test('simple', () => {
    const loader = new Loader();

    loader.parse(
      getAst(`{
        base: {
          marginTop: 4,
          width: 50,
          backgroundColor: "white"
        }
    }`)
    );
    expect(loader.getCSS()).toEqual(
      `.background-color-\\[white\\] { background-color:white; }
.width-\\[50px\\] { width:50px; }
.margin-top-\\[4px\\] { margin-top:4px; }
.dark {  }`
    );
  });

  test('arrow function no explicit return', () => {
    const loader = new Loader();

    loader.parse(
      getAst(`() => ({
        base: {
          marginTop: 4,
          width: 50,
          backgroundColor: "white"
        }
    })`)
    );
    expect(loader.getCSS()).toEqual(
      `.background-color-\\[white\\] { background-color:white; }
.width-\\[50px\\] { width:50px; }
.margin-top-\\[4px\\] { margin-top:4px; }
.dark {  }`
    );
  });
  test('arrow function explicit return', () => {
    const loader = new Loader();

    loader.parse(
      getAst(`() => {
        return {
          base: {
            marginTop: 4,
            width: 50,
            backgroundColor: "white"
          }
        }
    }`)
    );
    expect(loader.getCSS()).toEqual(
      `.background-color-\\[white\\] { background-color:white; }
.width-\\[50px\\] { width:50px; }
.margin-top-\\[4px\\] { margin-top:4px; }
.dark {  }`
    );
  });

  test('Named function explicit return', () => {
    const loader = new Loader();

    loader.parse(
      getAst(`function Bar() {
        return {
          base: {
            marginTop: 4,
            width: 50,
            backgroundColor: "white"
          }
        }
    }`)
    );
    expect(loader.getCSS()).toEqual(
      `.background-color-\\[white\\] { background-color:white; }
.width-\\[50px\\] { width:50px; }
.margin-top-\\[4px\\] { margin-top:4px; }
.dark {  }`
    );
  });
});
