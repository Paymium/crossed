/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Loader } from '../index';
import { Registry } from '@crossed/styled';

Registry.setThemes({ dark: {} }).setThemeName('dark' as unknown as never);

jest.mock('esbuild', () => {});

const value = `{
  base: {
    base:{
      marginTop: 4,
      width: 50,
      backgroundColor: "white"
      }
    }
}`;
const rnwResult =
  '{"base":{"$$$css":true,"marginTop":"margin-top-[4px]","width":"width-[50px]","backgroundColor":"background-color-[white]"},}';
const cssGnerated = `.dark {  }
.margin-top-\\[4px\\] { margin-top:4px; }
.width-\\[50px\\] { width:50px; }
.background-color-\\[white\\] { background-color:white; }`;

describe('@crossed/loader', () => {
  test('arrow function no explicit return', () => {
    const loader = new Loader();

    expect(loader.loader(`() => (${value})`)).toEqual(rnwResult);
    expect(loader.getCSS()).toEqual(cssGnerated);
  });

  test('arrow function explicit return', () => {
    const loader = new Loader();

    expect(
      loader.loader(`() => {
          return ${value}
      }`)
    ).toEqual(rnwResult);
    expect(loader.getCSS()).toEqual(cssGnerated);
  });

  test('Named function explicit return', () => {
    const loader = new Loader();

    expect(
      loader.loader(`function Bar() {
          return ${value}
      }`)
    ).toEqual(rnwResult);
    expect(loader.getCSS()).toEqual(cssGnerated);
  });
});
