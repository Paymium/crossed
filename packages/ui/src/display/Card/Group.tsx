/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactNode,
} from 'react';
import { Divider } from '../../layout';
import { composeStyles } from '@crossed/styled';
import { CardRoot } from './Root';
import { cardStyles, spacingStyle } from './styles';

export const CardGroup = ({ children }: PropsWithChildren) => {
  const childTmp = Children.toArray(children);
  const size = childTmp.length;

  const mappedChildren = childTmp.reduce<ReactNode[]>((acc, child, index) => {
    if (!isValidElement(child)) return acc;
    if (child.type === Divider) return [...acc, child];
    if (child.type === CardRoot) {
      const isFirst = index === 0;
      const isLast = index === size - 1;
      const isMiddle = !isFirst && !isLast;
      return [
        ...acc,
        cloneElement(child, {
          style: composeStyles(
            isFirst && !isLast && cardStyles.first,
            isLast && !isFirst && cardStyles.last,
            isMiddle && cardStyles.middle,
            child.props.style
          ),
        } as any),
      ];
    }
    throw new Error('Direct children of CardGroup should be Divider or Card');
  }, []);

  return mappedChildren;
};
CardGroup.displayName = 'Card.Group';
