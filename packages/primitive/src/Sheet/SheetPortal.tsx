import { ComponentType, forwardRef } from 'react';
import { Provider, useContext } from './context';
import { RemoveScroll as RS } from '../utils';

export type SheetPortalProps = {};

export const createSheetPortal = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P & SheetPortalProps>(({ ...props }, ref) => {
    const { children, ...otherProps } = props as any;
    const context = useContext();
    const { open } = context;

    return open ? (
      <Styled {...otherProps} ref={ref}>
        <Provider {...context}>
          <RS enabled={open}>{children}</RS>
        </Provider>
      </Styled>
    ) : null;
  });
