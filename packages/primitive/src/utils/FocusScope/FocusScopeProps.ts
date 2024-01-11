import type { ForwardedRef, KeyboardEvent, ReactNode } from 'react';

export interface FocusScopeProps {
  /**
   * @default true
   */
  enabled?: boolean;

  /**
   * When `true`, tabbing from last item will focus first tabbable
   * and shift+tab from first item will focus last tababble.
   * @default false
   */
  loop?: boolean;

  /**
   * When `true`, focus cannot escape the focus scope via keyboard,
   * pointer, or a programmatic focus.
   * @default false
   */
  trapped?: boolean;

  /**
   * Event handler called when auto-focusing on mount.
   * Can be prevented.
   */
  onMountAutoFocus?: (_event: Event) => void;

  /**
   * Event handler called when auto-focusing on unmount.
   * Can be prevented.
   */
  onUnmountAutoFocus?: (_event: Event) => void;

  /**
   * If unmount is animated, you want to force re-focus at start of animation not after
   */
  forceUnmount?: boolean;

  children?:
    | ReactNode
    | ((_props: {
        onKeyDown: (_event: KeyboardEvent) => void;
        tabIndex: number;
        ref: ForwardedRef<any>;
      }) => ReactNode);
}
