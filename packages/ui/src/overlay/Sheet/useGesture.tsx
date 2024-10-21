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
