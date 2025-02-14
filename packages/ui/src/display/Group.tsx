/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { cloneElement, isValidElement, memo, useMemo, Children } from 'react';
import { withStaticProperties } from '@crossed/core';
import { BoxProps, Divider, XBox, YBox } from '../layout';
import { composeStyles, createStyles } from '@crossed/styled';

const stylesVertical = createStyles(() => ({
  first: {
    base: {
      borderBottomWidth: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  middle: {
    base: { borderBottomWidth: 0, borderRadius: 0, borderTopWidth: 0 },
  },
  last: {
    base: {
      borderTopWidth: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  },
}));

const stylesHorizontal = createStyles(() => ({
  first: {
    base: {
      borderRightWidth: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  middle: {
    base: { borderLeftWidth: 0, borderRadius: 0, borderRightWidth: 0 },
  },
  last: {
    base: {
      borderLeftWidth: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
}));

type GroupRootProps = BoxProps & {
  orientation?: 'horizontal' | 'vertical';
};
export const GroupRoot = memo<GroupRootProps>(
  ({ orientation = 'vertical', children, ...props }) => {
    const childrenModified = useMemo(() => {
      return Children.toArray(children).map((child, i, a) => {
        if (!isValidElement(child)) return child;

        const size = a.length;
        const isFirst = i === 0;
        const isLast = i === size - 1;
        const isMiddle = !isFirst && !isLast;

        const props: any = {
          style: composeStyles(
            child.props.style,
            orientation === 'vertical' && [
              isFirst && !isLast && stylesVertical.first,
              isLast && !isFirst && stylesVertical.last,
              isMiddle && stylesVertical.middle,
            ],
            orientation === 'horizontal' && [
              isFirst && !isLast && stylesHorizontal.first,
              isLast && !isFirst && stylesHorizontal.last,
              isMiddle && stylesHorizontal.middle,
            ]
          ),
        };
        if (child.type === Divider) {
          props.direction =
            orientation === 'horizontal' ? 'vertical' : 'horizontal';
          delete props.style;
        }

        return cloneElement(child, props as any);
      });
    }, [children, orientation]);

    const Container = useMemo(
      () => (orientation === 'vertical' ? YBox : XBox),
      [orientation]
    );

    return <Container {...props}>{childrenModified}</Container>;
  }
);

export const Group = withStaticProperties(GroupRoot, {});
