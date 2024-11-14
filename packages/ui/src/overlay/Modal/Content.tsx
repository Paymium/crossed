/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  Children,
  KeyboardEventHandler,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { Key } from 'ts-key-enum';
import { Floating } from '../Floating';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { modalStyles } from '../styles';
import { createStyles } from '@crossed/styled';
import { localContext } from './context';
import { YBoxProps } from '../../layout/YBox';
import { ScrollView as SV } from '../../other/ScrollView';
import { sheetContext, useSheetContext } from '../Sheet/context';
import { ModalHeader } from './Header';
import { ModalBody } from './Body';
import { ModalFooter } from './Footer';
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

export type UseKeyDown = (
  // eslint-disable-next-line no-unused-vars
  _e: { [_key in keyof typeof Key]?: () => void },
  _config: { enable?: boolean }
) => void;
export const useKeyDown: UseKeyDown = (keyEvent, { enable }) => {
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
  }, [onKeyDown, enable]);
};

export const ModalContent = ({ children }: YBoxProps) => {
  // const [visibility, setVisibility] = useState(false);
  const localContextInstance = useContext(localContext);
  const sheetContextValue = useSheetContext();
  const { open, onClose } = useFloatingContext();

  const { size, showSheet, stickyFooter, stickyHeader, idRef } =
    localContextInstance;

  const title = useMemo(() => {
    if (!children || typeof children === 'number') return null;
    return Children.toArray(children).find(
      (e) => typeof e === 'object' && 'type' in e && e.type === ModalHeader
    );
  }, [children]);

  const body = useMemo(() => {
    if (!children || typeof children === 'number') return null;
    return Children.toArray(children).find(
      (e) => typeof e === 'object' && 'type' in e && e.type === ModalBody
    );
  }, [children]);

  const footer = useMemo(() => {
    if (!children || typeof children === 'number') return null;
    return Children.toArray(children).find(
      (e) => typeof e === 'object' && 'type' in e && e.type === ModalFooter
    );
  }, [children]);

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
        <Sheet.Content
          role="dialog"
          aria-labelledby={`${idRef}-title`}
          aria-describedby={`${idRef}-description`}
        >
          <Sheet.Title>{title}</Sheet.Title>
          {body}
          <Sheet.Footer>{footer}</Sheet.Footer>
        </Sheet.Content>
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
              animatedStyle={animatedStyle}
              style={composeStyles(
                !showSheet && modalStyles.content,
                !showSheet && styles.default,
                !showSheet && styles[size]
              )}
            >
              <SV
                containerProps={{
                  style: inlineStyle(() => ({ base: { flex: 1 } })),
                }}
                stickyHeader={stickyHeader}
                stickyFooter={stickyFooter}
              >
                <SV.Title>{title}</SV.Title>
                <SV.Body>{body}</SV.Body>
                <SV.Footer>{footer}</SV.Footer>
              </SV>
            </Floating.Content>
          </FocusScope>
        </>
      )}
    </Floating.Portal>
  );
};
ModalContent.displayName = 'Modal.Content';
