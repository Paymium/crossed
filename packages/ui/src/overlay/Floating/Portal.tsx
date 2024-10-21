/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Portal } from '@gorhom/portal';
import { FloatingProvider, useFloatingContext } from './context';
import { PropsWithChildren, useEffect, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { composeStyles, CrossedMethods, inlineStyle } from '@crossed/styled';
import { positionStyles } from '../../styles/position';
import { VisibilityHidden } from '@crossed/primitive';

export const FloatingPortal = ({
  children,
  style,
}: PropsWithChildren<{ style?: CrossedMethods<any>; wait?: number }>) => {
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
      <FloatingProvider {...floatingContext}>
        <RemoveScroll
          enabled={interShow}
          {...composeStyles(
            interShow && positionStyles.absoluteFill,
            inlineStyle(() => ({ web: { base: { position: 'fixed' } } })),
            style
          ).className()}
        >
          {floatingContext.visibilityHidden ? (
            <VisibilityHidden hide={!interShow}>{children}</VisibilityHidden>
          ) : interShow ? (
            children
          ) : null}
        </RemoveScroll>
      </FloatingProvider>
    </Portal>
  );
};
