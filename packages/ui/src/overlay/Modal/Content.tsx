/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  KeyboardEventHandler,
  memo,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
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
import { Focus } from './Focus';
import {
  alignItemsStyle,
  justifyContentStyle,
  positionStyles,
} from '../../styles';

export const modalStyles = createStyles(({ colors, space }) => ({
  content: {
    base: {
      zIndex: 100000,
      borderRadius: 16,
      backgroundColor: colors.background.secondary,
      paddingVertical: space.xl,
      margin: 'auto',
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

const SheetComponent = ({
  children,
  style,
}: PropsWithChildren<{ style?: CrossedMethods<any> }>) => {
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
      <Sheet.Content onClose={onClose} containerStyle={style}>
        {children}
      </Sheet.Content>
    </Sheet>
  );
};

type ModalContentProps = PropsWithChildren<{
  style?: CrossedMethods<any>;
}>;
export const ModalContent = memo<ModalContentProps>(({ children, style }) => {
  const localContextInstance = useContext(localContext);
  const { open, onClose } = useFloatingContext();

  const { size, idRef, showSheet } = localContextInstance;

  const PortalComp = useMemo(
    () => (showSheet ? Sheet : Floating.Portal),
    [showSheet]
  );

  useKeyDown({ Escape: onClose }, { enable: open });
  return (
    <PortalComp>
      <localContext.Provider value={localContextInstance}>
        {showSheet ? (
          <SheetComponent style={style}>{children}</SheetComponent>
        ) : (
          <>
            <Focus
              onEscapeKey={onClose}
              onClickOutside={onClose}
              enabled={open}
              {...composeStyles(
                open && positionStyles.absoluteFill,
                open && inlineStyle(() => ({ base: { display: 'flex' } })),
                open && justifyContentStyle.center,
                open && alignItemsStyle.center
              ).className()}
            >
              <Floating.Overlay />
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
            </Focus>
          </>
        )}
      </localContext.Provider>
    </PortalComp>
  );
});
ModalContent.displayName = 'Modal.Content';
