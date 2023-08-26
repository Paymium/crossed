import { ComponentType, forwardRef, Fragment } from 'react';
import { Provider, useContext } from './context';
import { RemoveScroll as RS } from '../utils';

export type ModalPortalProps = {
  /**
   * To false, not remove scroll parent
   * @default true
   */
  removeParentScroll?: boolean;
};

export const createModalPortal = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P & ModalPortalProps>(
    ({ removeParentScroll = true, ...props }, ref) => {
      const { children, ...otherProps } = props as any;
      const context = useContext();
      const { open } = context;

      const RemoveScroll = removeParentScroll ? RS : Fragment;
      return open ? (
        <Styled {...otherProps} ref={ref}>
          <Provider {...context}>
            <RemoveScroll>{children}</RemoveScroll>
          </Provider>
        </Styled>
      ) : null;
    }
  );
