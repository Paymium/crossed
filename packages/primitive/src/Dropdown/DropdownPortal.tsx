/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentType, forwardRef, Fragment } from 'react';
import { Provider, useContext } from './context';
import { RemoveScroll as RS } from '../utils';

export type DropdownPortalProps = {
  /**
   * To false, not remove scroll parent
   * @default true
   */
  removeParentScroll?: boolean;
};

export const createDropdownPortal = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P & DropdownPortalProps>(
    ({ removeParentScroll = true, ...props }, ref) => {
      const { children, ...otherProps } = props as any;
      const context = useContext();

      const RemoveScroll = removeParentScroll ? RS : Fragment;
      return (
        <Styled {...otherProps} ref={ref}>
          <Provider {...context}>
            <RemoveScroll>{children}</RemoveScroll>
          </Provider>
        </Styled>
      );
    }
  );
