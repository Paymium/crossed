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

describe('variants', () => {
  test('variant width media query', () => {});
  const loader = new Loader();
  loader.parse(
    getAst(
      `{
        base: {
          marginTop: 4,
          width: 50,
        },
        variants: {
          color: {
            [mq.width(300, 400)]: { backgroundColor: "red" },
            white: { color: "white" }
          }
        }
      }`
    )
  );
  expect(loader.getCSS()).toEqual(
    `.margin-top-[4px] { margin-top:4px; }
.width-[50] { width:50; }
@media (min-width: 300px) and (max-width: 400px) { .background-color-[red] { background-color:red; } }
.color-[white] { color:white; }\n`
  );
});
