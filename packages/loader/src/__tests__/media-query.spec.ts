/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from '@crossed/styled';
import { Loader } from '../index';

Registry.setThemes({ dark: {} }).setThemeName('dark' as unknown as never);

jest.mock('esbuild', () => {});

describe('media-query', () => {
  test('only min', () => {
    const loader = new Loader();

    expect(
      loader.loader(
        `()=>({
            root:{
            base: {
              marginTop: 4,
              width: 50,
            },
            media: {
              md: {
                backgroundColor: "red"
              }
            }
              }
          })`
      )
    ).toEqual(
      '{"root":{"$$$css":true,"marginTop":"margin-top-[4px]","width":"width-[50px]","backgroundColor":"md:background-color-[red]"},}'
    );
    expect(loader.getCSS()).toEqual(
      `.dark {  }
.margin-top-\\[4px\\] { margin-top:4px; }
.width-\\[50px\\] { width:50px; }
@media (min-width: 768px) { .md\\:background-color-\\[red\\] { background-color:red; } }`
    );
  });

  test('sm/md', () => {
    const loader = new Loader();

    expect(
      loader.loader(
        `()=>({
          root:{
          media: {
            md: { backgroundColor: "red" },
            sm : { backgroundColor: "green" },
          },
          base: {
            marginTop: 4,
            width: 50,
            backgroundColor: "black"
          }
            }
        })`
      )
    ).toEqual(
      '{"root":{"$$$css":true,"backgroundColor":"md:background-color-[red] sm:background-color-[green] background-color-[black]","marginTop":"margin-top-[4px]","width":"width-[50px]"},}'
    );
    expect(loader.getCSS()).toEqual(
      `.dark {  }
.margin-top-\\[4px\\] { margin-top:4px; }
.width-\\[50px\\] { width:50px; }
.background-color-\\[black\\] { background-color:black; }
@media (min-width: 576px) { .sm\\:background-color-\\[green\\] { background-color:green; } }
@media (min-width: 768px) { .md\\:background-color-\\[red\\] { background-color:red; } }`
    );
  });
});
