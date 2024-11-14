/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useSheetContext } from './context';
import { useGestureDetach } from './useGestureDetach';
import { useGesturePan } from './useGesturePan';

export const useGesture = (e: {
  isMove: any;
  height: any;
  scroll: any;
  initialHeight: any;
  setScrollEnabled: any;
  scrollEnabled: any;
}) => {
  const { detach } = useSheetContext();
  return (detach ? useGestureDetach : useGesturePan)(e);
};
