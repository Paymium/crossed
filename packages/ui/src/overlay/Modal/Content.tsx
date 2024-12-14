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
import { composeStyles, CrossedMethods, isWeb } from '@crossed/styled';
import { modalStyles } from '../styles';
import { createStyles } from '@crossed/styled';
import { localContext } from './context';
import { Sheet } from '../Sheet';
import { useFloatingContext } from '../Floating/context';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { FocusScope } from '../../other/FocusScope';
import { RemoveScroll } from '../../other';

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

export const useKeyDown = (keyEvent, { enable }) => {
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
  const refSheet = useRef(null);
  useEffect(() => {
    if (showSheet) {
      if (open) {
        refSheet.current.show();
      } else {
        refSheet.current.hide();
      }
    }
  }, [open, showSheet]);
  return (
    <Sheet ref={refSheet}>
      <Sheet.Content onClose={onClose}>{children}</Sheet.Content>
    </Sheet>
  );
};

type ModalContentProps = PropsWithChildren<{ style?: CrossedMethods<any> }>;
export const ModalContent = memo<ModalContentProps>(({ children, style }) => {
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
          <>
            <Floating.Overlay />
            <RemoveScroll enabled={open}>
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
            </RemoveScroll>
          </>
        )}
      </localContext.Provider>
    </Floating.Portal>
  );
});
ModalContent.displayName = 'Modal.Content';
