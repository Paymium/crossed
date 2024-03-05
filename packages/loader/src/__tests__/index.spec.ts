/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Loader } from '../index';
import { getAst } from './getAst';

jest.mock('@crossed/styled/hashCode', () => {
  return jest.fn();
});

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
      `.margin-top-[4px] { margin-top:4px; }
.width-[50] { width:50; }
.background-color-[white] { background-color:white; }\n`
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
      `.margin-top-[4px] { margin-top:4px; }
.width-[50] { width:50; }
.background-color-[white] { background-color:white; }\n`
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
      `.margin-top-[4px] { margin-top:4px; }
.width-[50] { width:50; }
.background-color-[white] { background-color:white; }\n`
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
      `.margin-top-[4px] { margin-top:4px; }
.width-[50] { width:50; }
.background-color-[white] { background-color:white; }\n`
    );
  });
});
