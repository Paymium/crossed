/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, inlineStyle } from '@crossed/styled';
import { Card, CardProps } from '../../display/Card';
import { TabsContext } from './context';

export const createPanel =
  (useTabsContext: () => TabsContext) =>
  ({
    value: valueProps,
    style,
    ...props
  }: CardProps & { value: string | number }) => {
    const { value, id, variant } = useTabsContext();
    return valueProps === value ? (
      <Card
        id={`${id}-panel-${valueProps}`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${valueProps}`}
        {...props}
        style={composeStyles(
          variant === 'underline' &&
            inlineStyle(() => ({
              base: {
                backgroundColor: 'transparent',
                borderWidth: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingTop: 0,
                paddingBottom: 0,
              },
              media: {
                md: {
                  paddingLeft: 0,
                  paddingRight: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                },
                xl: {
                  paddingLeft: 0,
                  paddingRight: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                },
              },
            })),
          style
        )}
      />
    ) : null;
  };
