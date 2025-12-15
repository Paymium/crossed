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
import { ContentProps } from '../Sheet/Content';
import { composeEventHandlers } from '@crossed/core';

export const modalStyles = createStyles(({ colors, space }) => ({
  content: {
    base: {
      zIndex: 100000,
      borderRadius: 16,
      backgroundColor: colors.background.secondary,
      paddingVertical: space['4xl'],
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
  containerStyle,
  ...sheetProps
}: PropsWithChildren<
  Omit<ContentProps, 'containerStyle'> & {
    containerStyle?: CrossedMethods<any>;
  }
>) => {
  const { open, onClose } = useFloatingContext();
  const { showSheet, closable } = useContext(localContext);
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
      <Sheet.Content
        closable={typeof closable === 'boolean' ? closable : undefined}
        closeOnTouchBackdrop={
          typeof closable === 'boolean'
            ? undefined
            : closable.closeOnTouchBackdrop
        }
        {...sheetProps}
        onClose={composeEventHandlers(onClose, sheetProps?.onClose, {
          checkForDefaultPrevented: false,
        })}
        containerStyle={containerStyle}
      >
        {children}
      </Sheet.Content>
    </Sheet>
  );
};

type ModalContentProps = PropsWithChildren<{
  style?: CrossedMethods<any>;
  sheetProps?: ContentProps;
}>;
export const ModalContent = memo<ModalContentProps>(
  ({ children, style, sheetProps }) => {
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
            <SheetComponent
              {...sheetProps}
              containerStyle={composeStyles(style, sheetProps?.containerStyle)}
            >
              {children}
            </SheetComponent>
          ) : (
            <>
              <Focus
                onEscapeKey={onClose}
                onClickOutside={onClose}
                enabled={open}
                style={composeStyles(
                  open && positionStyles.absoluteFill,
                  open && inlineStyle(() => ({ base: { display: 'flex' } })),
                  open && justifyContentStyle.center,
                  open && alignItemsStyle.center
                )}
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
  }
);
ModalContent.displayName = 'Modal.Content';
