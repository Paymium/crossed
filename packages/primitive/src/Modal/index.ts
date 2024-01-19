/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ComponentType, PropsWithChildren } from 'react';
import { createModalMain } from './Modal';
import { withStaticProperties } from '@crossed/core';
import { createModalTrigger } from './ModalTrigger';
import { createModalContent } from './ModalContent';
import { createModalPortal } from './ModalPortal';
import { createModalOverlay } from './ModalOverlay';
import { createModalTitle } from './ModalTitle';
export { useContext as useModalContext } from './context';

export const createModal = <
  RootProps extends Record<string, any>,
  TriggerProps extends Record<string, any>,
  ContentProps extends Record<string, any>,
  PortalProps extends Record<string, any>,
  OverlayProps extends Record<string, any>,
  TitleProps extends Record<string, any>,
  DescriptionProps extends Record<string, any>
>(components: {
  Root: ComponentType<RootProps>;
  Trigger: ComponentType<TriggerProps>;
  Content: ComponentType<ContentProps>;
  Portal: ComponentType<PropsWithChildren<PortalProps>>;
  Overlay: ComponentType<OverlayProps>;
  Title: ComponentType<TitleProps>;
  Description: ComponentType<DescriptionProps>;
}) => {
  const { Root, Trigger, Content, Portal, Overlay, Title, Description } =
    components;
  const Modal = createModalMain(Root);
  const ModalTrigger = createModalTrigger(Trigger);
  const ModalContent = createModalContent(Content);
  const ModalOverlay = createModalOverlay(Overlay);
  const ModalPortal = createModalPortal(Portal);
  const ModalTitle = createModalTitle(Title);
  const ModalDescription = createModalTitle(Description);

  Modal.displayName = 'Modal';
  ModalTrigger.displayName = 'Modal.Trigger';
  ModalContent.displayName = 'Modal.Content';
  ModalOverlay.displayName = 'Modal.Overlay';
  ModalPortal.displayName = 'Modal.Portal';
  ModalTitle.displayName = 'Modal.Title';
  ModalDescription.displayName = 'Modal.Description';

  return withStaticProperties(Modal, {
    Trigger: ModalTrigger,
    Content: ModalContent,
    Portal: ModalPortal,
    Overlay: ModalOverlay,
    Title: ModalTitle,
    Description: ModalDescription,
  });
};
