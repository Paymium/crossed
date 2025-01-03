/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ComponentType, PropsWithChildren } from 'react';
import type { PressableProps } from 'react-native';
import { CrossedMethods } from '@crossed/styled';

export type CheckboxProps = Omit<PressableProps, 'style' | 'children'> &
  PropsWithChildren<{
    /**
     * if true, checkbox is checked
     */
    checked?: boolean;

    /**
     * default checked value
     */
    defaultChecked?: boolean;

    /**
     * Call when checked value change
     */
    onChecked?: (_c: boolean) => void;

    /**
     * Not show thumb
     */
    noThumb?: boolean;

    /**
     * If true, checkbox is disable
     */
    disabled?: boolean;

    style?: CrossedMethods<any>;
  }>;
export type ImplementationProps = {
  checked: boolean;
  setChecked: (_c: boolean) => void;
};

export type CheckboxComponent = ComponentType<CheckboxProps>;

export type ImplementationComponent = ComponentType<ImplementationProps>;
