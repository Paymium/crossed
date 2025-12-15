/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { HTMLProps } from 'react';
import { Text } from '../typography/Text';
import { createStyles } from '@crossed/styled';

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
    base: { padding: t.space.xl },
  },
  th: { base: { textAlign: 'left', padding: t.space.xl } },
}));

export const Table = (props: HTMLProps<HTMLTableElement>) => {
  return <table {...props} {...useTable.table.className()} />;
};

export const THead = (props: HTMLProps<HTMLTableSectionElement>) => {
  return <thead {...props} {...useTable.thead.className()} />;
};

export const TBody = ({
  children,
  ...props
}: HTMLProps<HTMLTableSectionElement>) => {
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
  return (
    <tbody {...props} {...useTable.tbody.className()}>
      {newChild}
    </tbody>
  );
};
export const Tr = (props: HTMLProps<HTMLTableRowElement>) => {
  return <tr {...props} {...useTable.tr.className()} />;
};

(Tr as any).id = 'Table.Tr';

export const Td = (props: HTMLProps<HTMLTableCellElement>) => {
  return <td {...props} {...useTable.td.className()} />;
};
export const Th = (props: HTMLProps<HTMLTableCellElement>) => {
  return <th {...props} {...useTable.th.className()} />;
};
