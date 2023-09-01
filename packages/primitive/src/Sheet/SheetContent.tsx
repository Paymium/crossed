import { ComponentType, forwardRef } from 'react';

export type SheetContentProps = {
  /**
   * Array of height size of content in percent
   * @default [85]
   */
  snapPoints?: number[];
  /**
   * Index of snapPoints selected
   * @default 0
   */
  indexSnapPoint?: number;
};

export const createSheetContent = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P & SheetContentProps>(
    ({ snapPoints = [85], indexSnapPoint = 0, ...props }, ref) => {
      return (
        <Styled
          {...(props as any)}
          ref={ref}
          style={{
            position: 'absolute',
            bottom: 0,
            // transform: 'translateY(-50%)',
            height: `${snapPoints[indexSnapPoint]}%`,
          }}
        />
      );
    }
  );
