/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type {
  ComponentType,
  KeyboardEventHandler,
  MutableRefObject,
  PropsWithChildren,
} from 'react';
import type { PressableProps, TextProps, ViewProps } from 'react-native';
import type { VisibilityHiddenProps } from '../VisibilityHidden';

export type ModalProps = PropsWithChildren<{
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (_o: boolean) => void;
}>;
export type ModalOverlayProps = PressableProps & { closeOnPress?: boolean };
export type ModalContentProps = ViewProps;
export type ModalBodyProps = ViewProps;
export type ModalTitleProps = TextProps;
export type ModalTriggerProps = PressableProps & { asChild?: boolean };
export type ModalPortalProps = PropsWithChildren;
export type FocusProps = VisibilityHiddenProps & { open?: boolean };

export type ModalComponent = ComponentType<ModalProps>;
export type ModalOverlayComponent = ComponentType<ModalOverlayProps>;
export type ModalContentComponent = ComponentType<ModalContentProps>;
export type ModalBodyComponent = ComponentType<ModalBodyProps>;
export type ModalTitleComponent = ComponentType<ModalTitleProps>;
export type ModalTriggerComponent = ComponentType<ModalTriggerProps>;
export type ModalPortalComponent = ComponentType<VisibilityHiddenProps>;

export type ModalFocusComponent = ComponentType<FocusProps>;

export type ModalContext = Required<Pick<ModalProps, 'open'>> & {
  setOpen: (_value: boolean) => void;
  titleIdRef: MutableRefObject<string | undefined>;
  descriptionIdRef: MutableRefObject<string | undefined>;
};

export type CreateModal = () => {
  Modal: ModalComponent;
  ModalOverlay: ModalOverlayComponent;
  ModalContent: ModalContentComponent;
  ModalTitle: ModalTitleComponent;
  ModalTrigger: ModalTriggerComponent;
  ModalPortal: ModalPortalComponent;
  ModalBody: ModalBodyComponent;
};

export type ModalOnKeyDown = KeyboardEventHandler<HTMLButtonElement>;

export type UseEscape = (_e: () => void) => {
  onKeyDown: ModalOnKeyDown;
};
