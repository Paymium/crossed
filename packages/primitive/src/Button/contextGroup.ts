import { createScope } from '@crossed/core';
import type { Orientation } from '../utils/RovingFocus';

type ButtonGroupContext = {
  orientation: Orientation;
  grouped?: boolean;
};
export const [ProviderGroup, useContextGroup] = createScope<ButtonGroupContext>(
  { orientation: 'horizontal' } as ButtonGroupContext
);
