/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { SwitchProps } from './type';
import { Switch } from './index';

export const SwitchPreset = ({
  value,
  onChange,
  label,
  defaultValue = false,
  disabled,
  ...props
}: Omit<SwitchProps, 'children'> & { label: string }) => {
  return (
    <Switch
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      disabled={disabled}
      aria-labelledby={'switchLabel'}
      {...props}
    >
      <Switch.Thumb />
      <Switch.Label id={'switchLabel'}>{label}</Switch.Label>
    </Switch>
  );
};
