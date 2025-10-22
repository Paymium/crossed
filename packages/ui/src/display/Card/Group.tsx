/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Children, ComponentProps, isValidElement } from 'react';
import { CardRoot } from './Root';
import { GroupProvider } from './context';

export const CardGroup = (props: ComponentProps<typeof CardRoot>) => {
  let hasFooter = false;
  Children.forEach(props.children, (child) => {
    if (
      isValidElement(child) &&
      (child.type as any).displayName === 'CardFooter'
    ) {
      hasFooter = true;
    }
  });
  return (
    <GroupProvider hasFooter={hasFooter}>
      <CardRoot padding={false} space={null} {...props} />
    </GroupProvider>
  );
};
