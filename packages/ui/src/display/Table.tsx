/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStyle } from '@crossed/styled';
import type { HTMLProps } from 'react';
import { Text } from '../typography/Text';

export const Table = withStyle(
  ({ style, ...props }: HTMLProps<HTMLTableElement>) => <table {...props} />,
  () => ({
    base: {
      width: '100%',
      borderCollapse: 'collapse',
      borderWidth: 0,
      tableLayout: 'fixed',
    },
  })
);

export const THead = withStyle(
  ({ style, ...props }: HTMLProps<HTMLTableSectionElement>) => {
    return <thead {...props} />;
  },
  ({ theme: t }) => ({
    base: {
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: t.colors.neutral,
      backgroundColor: t.colors.backgroundSoft,
    },
  })
);
export const TBody = withStyle(
  ({ children, style, ...props }: HTMLProps<HTMLTableSectionElement>) => {
    const newChild =
      (Array.isArray(children) && children.length > 0) || children ? (
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
            <Text color="warning">-</Text>
          </Td>
        </Tr>
      );
    return <tbody {...props}>{newChild}</tbody>;
  },
  { base: {} }
);
export const Tr = withStyle(
  ({ style, ...props }: HTMLProps<HTMLTableRowElement>) => <tr {...props} />,
  ({ theme: t }) => ({
    base: {
      borderTopWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderStyle: 'solid',
      borderColor: t.colors.neutral,
    },
  })
);

(Tr as any).id = 'Table.Tr';

export const Td = withStyle(
  ({ style, ...props }: HTMLProps<HTMLTableCellElement>) => <td {...props} />,
  ({ theme: t }) => ({
    base: {
      padding: t.space.sm,
      // variants: {
      //   textAlign,
      // },
    },
  })
);
export const Th = withStyle(
  ({ style, ...props }: HTMLProps<HTMLTableCellElement>) => <th {...props} />,
  ({ theme: t }) => ({ base: { textAlign: 'left', padding: t.space.sm } })
);
