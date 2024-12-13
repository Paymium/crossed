/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  KeyboardEventHandler,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Floating } from '../Floating';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { modalStyles } from '../styles';
import { createStyles } from '@crossed/styled';
import { localContext } from './context';
import { YBoxProps } from '../../layout/YBox';
import { sheetContext, useSheetContext } from '../Sheet/context';
import { Sheet } from '../Sheet';
import { useFloatingContext } from '../Floating/context';
import {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { FocusScope } from '../../other/FocusScope';

const styles = createStyles(() => ({
  default: { base: { maxHeight: '95%' } },
  sm: {
    media: {
      xs: { width: '90%', maxHeight: '90%' },
      md: { maxWidth: 560, height: 'auto' },
    },
  },
  md: {
    media: {
      xs: { width: '90%', maxHeight: '90%' },
      md: { maxWidth: 760, height: 'auto' },
    },
  },
  lg: {
    media: {
      xs: { width: '90%', maxHeight: '90%' },
      md: { maxWidth: 1024, height: 'auto' },
    },
  },
}));

export type ModalOnKeyDown = KeyboardEventHandler<HTMLButtonElement>;

export const useKeyDown = (keyEvent, { enable }) => {
  const onKeyDown = useCallback(
    (e: DocumentEventMap['keydown']) => {
      keyEvent[e.key]?.();
    },
    [keyEvent]
  );

  useEffect(() => {
    if (enable) {
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
  const refSheet = useRef(null);
  useEffect(() => {
    if (open) {
      refSheet.current.show();
    } else {
      refSheet.current.hide();
    }
  }, [open]);
  return (
    <Sheet ref={refSheet}>
      <Sheet.Content onClose={onClose}>{children}</Sheet.Content>
    </Sheet>
  );
};

export const ModalContent = ({ children }: YBoxProps) => {
  // const [visibility, setVisibility] = useState(false);
  const localContextInstance = useContext(localContext);
  const sheetContextValue = useSheetContext();
  const { open, onClose } = useFloatingContext();

  const { size, showSheet, idRef } = localContextInstance;

  const Provider = useCallback(
    ({ children: c }: PropsWithChildren) => {
      return (
        <localContext.Provider value={localContextInstance}>
          <sheetContext.Provider value={sheetContextValue}>
            {c}
          </sheetContext.Provider>
        </localContext.Provider>
      );
    },
    [localContextInstance, sheetContextValue]
  );

  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: withTiming(open ? 1 : 0) };
  }, [open]);

  useKeyDown({ Escape: onClose }, { enable: open });

  return (
    <Floating.Portal
      style={inlineStyle(() => ({
        base: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }))}
      Provider={Provider}
    >
      {showSheet ? (
        <SheetComponent>{children}</SheetComponent>
      ) : (
        <>
          <Floating.Overlay
            animatedProps={{ exiting: FadeOut, entering: FadeIn }}
          />
          <FocusScope trapped={open} enabled={open}>
            <Floating.Content
              role="dialog"
              aria-labelledby={`${idRef}-title`}
              aria-describedby={`${idRef}-description`}
              aria-hidden={!open}
              animatedStyle={animatedStyle}
              style={composeStyles(
                !showSheet && modalStyles.content,
                !showSheet && styles.default,
                !showSheet && styles[size]
              )}
            >
              {children}
            </Floating.Content>
          </FocusScope>
        </>
      )}
    </Floating.Portal>
  );
};
ModalContent.displayName = 'Modal.Content';
