import { forwardRef, type ComponentType } from 'react';

export function withDefaultProps<P extends Record<string, any>>(Comp: ComponentType<P>, defaultProps: Partial<P>) {
  return forwardRef(function WithDefaultPropsRender(props: P, ref: any) {
    return <Comp {...defaultProps} {...props} ref={ref} />;
  });
}
