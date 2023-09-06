import { forwardRef, type ComponentType } from 'react';
import { useContext } from './context';
import { RovingFocus } from '../utils/RovingFocus';
import { VisibilityHidden } from '../utils/VisibilityHidden';

export const createDropdownContent = <P,>(StyledRoot: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    const { id, open } = useContext();
    return (
      <RovingFocus>
        <VisibilityHidden hidden={!open}>
          <StyledRoot
            role="menu"
            {...props}
            ref={ref}
            id={id}
            aria-labelledby={`label-${id}`}
            autoFocus
          />
        </VisibilityHidden>
      </RovingFocus>
    );
  });
