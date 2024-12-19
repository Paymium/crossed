/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  ComponentProps,
  KeyboardEventHandler,
  memo,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { FocusScope, FocusScopeProps } from '../../other/FocusScope';
import { alignItemsStyle } from '../../styles/alignItems';
import { justifyContentStyle } from '../../styles/justifyContent';
import { positionStyles } from '../../styles/position';
import { RemoveScroll } from '../../other/RemoveScroll';
import {
  composeStyles,
  CrossedMethods,
  inlineStyle,
  isWeb,
} from '@crossed/styled';
import { createStyles } from '@crossed/styled';
import { localContext } from './context';
import { Sheet } from '../Sheet/index';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { ActionSheetRef } from '@crossed/sheet';
import { Floating, useFloatingContext } from '../Floating';

export const modalStyles = createStyles(({ colors, space }) => ({
  content: {
    base: {
      zIndex: 100000,
      borderRadius: 16,
      backgroundColor: colors.background.secondary,
      margin: 'auto',
      padding: space.xl,
      gap: space.xl,
    },
  },
}));

const styles = createStyles(() => ({
  default: {
    base: { maxHeight: '95%' },
  },
  sm: {
    base: { width: '90%', maxHeight: '90%' },
    media: { md: { maxWidth: 560, height: 'auto' } },
  },
  md: {
    base: { width: '90%', maxHeight: '90%' },
    media: { md: { maxWidth: 760, height: 'auto' } },
  },
  lg: {
    base: { width: '90%', maxHeight: '90%' },
    media: { md: { maxWidth: 1024, height: 'auto' } },
  },
}));

export type ModalOnKeyDown = KeyboardEventHandler<HTMLButtonElement>;

export const useKeyDown = (keyEvent: any, { enable }: any) => {
  const onKeyDown = useCallback(
    (e: DocumentEventMap['keydown']) => {
      keyEvent[e.key]?.();
    },
    [keyEvent]
  );

  useEffect(() => {
    if (enable && isWeb) {
      document.addEventListener('keydown', onKeyDown);
      return () => {
        document.removeEventListener('keydown', onKeyDown);
      };
    }
    return () => {};
  }, [onKeyDown, enable]);
};

const SheetComponent = ({ children }: PropsWithChildren) => {
  const { open, onClose } = useFloatingContext();
  const { showSheet } = useContext(localContext);
  const refSheet = useRef<ActionSheetRef>(null);
  useEffect(() => {
    if (showSheet) {
      if (open) {
        refSheet.current?.show();
      } else {
        refSheet.current?.hide();
      }
    }
  }, [open, showSheet]);
  return (
    <Sheet ref={refSheet as any}>
      <Sheet.Content onClose={onClose} padded={false}>
        <Sheet.ScrollView>{children}</Sheet.ScrollView>
      </Sheet.Content>
    </Sheet>
  );
};

type ModalContentProps = PropsWithChildren<{
  style?: CrossedMethods<any>;
  focusScopeProps?: FocusScopeProps;
  removeScrollProps?: ComponentProps<typeof RemoveScroll>;
}>;
export const ModalContent = memo<ModalContentProps>(
  ({ children, style, removeScrollProps, focusScopeProps }) => {
    const localContextInstance = useContext(localContext);
    const { open, onClose } = useFloatingContext();

    const { size, idRef, showSheet } = localContextInstance;

    useKeyDown({ Escape: onClose }, { enable: open });

    return (
      <Floating.Portal>
        <localContext.Provider value={localContextInstance}>
          {showSheet ? (
            <SheetComponent>{children}</SheetComponent>
          ) : (
            <RemoveScroll
              enabled={open}
              {...removeScrollProps}
              style={composeStyles(
                open && positionStyles.absoluteFill,
                open && inlineStyle(() => ({ base: { display: 'flex' } })),
                open && justifyContentStyle.center,
                open && alignItemsStyle.center,
                removeScrollProps?.style
              )}
            >
              <Floating.Overlay />
              <FocusScope trapped={open} enabled={open} {...focusScopeProps}>
                <Floating.Content
                  role="dialog"
                  aria-labelledby={`${idRef}-title`}
                  aria-describedby={`${idRef}-description`}
                  aria-hidden={!open}
                  entering={FadeIn}
                  exiting={FadeOut}
                  style={composeStyles(
                    modalStyles.content,
                    styles.default,
                    styles[size],
                    style
                  )}
                >
                  {children}
                </Floating.Content>
              </FocusScope>
            </RemoveScroll>
          )}
        </localContext.Provider>
      </Floating.Portal>
    );
  }
);
ModalContent.displayName = 'Modal.Content';
