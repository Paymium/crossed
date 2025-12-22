/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  forwardRef,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  BackHandler,
  NativeEventSubscription,
  Keyboard,
} from 'react-native';
import BottomSheetBase, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { styles as SheetStyles } from './styles';
import EventManager, { actionSheetEventManager } from './eventmanager';
import {
  Route,
  RouterContext,
  RouterParamsContext,
  useRouter,
} from './hooks/use-router';
import useSheetManager from './hooks/use-sheet-manager';
import {
  useProviderContext,
  useSheetIDContext,
  useSheetPayload,
  useSheetRef,
} from './provider';
import { getZIndexFromStack, SheetManager } from './sheetmanager';
import type { BottomSheetProps, BottomSheetRef } from './types';

export default forwardRef<BottomSheetRef, BottomSheetProps>(
  function BottomSheet(
    {
      // animated = true,
      closeOnPressBack = true,
      elevation = 5,
      defaultOverlayOpacity = 0.3,
      overlayColor = 'black',
      closable = true,
      closeOnTouchBackdrop = true,
      onTouchBackdrop,
      gestureEnabled = false,
      isModal = true,
      snapPoints = [100],
      initialSnapIndex = 0,
      zIndex = 999,
      keyboardHandlerEnabled = true,
      ExtraOverlayComponent,
      payload,
      routes,
      initialRoute,
      onBeforeShow,
      enableRouterBackNavigation,
      onBeforeClose,
      // enableGesturesInScrollView = true,
      CustomHeaderComponent,
      containerStyle,
      indicatorStyle,
      onOpen,
      onClose,
      onChange,
      onSnapIndexChange,
      backdropProps,
      ...props
    },
    ref
  ) {
    // Ensure snapPoints has 100
    snapPoints =
      snapPoints[snapPoints.length - 1] !== 100
        ? [...snapPoints, 100]
        : snapPoints;

    // Convert percentage snap points to strings for @gorhom/bottom-sheet
    const convertedSnapPoints = useMemo(
      () => snapPoints.map((point) => `${point}%`),
      [snapPoints]
    );

    const currentContext = useProviderContext();
    const sheetIdFromContext = useSheetIDContext();
    const sheetId = props.id || sheetIdFromContext;
    const sheetRef = useSheetRef();
    const sheetPayload = useSheetPayload();
    const payloadRef = useRef(payload);
    const internalEventManager = useMemo(() => new EventManager(), []);
    const bottomSheetRef = useRef<BottomSheetBase | BottomSheetModal>(null);
    const hardwareBackPressEvent = useRef<NativeEventSubscription>();
    const hiding = useRef(false);
    const closing = useRef(false);

    // Track state
    const [isOpen, setIsOpen] = useState(false);
    const [currentSnapIndex, setCurrentSnapIndex] = useState(initialSnapIndex);
    const prevSnapIndex = useRef<number>(initialSnapIndex);

    payloadRef.current = payload;

    // Router setup
    const router = useRouter({
      routes: routes,
      getRef: () => getRef(),
      initialRoute: initialRoute as string,
      onNavigate: props.onNavigate,
      onNavigateBack: props.onNavigateBack,
      routeOpacity: { current: 1 } as any, // Not needed with @gorhom/bottom-sheet
    });
    const routerRef = useRef(router);
    routerRef.current = router;

    const { visible, setVisible } = useSheetManager({
      id: sheetId,
      onHide: (data) => {
        hideSheet(undefined, data, true);
      },
      onBeforeShow: (data) => {
        routerRef.current?.initialNavigation();
        onBeforeShow?.(data as never);
      },
      onContextUpdate: () => {
        if (sheetId) {
          SheetManager.add(sheetId, currentContext);
          SheetManager.registerRef(sheetId, currentContext, {
            current: getRef(),
          } as RefObject<BottomSheetRef>);
        }
      },
    });

    const notifySnapIndexChanged = useCallback(() => {
      if (prevSnapIndex.current !== currentSnapIndex) {
        prevSnapIndex.current = currentSnapIndex;
        onSnapIndexChange?.(currentSnapIndex);
      }
    }, [currentSnapIndex, onSnapIndexChange]);

    const hideSheet = useCallback(
      (_vy?: number, data?: any, isSheetManagerOrRef?: boolean) => {
        if (hiding.current) return;
        if (!closable && !isSheetManagerOrRef) {
          return;
        }
        hiding.current = true;
        onBeforeClose?.((data || payloadRef.current || data) as never);

        closing.current = true;
        Keyboard.dismiss();

        if (isModal && 'dismiss' in bottomSheetRef.current) {
          bottomSheetRef.current?.dismiss();
        } else {
          bottomSheetRef.current?.close();
        }

        setTimeout(() => {
          if (closable || isSheetManagerOrRef) {
            setVisible(false);
            setIsOpen(false);
            onClose?.((data || payloadRef.current || data) as never);
            hiding.current = false;

            hardwareBackPressEvent.current?.remove();
            if (sheetId) {
              SheetManager.remove(sheetId, currentContext);
              hiding.current = false;
              actionSheetEventManager.publish(
                `onclose_${sheetId}`,
                data || payloadRef.current || data,
                currentContext
              );
            } else {
              hiding.current = false;
            }
            setCurrentSnapIndex(initialSnapIndex);
            closing.current = false;
          }
        }, 150);
      },
      [
        closable,
        onBeforeClose,
        setVisible,
        onClose,
        sheetId,
        currentContext,
        initialSnapIndex,
      ]
    );

    const onHardwareBackPress = useCallback(() => {
      if (
        visible &&
        enableRouterBackNavigation &&
        routerRef.current?.canGoBack()
      ) {
        routerRef.current?.goBack();
        return true;
      }
      if (visible && closable && closeOnPressBack) {
        hideSheet();
        return true;
      }
      return false;
    }, [
      closable,
      closeOnPressBack,
      hideSheet,
      enableRouterBackNavigation,
      visible,
    ]);

    useEffect(() => {
      if (Platform.OS === 'android' && visible) {
        hardwareBackPressEvent.current = BackHandler.addEventListener(
          'hardwareBackPress',
          onHardwareBackPress
        );
        return () => {
          hardwareBackPressEvent.current?.remove();
        };
      }

      return null;
    }, [visible, onHardwareBackPress]);

    const handleSheetChange = useCallback(
      (index: number) => {
        setCurrentSnapIndex(index);
        notifySnapIndexChanged();

        // Calculate offset for onChange callback
        if (onChange && bottomSheetRef.current) {
          // This is an approximation - @gorhom/bottom-sheet doesn't directly expose position
          onChange(0, 0); // You may need to enhance this
        }
      },
      [notifySnapIndexChanged, onChange]
    );

    const onTouch = useCallback(() => {
      // onTouchBackdrop?.(event);
      if (enableRouterBackNavigation && router.canGoBack()) {
        router.goBack();
        return;
      }

      if (closeOnTouchBackdrop && closable) {
        hideSheet();
      }
    }, [
      onTouchBackdrop,
      enableRouterBackNavigation,
      router,
      closeOnTouchBackdrop,
      closable,
      hideSheet,
    ]);

    const renderBackdrop = useCallback(
      (sheetProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...sheetProps}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={defaultOverlayOpacity}
          pressBehavior={closeOnTouchBackdrop ? 'close' : 'none'}
          onPress={onTouch}
          style={[sheetProps.style, { backgroundColor: overlayColor }]}
        />
      ),
      [defaultOverlayOpacity, closeOnTouchBackdrop, onTouch, overlayColor]
    );

    const renderHandle = useCallback(() => {
      if (CustomHeaderComponent) {
        return <>{CustomHeaderComponent}</>;
      }
      if (!gestureEnabled) {
        return null;
      }
      if (!closable) {
        return null;
      }
      return <View style={[SheetStyles.indicator, indicatorStyle]} />;
    }, [CustomHeaderComponent, gestureEnabled, closable, indicatorStyle]);

    const getRef = useCallback(
      (): BottomSheetRef => ({
        show: (snapIndex?: number) => {
          onBeforeShow?.();
          routerRef.current?.initialNavigation();
          setVisible(true);
          setIsOpen(true);

          if (isModal) {
            (bottomSheetRef.current as any)?.present();
            if (typeof snapIndex === 'number') {
              setCurrentSnapIndex(snapIndex);
              bottomSheetRef.current?.snapToIndex(snapIndex);
            }
          } else {
            if (typeof snapIndex === 'number') {
              setCurrentSnapIndex(snapIndex);
              bottomSheetRef.current?.snapToIndex(snapIndex);
            } else {
              bottomSheetRef.current?.expand();
            }
          }
        },
        hide: (data: any) => {
          hideSheet(undefined, data, true);
        },
        setModalVisible: (_visible?: boolean) => {
          if (_visible) {
            setVisible(true);
            setIsOpen(true);
            if (isModal) {
              (bottomSheetRef.current as any)?.present();
            } else {
              bottomSheetRef.current?.expand();
            }
          } else {
            hideSheet();
          }
        },
        snapToOffset: (offset: number) => {
          // Convert offset percentage to snap index
          const index = snapPoints.findIndex((point) => point >= offset);
          if (index >= 0) {
            bottomSheetRef.current?.snapToIndex(index);
            setCurrentSnapIndex(index);
          }
        },
        snapToRelativeOffset: (offset: number) => {
          if (offset === 0) {
            bottomSheetRef.current?.snapToIndex(currentSnapIndex);
            return;
          }
          // Calculate new position based on relative offset
          const currentPoint = snapPoints[currentSnapIndex];
          const newPoint = currentPoint + currentPoint * (offset / 100);
          const index = snapPoints.findIndex((point) => point >= newPoint);
          if (index >= 0) {
            bottomSheetRef.current?.snapToIndex(index);
            setCurrentSnapIndex(index);
          }
        },
        snapToIndex: (index: number) => {
          if (index >= snapPoints.length || index < 0) return;
          bottomSheetRef.current?.snapToIndex(index);
          setCurrentSnapIndex(index);
          notifySnapIndexChanged();
        },
        /** @deprecated 'handleChildScrollEnd has been removed. Please use `useScrollHandlers` hook to enable scrolling in BottomSheet' */
        handleChildScrollEnd: () => {
          console.warn(
            'handleChildScrollEnd has been removed. Please use `useScrollHandlers` hook to enable scrolling in BottomSheet'
          );
        },
        /** @deprecated Not needed with @gorhom/bottom-sheet */
        modifyGesturesForLayout: (_id) => {
          console.warn('Not needed with @gorhom/bottom-sheet');
        },
        currentSnapIndex: () => currentSnapIndex,
        isGestureEnabled: () => gestureEnabled,
        isOpen: () => isOpen,
        /** @deprecated @gorhom/bottom-sheet handles keyboard automatically */
        keyboardHandler: (/* enabled?: boolean */) => {
          console.warn('@gorhom/bottom-sheet handles keyboard automatically');
        },
        ev: internalEventManager,
      }),
      [
        isModal,
        onBeforeShow,
        setVisible,
        hideSheet,
        snapPoints,
        currentSnapIndex,
        notifySnapIndexChanged,
        gestureEnabled,
        isOpen,
        internalEventManager,
      ]
    );

    useImperativeHandle(ref, getRef, [getRef]);

    useEffect(() => {
      if (sheetId) {
        SheetManager.registerRef(sheetId, currentContext, {
          current: getRef(),
        } as RefObject<BottomSheetRef>);
      }
      sheetRef.current = getRef();
    }, [currentContext, getRef, sheetId, sheetRef]);

    useEffect(() => {
      if (visible && !isOpen) {
        setIsOpen(true);
        if (isModal) {
          // BottomSheetModal uses present()
          (bottomSheetRef.current as any)?.present();
        } else {
          // Regular BottomSheet uses expand()
          bottomSheetRef.current?.expand();
        }
        onOpen?.();
      }
    }, [visible, isOpen, isModal, onOpen]);

    const renderRoute = useCallback(
      (route: Route) => {
        const RouteComponent = route.component as any;
        return (
          <View
            key={route.name}
            style={{
              display:
                route.name !== router.currentRoute?.name ? 'none' : 'flex',
            }}
          >
            <RouterParamsContext.Provider value={route?.params}>
              <RouteComponent
                router={router}
                params={route?.params}
                payload={sheetPayload}
              />
            </RouterParamsContext.Provider>
          </View>
        );
      },
      [router, sheetPayload]
    );

    const content = (
      <BottomSheetView style={[styles.container, containerStyle]}>
        {router?.hasRoutes() ? (
          <RouterContext.Provider value={router}>
            {router?.stack.map(renderRoute)}
          </RouterContext.Provider>
        ) : (
          props?.children
        )}
      </BottomSheetView>
    );

    if (!visible) {
      return null;
    }

    // Mode Modale
    if (isModal) {
      return (
        <BottomSheetModal
          ref={bottomSheetRef as Ref<BottomSheetModal>}
          index={initialSnapIndex}
          snapPoints={convertedSnapPoints}
          enablePanDownToClose={closable && gestureEnabled}
          enableContentPanningGesture={gestureEnabled}
          enableHandlePanningGesture={gestureEnabled}
          backdropComponent={renderBackdrop}
          handleComponent={renderHandle}
          onChange={handleSheetChange}
          onDismiss={() => hideSheet()}
          style={[
            {
              elevation: elevation,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: elevation,
              zIndex: sheetId
                ? getZIndexFromStack(sheetId, currentContext)
                : zIndex,
            },
            containerStyle,
          ]}
          keyboardBehavior={keyboardHandlerEnabled ? 'interactive' : 'extend'}
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustResize"
        >
          {content}
        </BottomSheetModal>
      );
    }

    // Mode classic Sheet
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: sheetId
            ? getZIndexFromStack(sheetId, currentContext)
            : zIndex,
        }}
        pointerEvents="box-none"
      >
        {/* Custom backdrop for non-modal */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={onTouch}
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: overlayColor,
            opacity: isOpen ? defaultOverlayOpacity : 0,
          }}
          {...backdropProps}
        />
        <BottomSheetBase
          ref={bottomSheetRef}
          index={initialSnapIndex}
          snapPoints={convertedSnapPoints}
          enablePanDownToClose={closable && gestureEnabled}
          enableContentPanningGesture={gestureEnabled}
          enableHandlePanningGesture={gestureEnabled}
          handleComponent={renderHandle}
          onChange={handleSheetChange}
          style={[
            {
              elevation: elevation,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: elevation,
            },
            containerStyle,
          ]}
          keyboardBehavior={keyboardHandlerEnabled ? 'interactive' : 'extend'}
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustResize"
        >
          {content}
        </BottomSheetBase>
        {ExtraOverlayComponent}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
