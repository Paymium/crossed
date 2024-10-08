/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useFloatingContext } from './context';
import { Portal } from '@gorhom/portal';
import { YBox, YBoxProps } from '../../layout/YBox';
import { VisibilityHidden } from '@crossed/primitive';

export type FloatingContentProps = YBoxProps;
export const FloatingContent = (props: FloatingContentProps) => {
  const { open, visibilityHidden } = useFloatingContext();
  return (
    <Portal>
      {visibilityHidden ? (
        <VisibilityHidden hide={!open}>
          <YBox {...props} />
        </VisibilityHidden>
      ) : open ? (
        <YBox {...props} />
      ) : null}
    </Portal>
  );
};
FloatingContent.displayName = 'Floating.Content';
