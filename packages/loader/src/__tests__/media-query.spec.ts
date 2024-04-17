/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from '@crossed/styled';
import { Loader } from '../index';
import { getAst } from './getAst';

Registry.setThemes({ dark: {} }).setThemeName('dark' as unknown as never);

jest.mock('esbuild', () => {});

describe('media-query', () => {
  test('only min', () => {
    const loader = new Loader();

    loader.parse(
      getAst(
        `()=>({
            base: {
              marginTop: 4,
              width: 50,
            },
            media: {
              md: {
                backgroundColor: "red"
              }
            }
          })`
      )
    );
    expect(loader.getCSS()).toEqual(
      `.width-\\[50px\\] { width:50px; }
.margin-top-\\[4px\\] { margin-top:4px; }
.dark {  }
@media (min-width: 768px) { .md\\:background-color-\\[red\\] { background-color:red; } }`
    );
  });

  test('sm/md', () => {
    const loader = new Loader();

    loader.parse(
      getAst(
        `()=>({
            media: {
              md: { backgroundColor: "red" },
              sm : { backgroundColor: "green" },
            },
            base: {
              marginTop: 4,
              width: 50,
              backgroundColor: "black"
            }
          })`
      )
    );
    expect(loader.getCSS()).toEqual(
      `.background-color-\\[black\\] { background-color:black; }
.width-\\[50px\\] { width:50px; }
.margin-top-\\[4px\\] { margin-top:4px; }
.dark {  }
@media (min-width: 576px) { .sm\\:background-color-\\[green\\] { background-color:green; } }
@media (min-width: 768px) { .md\\:background-color-\\[red\\] { background-color:red; } }`
    );
  });
});
