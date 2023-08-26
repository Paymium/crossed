import type { ComponentType, PropsWithChildren } from 'react';
import { createSheetMain } from './Sheet';
import { withStaticProperties } from '@crossed/core';
import { createSheetTrigger } from './SheetTrigger';
import { createSheetContent } from './SheetContent';
import { createSheetPortal } from './SheetPortal';
import { createSheetOverlay } from './SheetOverlay';

export const createSheet = <
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
  const Sheet = createSheetMain(Root);
  const SheetTrigger = createSheetTrigger(Trigger);
  const SheetContent = createSheetContent(Content);
  const SheetOverlay = createSheetOverlay(Overlay);
  const SheetPortal = createSheetPortal(Portal);

  Sheet.displayName = 'Sheet';
  SheetTrigger.displayName = 'Sheet.Trigger';
  SheetContent.displayName = 'Sheet.Content';
  SheetOverlay.displayName = 'Sheet.Overlay';
  SheetPortal.displayName = 'Sheet.Portal';

  return withStaticProperties(Sheet, {
    Trigger: SheetTrigger,
    Content: SheetContent,
    Portal: SheetPortal,
    Overlay: SheetOverlay,
  });
};
