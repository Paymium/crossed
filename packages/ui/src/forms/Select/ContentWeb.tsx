/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { MenuList } from '../../display/MenuList';
import { SelectProvider, useSelectProvider } from './context';
import { Portal } from '@gorhom/portal';
import { form } from '../../styles/form';
import { useSelect } from './styles';
import type { ContentProps } from './types';
import { useEffect, useRef } from 'react';
import { FocusOn } from 'react-focus-on';

function useOutsideAlerter(ref, cb) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        cb();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, cb]);
}

export const ContentWeb = ({ sheetProps, ...props }: ContentProps) => {
  const ref = useRef(null);

  const all = useSelectProvider();
  useOutsideAlerter(ref, () => {
    all.setOpen(false);
  });
  const { top, height, left, width } = (all.triggerLayout.current as any) || {
    top: 0,
    height: 0,
    left: 0,
  };
  return (
    <Portal>
      <SelectProvider {...all}>
        {all.open ? (
          <FocusOn
            onEscapeKey={() => {
              all.setOpen(false);
            }}
          >
            <MenuList
              {...props}
              ref={ref}
              style={[
                form.input.rnw({ style: useSelect.content.rnw().style }).style,
                {
                  top: top + height + 5,
                  left,
                  minWidth: width,
                  position: 'absolute',
                },
                // props.style,
              ]}
            />
          </FocusOn>
        ) : null}
      </SelectProvider>
    </Portal>
  );
};

ContentWeb.id = 'Select.Content';
ContentWeb.displayName = 'Select.Content';
