/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { isWeb } from '@crossed/styled';
import { ContentNative } from './ContentNative';
import { ContentWeb } from './ContentWeb';
import { SelectProvider, useSelectProvider } from './context';
import { useMedia } from '../../useMedia';
import { Portal } from '@gorhom/portal';
import { Focus } from './Focus';
import { useCallback } from 'react';

export const ContentImpl = (props) => {
  const all = useSelectProvider();
  const { adapt } = all;
  const { sm } = useMedia();
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
          {isWeb ? (
            !adapt ? (
              <ContentWeb {...props} />
            ) : sm ? (
              <ContentNative {...props} />
            ) : (
              <ContentWeb {...props} />
            )
          ) : (
            <ContentNative {...props} />
          )}
        </Focus>
      </SelectProvider>
    </Portal>
  );
};
