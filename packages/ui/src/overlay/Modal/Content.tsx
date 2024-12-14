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
  useRef,
} from 'react';
import { Floating } from '../Floating';
import { composeStyles, CrossedMethods } from '@crossed/styled';
import { modalStyles } from '../styles';
import { createStyles } from '@crossed/styled';
import { localContext } from './context';
import { sheetContext, useSheetContext } from '../Sheet/context';
import { Sheet } from '../Sheet';
import { useFloatingContext } from '../Floating/context';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { FocusScope } from '../../other/FocusScope';

const styles = createStyles(() => ({
  default: {
    base: { maxHeight: '95%', alignSelf: 'center' },
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

type ModalContentProps = PropsWithChildren<{ style?: CrossedMethods<any> }>;
export const ModalContent = memo<ModalContentProps>(({ children, style }) => {
  // const [visibility, setVisibility] = useState(false);
  const localContextInstance = useContext(localContext);
  const sheetContextValue = useSheetContext();
  const { open, onClose } = useFloatingContext();

  const { size, idRef, showSheet } = localContextInstance;

  useKeyDown({ Escape: onClose }, { enable: open });

  return (
    <Floating.Portal>
      <localContext.Provider value={localContextInstance}>
        <sheetContext.Provider value={sheetContextValue}>
          {showSheet ? (
            <SheetComponent>{children}</SheetComponent>
          ) : (
            <>
              <Floating.Overlay />
              <FocusScope trapped={open} enabled={open}>
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
            </>
          )}
        </sheetContext.Provider>
      </localContext.Provider>
    </Floating.Portal>
  );
});
ModalContent.displayName = 'Modal.Content';
