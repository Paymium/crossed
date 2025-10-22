/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles } from '@crossed/styled';
import { Text, TextProps } from '../../typography';
import { PropsWithChildren } from 'react';
import { form } from '../../styles';

type LabelProps = PropsWithChildren<TextProps>;

export const SwitchLabel = ({ children, id, ...props }: LabelProps) => {
  return (
    <Text
      id={id}
      accessibilityRole={'label' as any}
      {...props}
      style={composeStyles(form.label, props.style)}
    >
      {children}
    </Text>
  );
};
