/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from '@crossed/styled/registry';
import { Loader } from '../index';
import { getAst } from './getAst';
import { MediaQueriesPlugin, BasePlugin } from '@crossed/styled/plugins';

Registry.addPlugin(BasePlugin).addPlugin(
  MediaQueriesPlugin({
    sm: 500,
    md: 700,
  })
);

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
      `.margin-top-\\[4px\\] { margin-top:4px; }
.width-\\[50px\\] { width:50px; }
@media (min-width: 700px) { .md\\:background-color-\\[red\\] { background-color:red; } }`
    );
  });

  test('sm/md', () => {
    const loader = new Loader();

    loader.parse(
      getAst(
        `()=>({
            base: {
              marginTop: 4,
              width: 50,
              backgroundColor: "black"
            },
            media: {
              sm : { backgroundColor: "green" },
              md: { backgroundColor: "red" }
            }
          })`
      )
    );
    expect(loader.getCSS()).toEqual(
      `.margin-top-\\[4px\\] { margin-top:4px; }
.width-\\[50px\\] { width:50px; }
.background-color-\\[black\\] { background-color:black; }
@media (min-width: 500px) { .sm\\:background-color-\\[green\\] { background-color:green; } }
@media (min-width: 700px) { .md\\:background-color-\\[red\\] { background-color:red; } }`
    );
  });
});
