import { ComponentType, forwardRef, Fragment } from 'react';
import { Provider, useContext } from './context';
import { RemoveScroll as RS } from '../utils';
import { VisibilityHidden } from '../utils/VisibilityHidden';

export type SheetPortalProps = {
  /**
   * To false, not remove scroll parent
   * @default true
   */
  removeParentScroll?: boolean;
};

export const createSheetPortal = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P & SheetPortalProps>(
    ({ removeParentScroll = true, ...props }, ref) => {
      const { children, ...otherProps } = props as any;
      const context = useContext();
      const { open } = context;

      const RemoveScroll = removeParentScroll ? RS : Fragment;
      return (
        <Styled {...otherProps} ref={ref}>
          <Provider {...context}>
            <RemoveScroll enabled={open}>
              <VisibilityHidden hidden={!open}>{children}</VisibilityHidden>
            </RemoveScroll>
          </Provider>
        </Styled>
      );
    }
  );
