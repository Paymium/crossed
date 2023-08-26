import { withStaticProperties } from '@crossed/core';
import type { ComponentType } from 'react';

export const createPortal = <P,>(PortalRoot: ComponentType<P>) => {
  PortalRoot.displayName = 'Portal';

  return withStaticProperties(PortalRoot, {});
};
