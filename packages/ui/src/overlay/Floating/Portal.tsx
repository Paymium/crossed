/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Portal } from '@gorhom/portal';
import { FloatingProvider, useFloatingContext } from './context';
import {
  Fragment,
  memo,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { RemoveScroll } from './RemoveScroll';
import { composeStyles, CrossedMethods } from '@crossed/styled';
import { positionStyles } from '../../styles/position';
import { visibility } from '../../styles/visibilityHidden';

export type FloatingPortalProps = {
  children?: ReactNode;

  /**
   * Crossed style
   */
  style?: CrossedMethods<any>;

  /**
   * Pass context to portal
   */
  Provider?: (_p: PropsWithChildren) => ReactNode;
};

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

    const PortalComponent = floatingContext.portal ? Portal : Fragment;

    return (
      <PortalComponent>
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
      </PortalComponent>
    );
  }
);

FloatingPortal.displayName = 'Floating.Portal';
