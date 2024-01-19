/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { PropsWithChildren } from 'react';

declare module 'react-native' {
  interface PressableStateCallbackType {
    hovered?: boolean;
    focused?: boolean;
  }
  interface ViewStyle {
    transitionProperty?: string;
    transitionDuration?: string;
  }
  interface TextProps {
    accessibilityComponentType?: never;
    accessibilityTraits?: never;

    href?: string;
    hrefAttrs?: {
      rel?: 'noreferrer';
      target?: '_blank';
    };
  }
  interface ViewProps extends PropsWithChildren {
    accessibilityRole?: string;
    href?: string;
    hrefAttrs?: {
      rel?: 'noreferrer';
      target?: '_blank';
    };
    onClick?: (_e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  }
}
