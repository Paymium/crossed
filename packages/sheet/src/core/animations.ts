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
