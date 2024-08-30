/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from '@crossed/styled';
import { Loader } from '../index';
import { PseudoClassPlugin, BasePlugin } from '@crossed/styled';

Registry.setThemes({ dark: {} })
  .setThemeName('dark' as unknown as never)
  .addPlugin(BasePlugin)
  .addPlugin(PseudoClassPlugin);

jest.mock('esbuild', () => {});

describe('pseudoClass', () => {
  test('hover', () => {
    const loader = new Loader();
    expect(
      loader.loader(
        `()=>({
            root:{base: {
              backgroundColor: "white"
            },
            ':hover': {
              backgroundColor: "black"
            }}
        })`
      )
    ).toEqual(
      '{"root":{"$$$css":true,"backgroundColor":"background-color-[white] background-color-[white] hover:background-color-[black] hover:background-color-[black]"},}'
    );
    expect(loader.getCSS()).toEqual(
      `.dark {  }
.background-color-\\[white\\] { background-color:white; }
.hover\\:background-color-\\[black\\]:hover:not(:disabled):not(:active) { background-color:black; }`
    );
  });

  test('focus', () => {
    const loader = new Loader();

    expect(
      loader.loader(
        `()=>({root:{
        base: {
          backgroundColor: "white"
        },
        ':focus': {
          backgroundColor: "black"
        }}
      })`
      )
    ).toEqual(
      '{"root":{"$$$css":true,"backgroundColor":"background-color-[white] background-color-[white] focus:background-color-[black] focus:background-color-[black]"},}'
    );
    expect(loader.getCSS()).toEqual(
      `.dark {  }
.background-color-\\[white\\] { background-color:white; }
.focus\\:background-color-\\[black\\]:focus { background-color:black; }`
    );
  });

  test('active', () => {
    const loader = new Loader();

    expect(
      loader.loader(
        `() => ({root:{
        base: {
          backgroundColor: "white"
        },
        ':active': {
          backgroundColor: "black"
        }}
      })`
      )
    ).toEqual(
      '{"root":{"$$$css":true,"backgroundColor":"background-color-[white] background-color-[white] active:background-color-[black] active:background-color-[black]"},}'
    );
    expect(loader.getCSS()).toEqual(
      `.dark {  }
.background-color-\\[white\\] { background-color:white; }
.active\\:background-color-\\[black\\]:active:not(:disabled) { background-color:black; }`
    );
  });
});
