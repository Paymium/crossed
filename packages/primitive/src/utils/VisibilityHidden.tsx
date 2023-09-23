import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type PropsWithChildren,
} from 'react';

export const VisibilityHidden = forwardRef(
  (
    { children, hidden = false }: PropsWithChildren<{ hidden: boolean }>,
    ref: any
  ) => {
    return Children.map(children, (c) => {
      return isValidElement(c)
        ? cloneElement(c as any, {
            'aria-hidden': hidden.toString(),
            ref,
            ...(hidden
              ? {
                  style: {
                    position: 'absolute',
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    wordWrap: 'normal',
                  },
                }
              : {}),
          })
        : null;
    });
  }
);
