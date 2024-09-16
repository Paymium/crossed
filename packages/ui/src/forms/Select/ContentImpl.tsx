/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ContentNative } from './ContentNative';
import { ContentWeb } from './ContentWeb';
import { SelectProvider, useSelectProvider } from './context';
import { Portal } from '@gorhom/portal';
import { Focus } from './Focus';
import { useCallback } from 'react';
import { Responsive } from '../../other/Adapt';

export const ContentImpl = (props) => {
  const all = useSelectProvider();
  const { setOpen, open, onFocus, onBlur } = all;

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  return (
    <Portal>
      <SelectProvider {...all}>
        <Focus
          onEscapeKey={onClose}
          onClickOutside={onClose}
          enabled={open}
          onActivation={() => onFocus?.({} as any)}
          onDeactivation={() => onBlur?.({} as any)}
        >
          <Responsive media="md" fallback={<ContentNative {...props} />}>
            <ContentWeb {...props} />
          </Responsive>
        </Focus>
      </SelectProvider>
    </Portal>
  );
};
