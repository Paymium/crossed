/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Portal } from '@gorhom/portal';
import {
  FloatingConfigProvider,
  FloatingProvider,
  useFloatingConfig,
  useFloatingContext,
} from './context';
import {
  forwardRef,
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

export const FloatingPortal = memo<FloatingPortalProps>(
  forwardRef<HTMLElement, FloatingPortalProps>(
    ({ children, style, Provider = ({ children }) => children }, ref) => {
      const floatingContext = useFloatingContext();
      const config = useFloatingConfig();
      const [interShow, setIternShow] = useState(false);

      useEffect(() => {
        if (floatingContext.open) {
          setIternShow(floatingContext.open);
          return () => {};
        }
        const time = setTimeout(
          () => setIternShow(false),
          floatingContext.wait
        );
        return () => clearTimeout(time);
      }, [floatingContext.open, floatingContext.wait]);

      const PortalComponent = floatingContext.portal ? Portal : Fragment;

      return (
        <PortalComponent>
          <Provider>
            <FloatingConfigProvider {...config}>
              <FloatingProvider {...floatingContext}>
                <RemoveScroll
                  ref={ref}
                  enabled={floatingContext.removeScroll && interShow}
                  style={composeStyles(
                    interShow && positionStyles.absoluteFill,
                    !interShow && visibility.hidden,
                    style
                  )}
                >
                  {floatingContext.visibilityHidden
                    ? children
                    : interShow
                      ? children
                      : null}
                </RemoveScroll>
              </FloatingProvider>
            </FloatingConfigProvider>
          </Provider>
        </PortalComponent>
      );
    }
  )
);

FloatingPortal.displayName = 'Floating.Portal';
