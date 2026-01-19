/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  Easing,
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';

/**
 * Default spring animation configuration for sheet movements
 */
export const SPRING_CONFIG: WithSpringConfig = {
  damping: 50,
  mass: 0.3,
  stiffness: 121.6,
  overshootClamping: false,
};

/**
 * Timing animation configuration for backdrop opacity
 */
export const BACKDROP_TIMING_CONFIG: WithTimingConfig = {
  duration: 250,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

/**
 * Fast timing configuration for quick animations
 */
export const FAST_TIMING_CONFIG: WithTimingConfig = {
  duration: 150,
  easing: Easing.out(Easing.ease),
};

/**
 * Velocity threshold for determining if a gesture should snap to the next point
 * based on velocity rather than position
 */
export const VELOCITY_THRESHOLD = 500;

/**
 * Minimum drag distance in pixels to trigger a snap point change
 */
export const MIN_DRAG_DISTANCE = 50;
