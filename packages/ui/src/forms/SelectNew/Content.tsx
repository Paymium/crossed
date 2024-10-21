import {
  FadeIn,
  FadeOut,
  runOnJS,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { Floating } from '../../overlay/Floating';
import { MenuList } from '../../display/MenuList';
import { inlineStyle, isWeb } from '@crossed/styled';
import { LayoutRectangle, SelectProvider, useSelectContext } from './context';
import { useState } from 'react';
import { sheetContext, useSheetContext } from '../../overlay/Sheet/context';
import { Sheet } from '../../overlay/Sheet';
import { YBox } from '../../layout/YBox';

export const SelectContent = ({ children }) => {
  const selectContext = useSelectContext();
  const { layout: layoutShared, showSheet } = selectContext;
  const [layout, setLayout] = useState<LayoutRectangle>();
  const sheetContextValue = useSheetContext();

  useAnimatedReaction(
    () => layoutShared.value,
    (current, previous) => {
      if (JSON.stringify(current || {}) !== JSON.stringify(previous || {})) {
        runOnJS(setLayout)(current);
      }
    }
  );

  return showSheet ? (
    <Sheet.Frame style={inlineStyle(() => ({ base: { gap: 8 } }))} role="list">
      <SelectProvider {...selectContext}>
        {/* <Sheet.Title>{title}</Sheet.Title> */}
        <YBox space="xs">{children}</YBox>
      </SelectProvider>
      {/* <Sheet.Footer>{footer}</Sheet.Footer> */}
    </Sheet.Frame>
  ) : (
    <Floating.Portal wait={0}>
      <SelectProvider {...selectContext}>
        <sheetContext.Provider value={sheetContextValue}>
          <Floating.Overlay
            style={inlineStyle(() => ({ base: { opacity: 0 } }))}
          />
          <Floating.Content
            entering={FadeIn}
            exiting={FadeOut}
            ref={selectContext.refs.setFloating as any}
            style={[
              inlineStyle(({ boxShadow }) => ({
                base: { zIndex: 1000 },
                web: { base: { boxShadow } },
              })).style().style,
              isWeb && selectContext.floatingStyles,
            ]}
          >
            <MenuList>{children}</MenuList>
          </Floating.Content>
        </sheetContext.Provider>
      </SelectProvider>
    </Floating.Portal>
  );
};
