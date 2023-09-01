export type GenericPrimitiveConfig = {
  requireAccessibility: true;
};

export interface PrimitiveCustomConfig {}
export interface PrimitiveConfig
  extends Omit<GenericPrimitiveConfig, keyof PrimitiveCustomConfig>,
    PrimitiveCustomConfig {}

export type RequiredAccessibilityProps<
  P,
  F extends keyof P
> = PrimitiveConfig['requireAccessibility'] extends true
  ? Omit<P, F> & Pick<Required<P>, F>
  : P;
