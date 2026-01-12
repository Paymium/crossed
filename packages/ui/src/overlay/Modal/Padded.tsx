/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  ComponentProps,
  forwardRef,
  memo,
  RefAttributes,
  useContext,
} from 'react';
import { localContext } from './context';
import { Sheet } from '../Sheet';
import { View } from 'react-native';
import { Box } from '../../layout';
import { composeStyles, inlineStyle } from '@crossed/styled';

export const ModalPadded = memo<
  ComponentProps<typeof Sheet.Padded> & RefAttributes<View>
>(
  forwardRef(({ fullHeight, ...props }, ref) => {
    const { showSheet } = useContext(localContext);

    return showSheet ? (
      <Sheet.Padded ref={ref} {...props} />
    ) : (
      <Box
        ref={ref}
        {...props}
        style={composeStyles(
          inlineStyle(({ space }) => ({
            base: { padding: undefined, paddingHorizontal: space['4xl'] },
          })),
          props.style
        )}
      />
    );
  })
);
