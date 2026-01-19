/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { WithSpringConfig } from 'react-native-reanimated';

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
 * Velocity threshold for determining if a gesture should snap to the next point
 * based on velocity rather than position
 */
export const VELOCITY_THRESHOLD = 500;
