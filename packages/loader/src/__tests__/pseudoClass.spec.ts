/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from '@crossed/styled';
import { Loader } from '../index';
import { getAst } from './getAst';
import { PseudoClassPlugin, BasePlugin } from '@crossed/styled/plugins';

Registry.setThemes({ dark: {} })
  .setThemeName('dark' as unknown as never)
  .addPlugin(BasePlugin)
  .addPlugin(PseudoClassPlugin);

jest.mock('esbuild', () => {});

describe('pseudoClass', () => {
  test('hover', () => {
    const loader = new Loader();
    loader.parse(
      getAst(`()=>({
            base: {
              backgroundColor: "white"
            },
            ':hover': {
              backgroundColor: "black"
            }
        })`)
    );
    expect(loader.getCSS()).toEqual(
      `.background-color-\\[black\\] { background-color:black; }
.hover\\:background-color-\\[black\\]:hover { background-color:black; }
.background-color-\\[white\\] { background-color:white; }
.dark {  }`
    );
  });

  test('focus', () => {
    const loader = new Loader();

    loader.parse(
      getAst(`{
        base: {
          backgroundColor: "white"
        },
        ':focus': {
          backgroundColor: "black"
        }
    }`)
    );
    expect(loader.getCSS()).toEqual(
      `.background-color-\\[black\\] { background-color:black; }
.focus\\:background-color-\\[black\\]:focus { background-color:black; }
.background-color-\\[white\\] { background-color:white; }
.dark {  }`
    );
  });

  test('active', () => {
    const loader = new Loader();

    loader.parse(
      getAst(`{
        base: {
          backgroundColor: "white"
        },
        ':active': {
          backgroundColor: "black"
        }
    }`)
    );
    expect(loader.getCSS()).toEqual(
      `.background-color-\\[black\\] { background-color:black; }
.active\\:background-color-\\[black\\]:active { background-color:black; }
.background-color-\\[white\\] { background-color:white; }
.dark {  }`
    );
  });
});
