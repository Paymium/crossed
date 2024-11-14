/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Floating } from '../../overlay/Floating';
import { MenuList } from '../../display/MenuList';
import { inlineStyle } from '@crossed/styled';
import { SelectProvider, useSelectContext } from './context';
import { memo, PropsWithChildren, useCallback, useEffect } from 'react';
import { sheetContext, useSheetContext } from '../../overlay/Sheet/context';
import { Sheet } from '../../overlay/Sheet';
import { YBox } from '../../layout/YBox';
import { useFloatingContext } from '../../overlay/Floating/context';
import { FocusScope } from '../../other/FocusScope/FocusScope';
import { RovingFocusGroup } from '@crossed/primitive';

export const SelectContent = memo(({ children }: PropsWithChildren) => {
  const selectContext = useSelectContext();
  const { showSheet, refs, id, value } = selectContext;
  const { open, onClose } = useFloatingContext();
  const sheetContextValue = useSheetContext();
  const top = useSharedValue(0);
  const left = useSharedValue(0);
  const widthShared = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(open ? 1 : 0),
      top: top.value,
      width: widthShared.value,
      left: left.value,
    };
  }, [open, top]);
  const Provider = useCallback(
    ({ children: c }: PropsWithChildren) => {
      return (
        <SelectProvider {...selectContext}>
          <sheetContext.Provider value={sheetContextValue}>
            {c}
          </sheetContext.Provider>
        </SelectProvider>
      );
    },
    [sheetContextValue, selectContext]
  );
  useEffect(() => {
    if (open) {
      refs.trigger.current?.measureInWindow((x, y, width, height) => {
        top.value = y + height;
        left.value = x;
        widthShared.value = width;
      });
    }
  }, [open, refs.trigger]);

  useEffect(() => {
    if (open) {
      const onScroll = (e) => {
        e.stopPropagation();
        e.preventDefault();
        onClose();
      };
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [open, onClose]);

  return showSheet ? (
    <Sheet.Frame style={inlineStyle(() => ({ base: { gap: 8 } }))} role="list">
      <SelectProvider {...selectContext}>
        {/* <Sheet.Title>{title}</Sheet.Title> */}
        <YBox space="xs">{children}</YBox>
      </SelectProvider>
      {/* <Sheet.Footer>{footer}</Sheet.Footer> */}
    </Sheet.Frame>
  ) : (
    <Floating.Portal Provider={Provider}>
      <Floating.Overlay style={inlineStyle(() => ({ base: { opacity: 0 } }))} />

      <FocusScope enabled={open} trapped={open}>
        <RovingFocusGroup
          asChild
          defaultCurrentTabStopId={`${id}-${children[0].props.value}`}
          currentTabStopId={value ? `${id}-${value}` : null}
        >
          <MenuList
            // @ts-expect-error error type
            role="listbox"
            asChild
          >
            <Floating.Content
              ref={refs.content}
              style={[
                inlineStyle(({ boxShadow, space }) => ({
                  base: { zIndex: 1000, marginTop: space.xs },
                  web: { base: { boxShadow } },
                })).style().style,
                animatedStyle,
              ]}
            >
              {children}
            </Floating.Content>
          </MenuList>
        </RovingFocusGroup>
      </FocusScope>
    </Floating.Portal>
  );
});
