/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from '@crossed/styled';
import { Loader } from '../index';
import { getAst } from './getAst';
import { VariantsPlugin, BasePlugin } from '@crossed/styled';

Registry.setThemes({ dark: {} })
  .setThemeName('dark' as unknown as never)
  .addPlugin(BasePlugin)
  .addPlugin(VariantsPlugin);

jest.mock('esbuild', () => {});

describe('variants', () => {
  test('variant width media query', () => {});
  const loader = new Loader();
  loader.parse(
    getAst(
      `()=>({
        base: {
          marginTop: 4,
          width: 50,
        },
        variants: {
          color: {
            white: { base:{ color: "white", background: "white" } },
            black: { base: { color: "black", background: "black" } }
          },
          size: {
            sm: { base:{ fontSize: 11 } },
            md: { base: { fontSize: 14 } }
          }
        }
      })`
    )
  );
  expect(loader.getCSS()).toEqual(
    `.dark {  }
.margin-top-\\[4px\\] { margin-top:4px; }
.width-\\[50px\\] { width:50px; }
.color-\\[white\\] { color:white; }
.background-\\[white\\] { background:white; }
.color-\\[black\\] { color:black; }
.background-\\[black\\] { background:black; }
.font-size-\\[11px\\] { font-size:11px; }
.font-size-\\[14px\\] { font-size:14px; }`
  );
});
