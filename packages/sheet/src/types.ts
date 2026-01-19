/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import {
  GestureResponderEvent,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export interface Sheets {}

type DefaultSheetDefinition = {
  payload?: any;
  returnValue?: any;
  routes?: any;
};

export type SheetDefinition<T extends DefaultSheetDefinition = any> = T;

export type BottomSheetRef<SheetId extends keyof Sheets = never> = {
  /**
   * Show the BottomSheet.
   */
  show: (_snapIndex?: number) => void;

  /**
   * Hide the BottomSheet.
   */
  hide: (_data?: Sheets[SheetId]['returnValue']) => void;

  /**
   * @deprecated Use `show` or `hide` functions or SheetManager to open/close BottomSheet.
   */
  setModalVisible: (_visible?: boolean) => void;

  /**
   * Provide a value between 0 to 100 for the action sheet to snap to.
   */
  snapToOffset: (_offset: number) => void;

  /**
   * When multiple snap points are on the bottom sheet, use this to snap it to different
   * position.
   */
  snapToIndex: (_index: number) => void;

  /**
   * @deprecated Use `useScrollHandlers` hook to enable scrolling in BottomSheet.
   */
  handleChildScrollEnd: () => void;

  /**
   * @deprecated Use snapToIndex instead.
   */
  snapToRelativeOffset: (_offset: number) => void;

  /**
   * Get the current snap index of the sheet.
   */
  currentSnapIndex: () => number;

  /**
   * @deprecated No longer needed with new gesture system.
   */
  modifyGesturesForLayout: (
    _id?: string,
    _layout?: any,
    _scrollOffset?: number
  ) => void;

  isGestureEnabled: () => boolean;
  isOpen: () => boolean;

  /**
   * @deprecated EventManager has been removed. Use callbacks (onOpen, onClose, etc.) instead.
   */
  ev: {
    publish: (..._args: any[]) => void;
    subscribe: (..._args: any[]) => () => void;
    unsubscribe: (..._args: any[]) => void;
  };

  /**
   * @deprecated Keyboard is handled automatically now.
   */
  keyboardHandler: (_enabled?: boolean) => void;
};

export type BottomSheetProps<SheetId extends keyof Sheets = never> = {
  children?: React.ReactNode;
  /**
   * A unique id for the BottomSheet. Defining this is optional. Usually when you register
   * a sheet with `registerSheet()` it's id get automatically assigned.
   *
   */
  id?: SheetId | (string & {});
  /**
   * Animate the opening and closing of BottomSheet.
   *
   * Default: `true`
   */
  animated?: boolean;

  /**
   * Choose how far off the user needs to drag the bottom sheet to make it snap to next point. The default is `50` which means
   * that user needs to drag the sheet up or down at least 50 display pixels for it to close or move to next snap point.
   * Otherwise it will just return to the initial position.
   *
   * Default: `50`
   */
  springOffset?: number;

  /**
   * When the bottom sheet is pulled beyond top position, it overdraws and bounces back. Set this to false if you need to disable this behaviour.
   */
  overdrawEnabled?: boolean;
  /**
   * Set how quickly the sheet will overdraw on pulling beyond top position. A lower value means faster overdraw.
   *
   * Default: `15`
   */
  overdrawFactor?: number;

  /**
   * Set the height of the overdraw View. If you set the `overdrawFactor` to a lower value, you should increase the size of the overdraw
   * to prevent the action sheet from showing background views etc.
   *
   * Default : `100`
   */
  overdrawSize?: number;

  /**
   * @deprecated Animation config is no longer customizable. Use the built-in spring configuration.
   */
  openAnimationConfig?: any;
  /**
   * @deprecated Animation config is no longer customizable. Use the built-in spring configuration.
   */
  closeAnimationConfig?: any;
  /**
   * Provide snap points ranging from 0 to 100. BottomSheet will snap between these points. If no snap points
   * are provided, the default is a single snap point set to `100` which means that the sheet will be opened
   * 100% on becoming visible.
   */
  snapPoints?: number[];
  /**
   * When you have set the `snapPoints` prop. You can use this prop to set the inital snap point for the sheet. For example
   * if i have snap points set to `[30,60,100]` then setting this prop to `1` would mean the bottom sheet will snap to 60% on
   * becoming visible.
   */
  initialSnapIndex?: number;

  /**
   * Enable background interation. This way the user will be able to interact with the screen in background of the action sheet
   * when it is opened.
   */
  backgroundInteractionEnabled?: boolean;

  /**
   * The action sheet uses it's own keyboard handling. Set this prop to `false` to disable it if needed.
   */
  keyboardHandlerEnabled?: boolean;

  /**
   * Add elevation to the BottomSheet container.
   *
   * Default: `5`
   */
  elevation?: number;

  /**
   * Since `SheetManager.show` is now awaitable. You can return some data
   * to the caller by setting this prop. When the Sheet closes
   * the promise will resolve with the data.
   *
   * Note: It is however recommended to pass desired data via `SheetManager.hide` or `ref.hide`
   * functions intead to avoid unnecessary rerenders when closing the sheet.
   */
  payload?: Sheets[SheetId]['returnValue'];

  /**
   * Style the top indicator bar in BottomSheet.
   */
  indicatorStyle?: ViewStyle;

  /**
   * Color of the overlay/backdrop.
   *
   * Default: `"black"`
   */
  overlayColor?: string;

  /**
   * Keep the header always visible even when gestures are disabled.
   *
   * Default: `false`
   */
  headerAlwaysVisible?: boolean;

  /**
   * Your custom header component. Using this will hide the default indicator.
   * */
  CustomHeaderComponent?: React.ReactNode;

  /**
   * Any custom styles for the container.
   * */
  containerStyle?: ViewStyle;

  /**
   * Control closing BottomSheet by touching on backdrop.
   *
   * Default: `true`
   */
  closeOnTouchBackdrop?: boolean;

  /**
   * Callback when user touches the backdrop. Includes the GestureResponderEvent.
   *
   * Default: undefined
   */
  onTouchBackdrop?: (_event: GestureResponderEvent) => void;

  /**
   * Render a component over the BottomSheet. Useful for rendering
   * Toast components with which user can interact. Should be `absolutely` positioned.
   *
   * */

  ExtraOverlayComponent?: React.ReactNode;

  /**
   * If any of the action sheets in a nested SheetProvider is not a modal, i.e uses `isModal={false}` then you must define
   * the provider with this prop. This allows the action sheet to be rendered correctly in fullscreen.
   *
   * */

  withNestedSheetProvider?: React.ReactNode;

  /**
   * Will the BottomSheet close on `hardwareBackPress` event.
   *
   * Default: `true`
   */
  closeOnPressBack?: boolean;
  /**
   * Default opacity of the overlay/backdrop.
   *
   * Default: `0.3`
   */
  defaultOverlayOpacity?: number;

  /**
   * Enables gesture control of BottomSheet.
   *
   * Default: `false`
   */
  gestureEnabled?: boolean;

  /**
   * Determine whether the modal should go under the system statusbar.
   *
   * Default: `true`
   */
  statusBarTranslucent?: boolean;

  /**
   * Prevent BottomSheet from closing on
   * gesture or tapping on backdrop.
   * Instead snap it to `bottomOffset` location
   *
   * */
  closable?: boolean;

  /**
   * Allow BottomSheet to draw under the StatusBar.
   * This is enabled by default.
   *
   * Default: `true`
   */
  drawUnderStatusBar?: boolean;

  /**
   * Set this to false to use a View instead of a Modal to show Sheet.
   */
  isModal?: boolean;

  /**
   * The default zIndex of wrapper `View` when `isModal` is set to false or background interaction is enabled is 9999. You can change it here.
   */

  zIndex?: number;

  /**
   * Test ID for sheet modal.
   *
   * @deprecated Use `testIDs.modal` instead.
   */
  testID?: string;

  /**
   * Test id for various sheet components for testing
   */
  testIDs?: {
    /**
     * Test id for backdrop. Can be used to close sheet in e2e tests.
     */
    backdrop?: string;
    /**
     * Test id for the modal
     */
    modal?: string;

    /**
     * Test id for the container that wraps all your components inside the sheet.
     */
    sheet?: string;
    /**
     * Test id for the root container when `isModal` is set to `false`.
     */
    root?: string;
  };

  /**
   * Apply padding to bottom based on device safe area insets.
   */
  useBottomSafeAreaPadding?: boolean;

  /**
   * Event called when the BottomSheet closes.
   *
   * */

  onClose?: (_data?: Sheets[SheetId]['returnValue']) => void;

  /**
   * Event called before BottomSheet opens. This is called only when using `SheetManager`.
   */
  onBeforeShow?: (_data?: Sheets[SheetId]['payload']) => void;

  onBeforeClose?: (_data?: Sheets[SheetId]['returnValue']) => void;

  /**
   * An event called when the BottomSheet Opens.
   *
   * */
  onOpen?: () => void;

  /**
   * Event called when the position of the BottomSheet changes. When the `position` value is 0, it means that the BottomSheet has reached top.
   */
  onChange?: (_position: number, _height: number) => void;

  /**
   * additional props to pass to the backdrop element. Useful for adding custom accessibility props.
   */
  backdropProps?: Partial<TouchableOpacityProps>;

  /**
   * Default safeArea insets provided through a library such as
   * react-native-safe-area-insets. This also helps in giving a tiny boost
   * in performance as the sheet does not have to calculate insets anymore.
   */
  safeAreaInsets?: { top: number; left: number; right: number; bottom: number };
  /**
   * @deprecated Router system has been removed. Manage multiple screens with state instead.
   */
  routes?: any[];
  /**
   * @deprecated Router system has been removed.
   */
  onNavigate?: (_route: string) => void;
  /**
   * @deprecated Router system has been removed.
   */
  onNavigateBack?: (_route: string) => void;
  /**
   * @deprecated Router system has been removed.
   */
  initialRoute?: any;
  /**
   * @deprecated Router system has been removed.
   */
  enableRouterBackNavigation?: boolean;
  /**
   * @deprecated This prop is no longer needed. Use gestureEnabled={false} for scrollable content.
   */
  enableGesturesInScrollView?: boolean;

  onSnapIndexChange?: (_index: number) => void;

  /**
   * When `closable=false`, set this to true to not allow
   * sheet to go beyond minimum snap point position with drag.
   */
  disableDragBeyondMinimumSnapPoint?: boolean;
};

// Backwards compatibility type aliases
/** @deprecated Use BottomSheetRef instead */
export type ActionSheetRef<SheetId extends keyof Sheets = never> =
  BottomSheetRef<SheetId>;

/** @deprecated Use BottomSheetProps instead */
export type ActionSheetProps<SheetId extends keyof Sheets = never> =
  BottomSheetProps<SheetId>;
