import { ComponentType, forwardRef } from 'react';

export const createModalContent = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    return (
      <Styled
        {...props}
        ref={ref}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: 'auto',
          transform: 'translate(-50%, -50%',
        }}
      />
    );
  });
