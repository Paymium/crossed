/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Platform,
  BackHandler,
  NativeEventSubscription,
  Keyboard,
  Modal,
  StyleSheet,
  View,
} from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { Backdrop } from './components/Backdrop';
import { BottomSheetContent } from './BottomSheetContent';
import {
  useBottomSheetAnimations,
  useBackdropAnimation,
  animateToSnapPoint,
  animateToClose,
} from './core/hooks';
import { createBottomSheetGesture } from './core/gestures';
import useSheetManager from './hooks/use-sheet-manager';
import { useProviderContext, useSheetIDContext, useSheetRef } from './provider';
import { getZIndexFromStack, SheetManager } from './sheetmanager';
import type { BottomSheetProps, BottomSheetRef } from './types';

export default forwardRef<BottomSheetRef, BottomSheetProps>(
  function BottomSheet(
    {
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
      payload,
      onBeforeShow,
      onBeforeClose,
      CustomHeaderComponent,
      containerStyle,
      indicatorStyle,
      onOpen,
      onClose,
      onChange,
      onSnapIndexChange,
      backdropProps,
      children,
      ...props
    },
    ref
  ) {
    // Ensure snapPoints has 100
    snapPoints =
      snapPoints[snapPoints.length - 1] !== 100
        ? [...snapPoints, 100]
        : snapPoints;

    const currentContext = useProviderContext();
    const sheetIdFromContext = useSheetIDContext();
    const sheetId = props.id || sheetIdFromContext;
    const sheetRef = useSheetRef();
    const payloadRef = useRef(payload);
    const hardwareBackPressEvent = useRef<NativeEventSubscription>();
    const hiding = useRef(false);

    payloadRef.current = payload;

    // Initialize animations
    const animations = useBottomSheetAnimations(
      snapPoints,
      initialSnapIndex,
      onSnapIndexChange,
      onChange
    );

    // Create gesture
    const gesture = createBottomSheetGesture(animations, {
      enabled: gestureEnabled && closable,
      onSnapIndexChange,
    });

    // Backdrop animation
    const backdropAnimatedStyle = useBackdropAnimation(
      animations.translateY,
      animations.snapPointsPixels,
      animations.screenHeight,
      defaultOverlayOpacity
    );

    // Track state
    const [isOpen, setIsOpen] = useState(false);

    const hideSheet = useCallback(
      (data?: any, isSheetManagerOrRef?: boolean) => {
        if (hiding.current) return;
        if (!closable && !isSheetManagerOrRef) {
          return;
        }
        hiding.current = true;
        onBeforeClose?.((data || payloadRef.current) as never);

        Keyboard.dismiss();

        // Animate to closed
        animateToClose(animations, () => {
          if (closable || isSheetManagerOrRef) {
            setIsOpen(false);
            setVisible(false);
            onClose?.((data || payloadRef.current) as never);
            hiding.current = false;

            hardwareBackPressEvent.current?.remove();
            if (sheetId) {
              SheetManager.remove(sheetId, currentContext);
            }
          }
        });
      },
      [closable, onBeforeClose, onClose, sheetId, currentContext, animations]
    );

    const { visible, setVisible } = useSheetManager({
      id: sheetId,
      onHide: (data) => {
        hideSheet(data, true);
      },
      onBeforeShow: (data) => {
        onBeforeShow?.(data as never);
      },
      onContextUpdate: () => {
        if (sheetId) {
          SheetManager.add(sheetId, currentContext);
          SheetManager.registerRef(sheetId, currentContext, {
            current: getRef(),
          });
        }
      },
    });

    const onHardwareBackPress = useCallback(() => {
      if (visible && closable && closeOnPressBack) {
        hideSheet();
        return true;
      }
      return false;
    }, [closable, closeOnPressBack, hideSheet, visible]);

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
      return undefined;
    }, [visible, onHardwareBackPress]);

    const onTouch = useCallback(() => {
      onTouchBackdrop?.({} as any);
      if (closeOnTouchBackdrop && closable) {
        hideSheet();
      }
    }, [onTouchBackdrop, closeOnTouchBackdrop, closable, hideSheet]);

    const getRef = useCallback(
      (): BottomSheetRef => ({
        show: (snapIndex?: number) => {
          onBeforeShow?.();
          setVisible(true);
          setIsOpen(true);

          const targetIndex =
            typeof snapIndex === 'number' ? snapIndex : initialSnapIndex;

          // Animate to snap point
          runOnJS(() => {
            animateToSnapPoint(animations, targetIndex, () => {
              onOpen?.();
            });
          })();
        },
        hide: (data: any) => {
          hideSheet(data, true);
        },
        setModalVisible: (_visible?: boolean) => {
          console.warn(
            'setModalVisible is deprecated. Use show() or hide() instead.'
          );
          if (_visible) {
            getRef().show();
          } else {
            hideSheet();
          }
        },
        snapToOffset: (offset: number) => {
          // Convert offset percentage to snap index
          const index = snapPoints.findIndex((point) => point >= offset);
          if (index >= 0) {
            runOnJS(() => {
              animateToSnapPoint(animations, index);
            })();
          }
        },
        snapToRelativeOffset: (offset: number) => {
          console.warn(
            'snapToRelativeOffset is deprecated. Use snapToIndex instead.'
          );
          const currentIndex = animations.currentSnapIndex.value;
          if (offset === 0) {
            runOnJS(() => {
              animateToSnapPoint(animations, currentIndex);
            })();
            return;
          }
          const currentPoint = snapPoints[currentIndex];
          const newPoint = currentPoint + currentPoint * (offset / 100);
          const index = snapPoints.findIndex((point) => point >= newPoint);
          if (index >= 0) {
            runOnJS(() => {
              animateToSnapPoint(animations, index);
            })();
          }
        },
        snapToIndex: (index: number) => {
          if (index >= snapPoints.length || index < 0) return;
          runOnJS(() => {
            animateToSnapPoint(animations, index);
          })();
        },
        handleChildScrollEnd: () => {
          console.warn(
            'handleChildScrollEnd has been removed. Please use `useScrollHandlers` hook to enable scrolling in BottomSheet'
          );
        },
        modifyGesturesForLayout: () => {
          console.warn('modifyGesturesForLayout is no longer needed');
        },
        currentSnapIndex: () => animations.currentSnapIndex.value,
        isGestureEnabled: () => gestureEnabled,
        isOpen: () => animations.isOpen.value,
        keyboardHandler: () => {
          console.warn(
            'keyboardHandler is deprecated. Keyboard is handled automatically'
          );
        },
        ev: {
          publish: () => console.warn('EventManager has been removed'),
          subscribe: () => {
            console.warn('EventManager has been removed');
            return () => {};
          },
          unsubscribe: () => console.warn('EventManager has been removed'),
        } as any,
      }),
      [
        onBeforeShow,
        setVisible,
        hideSheet,
        snapPoints,
        initialSnapIndex,
        gestureEnabled,
        animations,
        onOpen,
      ]
    );

    useImperativeHandle(ref, getRef, [getRef]);

    useEffect(() => {
      if (sheetId) {
        SheetManager.registerRef(sheetId, currentContext, {
          current: getRef(),
        });
      }
      sheetRef.current = getRef();
    }, [currentContext, getRef, sheetId, sheetRef]);

    // Auto-open when visible becomes true
    useEffect(() => {
      if (visible && !isOpen) {
        setIsOpen(true);
        animateToSnapPoint(animations, initialSnapIndex, () => {
          onOpen?.();
        });
      }
    }, [visible, isOpen, initialSnapIndex, onOpen, animations]);

    if (!visible) {
      return null;
    }

    const sheetContent = (
      <BottomSheetContent
        animations={animations}
        gesture={gesture}
        containerStyle={containerStyle}
        indicatorStyle={indicatorStyle}
        CustomHeaderComponent={CustomHeaderComponent}
        gestureEnabled={gestureEnabled}
        closable={closable}
        elevation={elevation}
      >
        {children}
      </BottomSheetContent>
    );

    // Modal mode
    if (isModal) {
      return (
        <Modal
          transparent
          visible={visible}
          onRequestClose={() => {
            if (closeOnPressBack) {
              hideSheet();
            }
          }}
          statusBarTranslucent
        >
          <View style={styles.modalContainer}>
            <Backdrop
              animatedStyle={backdropAnimatedStyle}
              overlayColor={overlayColor}
              onPress={onTouch}
              pressBehavior={closeOnTouchBackdrop ? 'close' : 'none'}
              {...backdropProps}
            />
            {sheetContent}
          </View>
        </Modal>
      );
    }

    // Non-modal mode
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
        <Backdrop
          animatedStyle={backdropAnimatedStyle}
          overlayColor={overlayColor}
          onPress={onTouch}
          pressBehavior={closeOnTouchBackdrop ? 'close' : 'none'}
          {...backdropProps}
        />
        {sheetContent}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
});
