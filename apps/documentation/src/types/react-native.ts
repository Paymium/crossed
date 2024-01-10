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
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  }
}
