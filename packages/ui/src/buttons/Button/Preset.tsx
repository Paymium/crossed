/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Button } from './Button';
import { ButtonText } from './Text';
import { ComponentProps } from 'react';
import { ButtonIcon } from './Icon';

export type ButtonPresetProps = ComponentProps<typeof Button> & {
  /**
   * Text of button
   */
  text?: string;
  /**
   * Icon right
   */
  iconRight?: React.ReactNode;
  /**
   * Icon left
   */
  iconLeft?: React.ReactNode;
};

export const ButtonPreset = ({
  text,
  iconRight,
  iconLeft,
  ...props
}: ButtonPresetProps) => {
  return (
    <Button {...props}>
      {!!iconLeft && <ButtonIcon>{iconLeft}</ButtonIcon>}
      {text && <ButtonText>{text}</ButtonText>}
      {!!iconRight && <ButtonIcon>{iconRight}</ButtonIcon>}
    </Button>
  );
};

ButtonPreset.displayName = 'ButtonPreset';
