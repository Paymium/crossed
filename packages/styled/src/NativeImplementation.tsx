/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { Animated, ViewProps } from 'react-native';
import { useTheme } from './useTheme';

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

  const child = useMemo(() => children, [theme]);
  return (
    <Animated.View
      {...props}
      // key={Registry.themeName}
      style={[{ flex: 1, zIndex: 10000 }, { opacity: fadeAnim }, props.style]}
    >
      {show ? child : null}
    </Animated.View>
  );
};
