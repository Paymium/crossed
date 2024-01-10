import { forwardRef, type ComponentType } from 'react';

export function withDefaultProps<P extends Record<string, any>>(
  Comp: ComponentType<P>,
  defaultProps: Partial<P>
) {
  return forwardRef(function WithDefaultPropsRender(
    props: Omit<P, keyof typeof defaultProps> &
      Partial<Pick<P, keyof typeof defaultProps>>,
    ref: any
  ) {
    return <Comp {...defaultProps} {...props as any} ref={ref} />;
  });
}
