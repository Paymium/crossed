/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useId,
  useRef,
} from 'react';
import type {
  CreateModal,
  ModalBodyComponent,
  ModalComponent,
  ModalContentComponent,
  ModalContext,
  ModalOverlayComponent,
  ModalPortalComponent,
  ModalTitleComponent,
  ModalTriggerComponent,
} from './types';
import { composeEventHandlers, useUncontrolled } from '@crossed/core';
import { Pressable, Text, View } from 'react-native';
import { Portal } from '@gorhom/portal';
import { Focus, useEscape } from './Focus';

export * from './types';

export const createModal: CreateModal = () => {
  const modalContext = createContext<ModalContext>({} as ModalContext);

  const Modal: ModalComponent = ({
    children,
    open: openProps,
    defaultOpen = false,
    onOpenChange,
  }) => {
    const titleIdRef = useRef<string>();
    const descriptionIdRef = useRef<string>();
    const [open, setOpen] = useUncontrolled({
      value: openProps,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });
    return (
      <modalContext.Provider
        value={{ open, setOpen, titleIdRef, descriptionIdRef }}
      >
        {children}
      </modalContext.Provider>
    );
  };

  const ModalContent: ModalContentComponent = (props) => {
    const { titleIdRef, descriptionIdRef, setOpen } = useContext(modalContext);
    const escapeProps = useEscape(() => setOpen(false));
    return (
      <View
        role="dialog"
        aria-modal
        aria-labelledby={titleIdRef.current}
        aria-describedby={descriptionIdRef.current}
        {...props}
        {...escapeProps}
      />
    );
  };

  const ModalOverlay: ModalOverlayComponent = ({
    closeOnPress = true,
    ...props
  }) => {
    const { setOpen } = useContext(modalContext);
    const onPress = useCallback(() => {
      setOpen(false);
    }, [setOpen]);
    return (
      <Pressable
        {...(props as any)}
        disabled={!closeOnPress}
        focusable={false}
        aria-hidden
        {...{ tabIndex: '-1' }}
        onPress={composeEventHandlers(props.onPress, onPress)}
      />
    );
  };

  const ModalTitle: ModalTitleComponent = ({
    nativeID,
    id: idProps,
    ...props
  }) => {
    const { titleIdRef } = useContext(modalContext);
    const localId = useId();
    const id = idProps || nativeID || `modal-title${localId}`;
    titleIdRef.current = id;
    return <Text {...props} id={id} />;
  };

  const ModalBody: ModalBodyComponent = ({
    nativeID,
    id: idProps,
    ...props
  }) => {
    const { descriptionIdRef } = useContext(modalContext);
    const localId = useId();
    const id = idProps || nativeID || `modal-body${localId}`;
    descriptionIdRef.current = id;
    return <View {...props} id={id} />;
  };

  const ModalPortal: ModalPortalComponent = ({ children, ...props }) => {
    const context = useContext(modalContext);
    return (
      <Portal>
        <modalContext.Provider value={context}>
          <Focus open={context.open} {...props}>
            {children}
          </Focus>
        </modalContext.Provider>
      </Portal>
    );
  };

  const ModalTrigger: ModalTriggerComponent = ({
    children,
    asChild = false,
    ...props
  }) => {
    const { open, setOpen } = useContext(modalContext);
    const onPressOut = useCallback(() => {
      setOpen(!open);
    }, [open, setOpen]);
    return asChild && isValidElement(children) ? (
      cloneElement(children, {
        role: 'button',
        ...props,
        onPressOut: composeEventHandlers(props.onPressOut, onPressOut),
      } as any)
    ) : (
      <Pressable
        role="button"
        {...props}
        onPressOut={composeEventHandlers(props.onPressOut, onPressOut)}
        onPress={composeEventHandlers(props.onPress, () => {})}
      >
        {children}
      </Pressable>
    );
  };

  return {
    modalContext,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalTitle,
    ModalTrigger,
    ModalPortal,
    ModalBody,
  };
};

const {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalTitle,
  ModalTrigger,
  ModalPortal,
  ModalBody,
} = createModal();

export {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalTitle,
  ModalTrigger,
  ModalPortal,
  ModalBody,
};
