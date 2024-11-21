/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef } from 'react';
import { ProviderGroup, ButtonGroupCollection } from './context';
import { Orientation, RovingFocusGroup } from '@crossed/primitive';
import { type XBoxProps, XBox } from '../../layout/XBox';
import { View } from 'react-native';
import React from 'react';

export type ButtonGroupProps = XBoxProps & { orientation?: Orientation };
export const ButtonGroup = forwardRef<View, ButtonGroupProps>(
  (props: ButtonGroupProps, ref) => (
    <ProviderGroup grouped orientation={props.orientation ?? 'horizontal'}>
      <RovingFocusGroup orientation={props.orientation ?? 'horizontal'}>
        <ButtonGroupCollection.Provider>
          <ButtonGroupCollection.Slot>
            <XBox {...(props as any)} ref={ref} />
          </ButtonGroupCollection.Slot>
        </ButtonGroupCollection.Provider>
      </RovingFocusGroup>
    </ProviderGroup>
  )
);
