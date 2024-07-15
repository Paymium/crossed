/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Loader } from '../index';
import { getAst } from './getAst';
import { Registry } from '@crossed/styled';

Registry.setThemes({ dark: {} }).setThemeName('dark' as unknown as never);

jest.mock('esbuild', () => {});

describe('@crossed/loader', () => {
  test.only('should modify ast for use className', () => {
    const loader = new Loader();

    const ast = getAst(`{
      base: {
        marginTop: 4,
        width: 50,
        backgroundColor: "white"
      }
  }`);

    loader.parse(ast);
    const className =
      'margin-top-[4px] width-[50px] background-color-[white]';
    expect(ast).toEqual({
      properties: [
        {
          computed: false,
          key: { name: 'base', type: 'Identifier' },
          kind: 'init',
          method: false,
          shorthand: false,
          type: 'Property',
          value: {
            raw: `"${className}"`,
            type: 'Literal',
            value: className,
          },
        },
      ],
      type: 'ObjectExpression',
    });
  });

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
      `.dark {  }
.margin-top-\\[4px\\] { margin-top:4px; }
.width-\\[50px\\] { width:50px; }
.background-color-\\[white\\] { background-color:white; }
`
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
      `.dark {  }
.margin-top-\\[4px\\] { margin-top:4px; }
.width-\\[50px\\] { width:50px; }
.background-color-\\[white\\] { background-color:white; }
`
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
      `.dark {  }
.margin-top-\\[4px\\] { margin-top:4px; }
.width-\\[50px\\] { width:50px; }
.background-color-\\[white\\] { background-color:white; }
`
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
      `.dark {  }
.margin-top-\\[4px\\] { margin-top:4px; }
.width-\\[50px\\] { width:50px; }
.background-color-\\[white\\] { background-color:white; }
`
    );
  });
});
