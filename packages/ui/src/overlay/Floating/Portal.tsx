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
import { Fragment, memo, PropsWithChildren, ReactNode, useMemo } from 'react';

export type FloatingPortalProps = {
  children?: ReactNode;

  /**
   * Pass context to portal
   */
  Provider?: (_p: PropsWithChildren) => ReactNode;
};

export const FloatingPortal = memo<FloatingPortalProps>(
  ({ children, Provider = ({ children }) => children }) => {
    const floatingContext = useFloatingContext();
    const config = useFloatingConfig();

    const PortalComponent = useMemo(
      () => (floatingContext.portal ? Portal : Fragment),
      [floatingContext.portal]
    );

    return (
      <PortalComponent>
        <Provider>
          <FloatingConfigProvider {...config}>
            <FloatingProvider {...floatingContext}>{children}</FloatingProvider>
          </FloatingConfigProvider>
        </Provider>
      </PortalComponent>
    );
  }
);

FloatingPortal.displayName = 'Floating.Portal';
