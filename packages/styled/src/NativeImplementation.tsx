/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React, {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import { Animated, ViewProps } from 'react-native';
import { useTheme } from './useTheme';
import { Registry } from './Registry';

export const NativeImplementation = ({ children, ...props }: ViewProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const theme = useTheme();
  const [, setTransition] = useTransition();

  const [show, setShow] = useState(true);

  const handleHide = () => {
    setTransition(() => setShow(false));
    return Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    });
  };

  const handleShow = () => {
    setTransition(() => setShow(true));
    return Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    });
  };

  useEffect(() => {
    Animated.sequence([handleHide(), handleShow()]).start();
  }, [theme]);

  return (
    <Animated.View
      {...props}
      style={[{ flex: 1, zIndex: 10000 }, { opacity: fadeAnim }, props.style]}
    >
      {show
        ? isValidElement(children)
          ? cloneElement(children, { key: Registry.themeName })
          : children
        : null}
    </Animated.View>
  );
};
