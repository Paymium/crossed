/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'worklet';

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  'worklet';
  return Math.min(Math.max(value, min), max);
}

/**
 * Convert percentage snap points (0-100) to pixel positions
 * @param snapPoints Array of percentages (0-100)
 * @param containerHeight Height of the container in pixels
 * @returns Array of pixel positions from top
 */
export function snapPointsToPixels(
  snapPoints: number[],
  containerHeight: number
): number[] {
  'worklet';
  return snapPoints.map((percentage) => {
    // Calculate position from top of screen
    // 0% = top (0 pixels), 100% = bottom (containerHeight pixels)
    return containerHeight - (containerHeight * percentage) / 100;
  });
}

/**
 * Find the nearest snap point to a given position
 */
export function findNearestSnap(
  position: number,
  snapPoints: number[]
): number {
  'worklet';
  let nearestIndex = 0;
  let minDistance = Math.abs(position - snapPoints[0]);

  for (let i = 1; i < snapPoints.length; i++) {
    const distance = Math.abs(position - snapPoints[i]);
    if (distance < minDistance) {
      minDistance = distance;
      nearestIndex = i;
    }
  }

  return nearestIndex;
}

/**
 * Find the next snap point above (lower position value) the current position
 */
export function findNextSnapAbove(
  position: number,
  snapPoints: number[]
): number {
  'worklet';
  // Find the first snap point that is above (less than) current position
  for (let i = 0; i < snapPoints.length; i++) {
    if (snapPoints[i] < position) {
      return i;
    }
  }
  // If none found, return the topmost snap point
  return 0;
}

/**
 * Find the next snap point below (higher position value) the current position
 */
export function findNextSnapBelow(
  position: number,
  snapPoints: number[]
): number {
  'worklet';
  // Find the first snap point that is below (greater than) current position
  for (let i = snapPoints.length - 1; i >= 0; i--) {
    if (snapPoints[i] > position) {
      return i;
    }
  }
  // If none found, return the bottommost snap point
  return snapPoints.length - 1;
}

/**
 * Calculate the target snap index based on current position and velocity
 * @param currentPosition Current translateY position
 * @param velocity Gesture velocity (positive = down, negative = up)
 * @param snapPoints Array of snap points in pixels
 * @param velocityThreshold Velocity threshold to trigger velocity-based snapping
 * @returns Target snap point index
 */
export function calculateTargetSnap(
  currentPosition: number,
  velocity: number,
  snapPoints: number[],
  velocityThreshold = 500
): number {
  'worklet';

  // If velocity is strong enough, snap in the direction of velocity
  if (Math.abs(velocity) > velocityThreshold) {
    return velocity > 0
      ? findNextSnapBelow(currentPosition, snapPoints)
      : findNextSnapAbove(currentPosition, snapPoints);
  }

  // Otherwise, snap to nearest point
  return findNearestSnap(currentPosition, snapPoints);
}

/**
 * Interpolate a value from one range to another
 */
export function interpolate(
  value: number,
  inputRange: [number, number],
  outputRange: [number, number],
  extrapolate: 'clamp' | 'extend' = 'extend'
): number {
  'worklet';
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;

  // Calculate the ratio
  const ratio = (value - inputMin) / (inputMax - inputMin);

  // Calculate output value
  let result = outputMin + ratio * (outputMax - outputMin);

  // Apply extrapolation
  if (extrapolate === 'clamp') {
    result = clamp(result, Math.min(outputMin, outputMax), Math.max(outputMin, outputMax));
  }

  return result;
}
