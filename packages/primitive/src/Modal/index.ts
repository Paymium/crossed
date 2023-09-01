import type { ComponentType, PropsWithChildren } from 'react';
import { createModalMain } from './Modal';
import { withStaticProperties } from '@crossed/core';
import { createModalTrigger } from './ModalTrigger';
import { createModalContent } from './ModalContent';
import { createModalPortal } from './ModalPortal';
import { createModalOverlay } from './ModalOverlay';

export const createModal = <
  RootProps extends Record<string, any>,
  TriggerProps extends Record<string, any>,
  ContentProps extends Record<string, any>,
  PortalProps extends Record<string, any>,
  OverlayProps extends Record<string, any>
>(components: {
  Root: ComponentType<RootProps>;
  Trigger: ComponentType<TriggerProps>;
  Content: ComponentType<ContentProps>;
  Portal: ComponentType<PropsWithChildren<PortalProps>>;
  Overlay: ComponentType<OverlayProps>;
}) => {
  const { Root, Trigger, Content, Portal, Overlay } = components;
  const Modal = createModalMain(Root);
  const ModalTrigger = createModalTrigger(Trigger);
  const ModalContent = createModalContent(Content);
  const ModalOverlay = createModalOverlay(Overlay);
  const ModalPortal = createModalPortal(Portal);

  Modal.displayName = 'Modal';
  ModalTrigger.displayName = 'Modal.Trigger';
  ModalContent.displayName = 'Modal.Content';
  ModalOverlay.displayName = 'Modal.Overlay';
  ModalPortal.displayName = 'Modal.Portal';

  return withStaticProperties(Modal, {
    Trigger: ModalTrigger,
    Content: ModalContent,
    Portal: ModalPortal,
    Overlay: ModalOverlay,
  });
};
