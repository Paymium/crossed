import { cloneElement, forwardRef, type PropsWithChildren } from 'react';

export const VisibilityHidden = forwardRef(
  (
    { children, hidden = false }: PropsWithChildren<{ hidden: boolean }>,
    ref: any
  ) => {
    return cloneElement(children as any, {
      'aria-hidden': hidden.toString(),
      ref,
      ...(hidden
        ? {
            style: {
              // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
              position: 'absolute',
              // border: 0,
              // width: 1,
              // height: 1,
              // padding: 0,
              // margin: -1,
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              wordWrap: 'normal',
            },
          }
        : {}),
    });
  }
);
