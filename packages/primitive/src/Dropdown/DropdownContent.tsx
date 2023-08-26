import { forwardRef, type ComponentType } from 'react';
import { useContext } from './context';

export const createDropdownContent = <P,>(StyledRoot: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    const { id, open } = useContext();
    return (
      <StyledRoot
        role="listbox"
        {...props}
        ref={ref}
        id={id}
        aria-hidden={(!open).toString()}
        autoFocus
        tabIndex={0}
        style={
          open
            ? {
                position: 'absolute',
                top: '100px',
              }
            : {
                display: 'none',
              }
        }
      />
    );
  });
