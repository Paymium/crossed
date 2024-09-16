/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { HTMLProps } from 'react';
import { Text } from '../typography/Text';
import { className, createStyles, type CrossedStyle } from '@crossed/styled';

const useTable = createStyles((t) => ({
  table: {
    base: {
      width: '100%',
      borderCollapse: 'collapse',
      borderWidth: 0,
      tableLayout: 'fixed',
    },
  },
  thead: {
    base: {
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      // borderColor: t.colors.neutral.bright,
      // backgroundColor: t.colors.neutral.low,
    },
  },
  tbody: { base: {} },
  tr: {
    base: {
      borderTopWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderStyle: 'solid',
      // borderColor: t.colors.neutral[500],
    },
  },
  td: {
    base: { padding: t.space.xs },
  },
  th: { base: { textAlign: 'left', padding: t.space.xs } },
}));

export const Table = ({
  style,
  ...props
}: Omit<HTMLProps<HTMLTableElement>, 'style'> & { style?: CrossedStyle }) => {
  return <table {...props} {...className(useTable.table, style)} />;
};

export const THead = ({
  style,
  ...props
}: Omit<HTMLProps<HTMLTableSectionElement>, 'style'> & {
  style?: CrossedStyle;
}) => {
  return <thead {...props} {...className(useTable.thead, style)} />;
};

export const TBody = ({
  children,
  style,
  ...props
}: Omit<HTMLProps<HTMLTableSectionElement>, 'style'> & {
  style?: CrossedStyle;
}) => {
  const newChild =
    (Array.isArray(children) && children.length > 0) || children ? (
      children
    ) : (
      <Tr>
        <Td>
          <Text>-</Text>
        </Td>
        <Td>
          <Text>-</Text>
        </Td>
        <Td>
          <Text>-</Text>
        </Td>
      </Tr>
    );
  return (
    <tbody {...props} {...className(useTable.tbody, style)}>
      {newChild}
    </tbody>
  );
};
export const Tr = ({
  style,
  ...props
}: Omit<HTMLProps<HTMLTableRowElement>, 'style'> & {
  style?: CrossedStyle;
}) => {
  return <tr {...props} {...className(useTable.tr, style)} />;
};

(Tr as any).id = 'Table.Tr';

export const Td = ({
  style,
  ...props
}: Omit<HTMLProps<HTMLTableCellElement>, 'style'> & {
  style?: CrossedStyle;
}) => {
  return <td {...props} {...className(useTable.td, style)} />;
};
export const Th = ({
  style,
  ...props
}: Omit<HTMLProps<HTMLTableCellElement>, 'style'> & {
  style?: CrossedStyle;
}) => {
  return <th {...props} {...className(useTable.th, style)} />;
};
