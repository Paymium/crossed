/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ComponentType, PropsWithChildren } from 'react';

export type CheckboxProps = PropsWithChildren<{
  checked?: boolean;
  defaultChecked?: boolean;
  onChecked?: (_c: boolean) => void;
}>;
export type ImplementationProps = {
  checked: boolean;
  setChecked: (_c: boolean) => void;
};

export type CheckboxComponent = ComponentType<CheckboxProps>;

export type ImplementationComponent = ComponentType<ImplementationProps>;
