/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  Children,
  cloneElement,
  ComponentProps,
  HTMLProps,
  isValidElement,
} from 'react';
import { Text } from '../../typography/Text';
import { composeStyles, createStyles } from '@crossed/styled';
import { XBox, YBox } from '../../layout';
import { growStyles, shadowStyles } from '../../styles';

const useTable = createStyles(({ colors, space, radius }) => ({
  table: {
    base: {
      width: '100%',
      borderCollapse: 'collapse',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: colors.border.secondary.default,
      backgroundColor: colors.background.secondary.alt,
      borderRadius: radius.xl,
    },
  },
  thead: {
    base: {},
  },
  tbody: { base: {} },
  tr: {
    base: {
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: colors.border.secondary.default,
    },
  },
  flex: { base: { flex: 1 } },
  td: {
    base: {},
  },
  th: { base: { textAlign: 'left' } },
  cellPadding: {
    base: { paddingVertical: space.lg, paddingHorizontal: space['3xl'] },
  },
  noBorderBottom: { base: { borderWidth: 0 } },
}));

export const Table = (props: ComponentProps<typeof YBox>) => {
  return <YBox {...props} style={composeStyles(useTable.table, shadowStyles.xl, props.style)} />;
};

export const THead = (props: ComponentProps<typeof YBox>) => {
  return <YBox {...props} style={composeStyles(useTable.thead, props.style)} />;
};

export const TBody = ({ children, ...props }: ComponentProps<typeof YBox>) => {
  const childCount = Children.count(children);
  return (
    <YBox {...props} style={composeStyles(useTable.tbody, props.style)}>
      {Children.map(children, (child, i) =>
        childCount - 1 === i && isValidElement(child)
          ? cloneElement(child, {
              style: composeStyles(
                (child.props as any).style,
                useTable.noBorderBottom
              ),
            } as any)
          : child
      )}
    </YBox>
  );
};
export const Tr = (props: ComponentProps<typeof XBox>) => {
  const flex = Children.count(props.children);
  return (
    <XBox
      {...props}
      style={composeStyles(useTable.tr, props.style, { flex })}
    />
  );
};
Tr.displayName = 'Table.Tr';

export const Td = (props: ComponentProps<typeof Text>) => {
  return (
    <Text
      {...props}
      style={composeStyles(
        growStyles.on,
        useTable.flex,
        useTable.cellPadding,
        useTable.td,
        props.style
      )}
    />
  );
};
export const Th = (props: ComponentProps<typeof Text>) => {
  return (
    <Text
      {...props}
      style={composeStyles(
        growStyles.on,
        useTable.flex,
        useTable.cellPadding,
        useTable.th,
        props.style
      )}
    />
  );
};
