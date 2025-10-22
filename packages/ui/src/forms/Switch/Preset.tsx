/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { SwitchProps } from './type';
import { Root } from './Root';
import { SwitchLabel } from './Label';
import { SwitchHelper } from './Helper';
import { SwitchTrack } from './Track';
import { YBox } from '../../layout';

export const SwitchPreset = ({
  value,
  onChange,
  label,
  defaultValue = false,
  disabled,
  helperText,
  size = 'md',
  ...props
}: Omit<SwitchProps, 'children'> & { label?: string; helperText?: string }) => {
  return (
    <Root
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      disabled={disabled}
      aria-labelledby={'switchLabel'}
      size={size}
      {...props}
    >
      <SwitchTrack />
      {!!label && (
        <YBox>
          <SwitchLabel id={'switchLabel'}>{label}</SwitchLabel>
          {helperText && <SwitchHelper>{helperText}</SwitchHelper>}
        </YBox>
      )}
    </Root>
  );
};
