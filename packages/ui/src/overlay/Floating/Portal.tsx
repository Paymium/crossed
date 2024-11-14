/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Portal } from '@gorhom/portal';
import { FloatingProvider, useFloatingContext } from './context';
import { memo, PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { composeStyles, CrossedMethods } from '@crossed/styled';
import { positionStyles } from '../../styles/position';
import { visibility } from '../../styles/visibilityHidden';

export type FloatingPortalProps = PropsWithChildren<{
  style?: CrossedMethods<any>;
  Provider?: (_p: PropsWithChildren) => ReactNode;
}>;

export const FloatingPortal = memo(
  ({
    children,
    style,
    Provider = ({ children }) => children,
  }: FloatingPortalProps) => {
    const floatingContext = useFloatingContext();
    const [interShow, setIternShow] = useState(false);

    useEffect(() => {
      if (floatingContext.open) {
        setIternShow(floatingContext.open);
        return () => {};
      }
      const time = setTimeout(() => setIternShow(false), floatingContext.wait);
      return () => clearTimeout(time);
    }, [floatingContext.open, floatingContext.wait]);

    return (
      <Portal>
        <Provider>
          <FloatingProvider {...floatingContext}>
            <RemoveScroll
              enabled={floatingContext.removeScroll && interShow}
              {...composeStyles(
                interShow && positionStyles.absoluteFill,
                !interShow && visibility.hidden,
                style
              ).className()}
            >
              {floatingContext.visibilityHidden
                ? children
                : interShow
                  ? children
                  : null}
            </RemoveScroll>
          </FloatingProvider>
        </Provider>
      </Portal>
    );
  }
);

FloatingPortal.displayName = 'Floating.Portal';
