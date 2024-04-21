/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { MenuList } from '../../display/MenuList';
import { useSelectProvider } from './context';
import { form } from '../../styles/form';
import { useSelect } from './styles';
import type { ContentProps } from './types';
import { useRef } from 'react';
import { composeStyles } from '@crossed/styled';

export const ContentWeb = ({ sheetProps, ...props }: ContentProps) => {
  const ref = useRef(null);
  const all = useSelectProvider();

  const { top, height, left, width } = (all.triggerLayout.current as any) || {
    top: 0,
    height: 0,
    left: 0,
  };
  return all.open ? (
    <MenuList
      {...props}
      ref={ref}
      style={[
        composeStyles(form.input, useSelect.content).rnw().style,
        {
          top: top + height + 5,
          left,
          minWidth: width,
          position: 'absolute',
        },
      ]}
    />
  ) : null;
};

ContentWeb.id = 'Select.Content';
ContentWeb.displayName = 'Select.Content';
