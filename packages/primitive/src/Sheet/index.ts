import type { ComponentType, PropsWithChildren } from 'react';
import { createSheetMain } from './Sheet';
import { withStaticProperties } from '@crossed/core';
import { createSheetTrigger } from './SheetTrigger';
import { createSheetContent } from './SheetContent';
import { createSheetPortal } from './SheetPortal';
import { createSheetOverlay } from './SheetOverlay';
import { createSheetHandle } from './SheetHandle';
import type { PressableProps } from 'react-native';
export { useContext as useSheetContext } from './context';

export const createSheet = <
  RootProps extends Record<string, any>,
  TriggerProps extends Record<string, any>,
  ContentProps extends Record<string, any>,
  PortalProps extends Record<string, any>,
  OverlayProps extends Record<string, any>,
  HandleProps extends PressableProps
>(components: {
  Root: ComponentType<RootProps>;
  Trigger: ComponentType<TriggerProps>;
  Content: ComponentType<ContentProps>;
  Portal: ComponentType<PropsWithChildren<PortalProps>>;
  Overlay: ComponentType<OverlayProps>;
  Handle: ComponentType<HandleProps>;
}) => {
  const { Root, Trigger, Content, Portal, Overlay, Handle } = components;
  const Sheet = createSheetMain(Root);
  const SheetTrigger = createSheetTrigger(Trigger);
  const SheetContent = createSheetContent(Content);
  const SheetOverlay = createSheetOverlay(Overlay);
  const SheetPortal = createSheetPortal(Portal);
  const SheetHandle = createSheetHandle(Handle);

  Sheet.displayName = 'Sheet';
  SheetTrigger.displayName = 'Sheet.Trigger';
  SheetContent.displayName = 'Sheet.Content';
  SheetOverlay.displayName = 'Sheet.Overlay';
  SheetPortal.displayName = 'Sheet.Portal';
  SheetHandle.displayName = 'Sheet.Handle';

  return withStaticProperties(Sheet, {
    Trigger: SheetTrigger,
    Content: SheetContent,
    Portal: SheetPortal,
    Overlay: SheetOverlay,
    Handle: SheetHandle,
  });
};
