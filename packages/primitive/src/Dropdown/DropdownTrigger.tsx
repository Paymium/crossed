import { forwardRef, type ComponentType } from 'react';
import type { RequiredAccessibilityProps } from 'src/types';
import { useContext } from './context';
import { composeEventHandlers } from '@crossed/core';

export const createDropdownTrigger = <P,>(StyledRoot: ComponentType<P>) =>
  // @ts-ignore
  forwardRef<any, RequiredAccessibilityProps<P, 'aria-label'>>((props, ref) => {
    const { id, open, setOpen } = useContext();
    return (
      <StyledRoot
        aria-haspopup="menu"
        aria-expanded={open.toString()}
        aria-activedescendant={open ? id : undefined}
        aria-controls={open ? id : undefined}
        {...(props as any)}
        onClick={composeEventHandlers((props as any).onClick, () => {
          setOpen(!open);
        })}
        ref={ref}
      />
    );
  });
