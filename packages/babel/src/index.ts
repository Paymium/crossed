import { create } from 'twrnc/create';
import { declare } from '@babel/helper-plugin-utils';
import type { Visitor } from '@babel/traverse';
import resolveConfig from 'tailwindcss/resolveConfig';
import type { State, Theme } from '@crossed/core';
import type { Style } from 'twrnc/dist/esm/types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const tailwindConfig = require.resolve(__dirname, 'tailwind.config.js');

export default declare(function crosseBabel({ types: t }): {
  name: string;
  visitor: Visitor;
} {
  const fullConfig = resolveConfig(tailwindConfig);
  const tw = create(fullConfig, 'ios');

  function returnValue(value: string | number) {
    return typeof value === 'string'
      ? t.stringLiteral(value)
      : t.numericLiteral(value);
  }

  function isString(p: any, value: string) {
    return (
      t.isStringLiteral(p, { value: value }) ||
      t.isIdentifier(p, { name: value })
    );
  }

  function convertClassNameToStyle(
    style: Record<string, any>,
    other: any[] = []
  ) {
    return Object.entries(style).reduce<ReturnType<typeof t.objectProperty>[]>(
      (acc, [key, value]) => {
        acc.push(t.objectProperty(t.stringLiteral(key), returnValue(value)));
        return acc;
      },
      other
    );
  }

  function checkState(
    name: keyof (State<any> & Theme<any>),
    options: ReturnType<typeof t.objectExpression>
  ) {
    const stateIndex = options.properties.findIndex(
      (e) => t.isObjectProperty(e) && isString(e.key, name)
    );
    const state = options.properties[stateIndex] as
      | ReturnType<typeof t.objectProperty>
      | undefined;
    if (state && t.isObjectExpression(state.value)) {
      fromClassNameToStyle(state.value);
    }
  }

  function fromClassNameToStyle(
    options: ReturnType<typeof t.objectExpression>
  ) {
    if (t.isObjectExpression(options)) {
      const props = options.properties.find(
        (e) => t.isObjectProperty(e) && isString(e.key, 'props')
      ) as ReturnType<typeof t.objectProperty> | undefined;
      const toto: ReturnType<typeof t.objectProperty>[] = [];
      options.properties.forEach((p) => {
        if (
          t.isObjectProperty(p) &&
          isString(p.key, 'className') &&
          t.isArrayExpression(p.value)
        ) {
          const styleArray: Style[] = [];
          p.value.elements.forEach((el) => {
            if (t.isStringLiteral(el)) {
              styleArray.push(tw.style(el.value));
            }
          });
          if (props && t.isObjectExpression(props.value)) {
            const styleProps = props.value.properties.find(
              (o) =>
                t.isObjectProperty(o) &&
                t.isIdentifier(o.key, { name: 'style' })
            );

            toto.push(
              ...convertClassNameToStyle(
                styleArray.reduce((acc, e) => ({ ...acc, ...e }), {}),
                t.isObjectProperty(styleProps) &&
                  t.isObjectExpression(styleProps.value)
                  ? styleProps.value.properties
                  : []
              )
            );
          } else {
            toto.push(
              ...convertClassNameToStyle(
                styleArray.reduce((acc, e) => ({ ...acc, ...e }), {})
              )
            );
          }
        }
      });

      options.properties = [
        ...options.properties.filter(
          (p) =>
            !(
              t.isObjectProperty(p) &&
              (isString(p.key, 'className') || isString(p.key, 'props'))
            )
        ),
        t.objectProperty(
          t.stringLiteral('props'),
          t.objectExpression([
            ...((props?.value as any)?.properties || []),
            t.objectProperty(
              t.stringLiteral('style'),
              t.objectExpression(toto)
            ),
          ])
        ),
      ];

      checkState(':dark', options);
      checkState(':light', options);
    }
  }

  return {
    name: 'crossed',
    visitor: {
      CallExpression(path) {
        if (!t.isIdentifier(path.node.callee, { name: 'styled' })) return;

        const options = path.node.arguments[1];
        if (!t.isObjectExpression(options)) return;
        /**
         * {
         *    <
         *    className: []
         *    variants: {}
         * }
         */
        fromClassNameToStyle(options);

        /**
         * check all state
         * see State and Theme in @crossed/core
         */
        checkState(':disabled', options);
        checkState(':focus', options);
        checkState(':hover', options);
        checkState(':active', options);
        checkState(':dark', options);

        /**
         * variants
         */
        const variantsIndex = options.properties.findIndex(
          (e) => t.isObjectProperty(e) && isString(e.key, 'variants')
        );
        const variants = options.properties[variantsIndex] as ReturnType<
          typeof t.objectProperty
        >;
        if (variants && t.isObjectExpression(variants.value)) {
          variants.value.properties.forEach((p) => {
            if (t.isObjectProperty(p) && t.isObjectExpression(p.value)) {
              p.value.properties.forEach((p2) => {
                if (t.isObjectProperty(p2) && t.isObjectExpression(p2.value)) {
                  fromClassNameToStyle(p2.value);
                  checkState(':disabled', p2.value);
                  checkState(':focus', p2.value);
                  checkState(':hover', p2.value);
                  checkState(':active', p2.value);
                }
              });
            }
          });
        }

        /**
         * compoundVariants
         */
        const compoundVariantsIndex = options.properties.findIndex(
          (e) =>
            t.isObjectProperty(e) &&
            t.isIdentifier(e.key, { name: 'compoundVariants' })
        );
        const compoundVariants = options.properties[
          compoundVariantsIndex
        ] as ReturnType<typeof t.objectProperty>;
        if (compoundVariants && t.isArrayExpression(compoundVariants.value)) {
          compoundVariants.value.elements.forEach((p) => {
            if (t.isObjectExpression(p)) {
              fromClassNameToStyle(p);
              checkState(':disabled', p);
              checkState(':focus', p);
              checkState(':hover', p);
              checkState(':active', p);
            }
          });
        }
      },
      // TODO: check when style is array, on check if object actualy
      JSXElement(path) {
        const { attributes } = path.node.openingElement;

        const classNameIndex = attributes.findIndex(
          ({ name }: any) => name?.name === 'className'
        );
        const styles = attributes.find(
          ({ name }: any) => name?.name === 'style'
        );

        if (
          classNameIndex >= 0 &&
          (attributes[classNameIndex] as any)?.value?.value &&
          (attributes[classNameIndex] as any)?.value?.value !== 'undefined'
        ) {
          const styleTransform = tw.style(
            (attributes[classNameIndex] as any).value.value
          ) as Record<string, any>;
          if (Object.keys(styleTransform).length) {
            if (t.isJSXAttribute(styles as any)) {
              if (t.isJSXExpressionContainer((styles as any).value)) {
                (styles as any).value = t.arrayExpression([
                  convertClassNameToStyle(styleTransform),
                  (styles as any).value.expression,
                ]);
              }
            }
          }
        }
      },
    },
  };
});
