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

describe('media-query', () => {
  describe.only('media-query define by theme', () => {
    test('only min', () => {
      const loader = new Loader();

      loader.parse(
        getAst(
          `({mq})=>({
            base: {
              marginTop: 4,
              width: 50,
              [mq.width("md")]: {
                  backgroundColor: "red"
              }
            }
          })`
        )
      );
      expect(loader.getCSS()).toEqual(
        `.margin-top-[4px] { margin-top:4px; }
.width-[50] { width:50; }
@media (min-width: 768px)  { .md:background-color-[red] { background-color:red; } }\n`
      );
    });
  });
  describe('media-query define by number', () => {
    test('only min', () => {
      const loader = new Loader();

      loader.parse(
        getAst(
          `({mq})=>({
            base: {
              marginTop: 4,
              width: 50,
              [mq.width(300)]: {
                  backgroundColor: "red"
              }
            }
          })`
        )
      );
      expect(loader.getCSS()).toEqual(
        `.margin-top-[4px] { margin-top:4px; }
.width-[50] { width:50; }
@media (min-width: 300px)  { .min-[300]:background-color-[red] { background-color:red; } }\n`
      );
    });
    test('min and max', () => {
      const loader = new Loader();

      loader.parse(
        getAst(
          `({mq})=>({
          base: {
              marginTop: 4,
              width: 50,
              backgroundColor: "red",
              [mq.width(300, 400)]: {
                  backgroundColor: "red"
              }
              }
          })`
        )
      );
      expect(loader.getCSS()).toEqual(
        `.margin-top-[4px] { margin-top:4px; }
  .width-[50] { width:50; }
  .background-color-[red] { background-color:red; }
  @media (min-width: 300px) and (max-width: 400px) { .min-[300]:max-[400]:background-color-[red] { background-color:red; } }\n`
      );
    });
  });
});
