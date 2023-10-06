import { forwardRef, type ComponentType, useEffect, useRef } from 'react';
import type { RequiredAccessibilityProps } from '../types';
import { useContext } from './context';
import { composeEventHandlers, composeRefs } from '@crossed/core';

export const createDropdownTrigger = <P,>(StyledRoot: ComponentType<P>) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  forwardRef<any, RequiredAccessibilityProps<P, 'aria-label'>>((props, ref) => {
    const { id, open, setOpen } = useContext();
    const refInter = useRef<any>(null);
    const openRef = useRef(open);

    useEffect(() => {
      if (!open && openRef.current) {
        refInter.current?.focus?.();
      }
    }, [open]);
    useEffect(() => {
      openRef.current = open;
    }, [open]);

    return (
      <StyledRoot
        aria-haspopup="menu"
        aria-expanded={open.toString()}
        aria-activedescendant={open ? id : undefined}
        aria-controls={open ? id : undefined}
        id={`label-${id}`}
        {...(props as any)}
        onClick={composeEventHandlers((props as any).onClick, () => {
          setOpen(!open);
        })}
        onKeyDown={composeEventHandlers((props as any).onKeyDown, (e: any) => {
          e.preventDefault();
          switch (e.code) {
            case 'ArrowDown':
            case 'ArrowUp':
            case 'Space':
            case 'Enter':
              setOpen(true);
              break;
          }
        })}
        ref={composeRefs(ref, refInter)}
      />
    );
  });
