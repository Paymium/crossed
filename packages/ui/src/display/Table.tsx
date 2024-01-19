/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { styled } from '@crossed/styled';
import {
  useMemo,
  type HTMLProps,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import { Text, textAlign } from '../typography/Text';

export const Table = styled(
  (props: HTMLProps<HTMLTableElement>) => <table {...props} />,
  () => ({
    width: '100%',
    borderCollapse: 'collapse',
    borderWidth: 0,
    tableLayout: 'fixed',
  })
);

export const THead = styled(
  ({ children, ...props }: HTMLProps<HTMLTableSectionElement>) => {
    const newChildren = useMemo(
      () =>
        Children.map(children, (c) => {
          if (isValidElement(c) && (c.type as any).id === 'Table.Tr') {
            return cloneElement(c, {
              ...c.props,
              style: { borderTopWidth: 0 },
            });
          }
          return c;
        }),
      [children]
    );
    return <thead {...props}>{newChildren}</thead>;
  },
  (t) => ({
    borderWidth: 0,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: t.colors.neutral,
    backgroundColor: t.utils.hexToRgbA(
      t.utils.shadeColor(t.colors.neutral, 5),
      0.5
    ),
  })
);
export const TBody = styled(
  ({ children, ...props }: HTMLProps<HTMLTableSectionElement>) => {
    const newChild =
      Array.isArray(children) && children.length > 0 ? (
        children
      ) : (
        <Tr>
          <Td>
            <Text color="warning">-</Text>
          </Td>
          <Td>
            <Text color="warning">-</Text>
          </Td>
          <Td>
            <Text textAlign="center" color="warning">
              -
            </Text>
          </Td>
        </Tr>
      );
    return <tbody {...props}>{newChild}</tbody>;
  },
  {}
);
export const Tr = styled(
  (props: HTMLProps<HTMLTableRowElement>) => <tr {...props} />,
  (t) => ({
    borderWidth: 0,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: t.colors.neutral,
  })
);

(Tr as any).id = 'Table.Tr';

export const Td = styled(
  (props: HTMLProps<HTMLTableCellElement>) => <td {...props} />,
  (t) => ({
    padding: t.space.sm,
    variants: {
      textAlign,
    },
  })
);
export const Th = styled(
  (props: HTMLProps<HTMLTableCellElement>) => <th {...props} />,
  (t) => ({ textAlign: 'left', padding: t.space.sm })
);
