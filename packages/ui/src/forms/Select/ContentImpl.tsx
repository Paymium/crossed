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
import { Adapt } from '../../other/Adapt';
import { ContentProps } from './types';

export const SelectContent = (props: ContentProps) => {
  const all = useSelectProvider();
  const { setOpen, open, onFocus, onBlur, searchable } = all;

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  return (
    <Portal>
      <SelectProvider {...all}>
        <Focus
          onEscapeKey={onClose}
          onClickOutside={onClose}
          enabled={open && !searchable}
          onActivation={() => onFocus?.({} as any)}
          onDeactivation={() => onBlur?.({} as any)}
        >
          <Adapt fallback={<ContentNative {...props} />}>
            <ContentWeb {...props} />
          </Adapt>
        </Focus>
      </SelectProvider>
    </Portal>
  );
};
