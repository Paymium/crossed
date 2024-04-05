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
      borderColor: t.colors.neutral,
      backgroundColor: t.colors.backgroundSoft,
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
      borderColor: t.colors.neutral,
    },
  },
  td: {
    base: {
      padding: t.space.sm,
      // variants: {
      //   textAlign,
      // },
    },
  },
  th: { base: { textAlign: 'left', padding: t.space.sm } },
}));

export const Table = (props: HTMLProps<HTMLTableElement>) => {
  const { table } = useTable();
  return <table {...props} className={table.className} />;
};

export const THead = (props: HTMLProps<HTMLTableSectionElement>) => {
  const { thead } = useTable();
  return <thead {...props} className={thead.className} />;
};

export const TBody = ({
  children,
  ...props
}: HTMLProps<HTMLTableSectionElement>) => {
  const { tbody } = useTable();
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
    <tbody {...props} className={tbody.className}>
      {newChild}
    </tbody>
  );
};
export const Tr = (props: HTMLProps<HTMLTableRowElement>) => {
  const { tr } = useTable();
  return <tr {...props} className={tr.className} />;
};

(Tr as any).id = 'Table.Tr';

export const Td = (props: HTMLProps<HTMLTableCellElement>) => {
  const { td } = useTable();
  return <td {...props} className={td.className} />;
};
export const Th = (props: HTMLProps<HTMLTableCellElement>) => {
  const { th } = useTable();
  return <th {...props} className={th.className} />;
};
