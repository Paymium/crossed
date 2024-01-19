/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentType, forwardRef } from 'react';
import { ProviderGroup } from './contextGroup';
import { Orientation, RovingFocusGroup } from '../utils/RovingFocus';
import { ButtonGroupCollection } from './contextCollection';

export const createButtonGroup = <T,>(StyledGroup: ComponentType<T>) =>
  forwardRef<any, T & { orientation?: Orientation }>((props, ref) => {
    return (
      <ProviderGroup grouped orientation={props.orientation ?? 'horizontal'}>
        <RovingFocusGroup orientation={props.orientation ?? 'horizontal'}>
          <ButtonGroupCollection.Provider>
            <ButtonGroupCollection.Slot>
              <StyledGroup {...props} ref={ref} />
            </ButtonGroupCollection.Slot>
          </ButtonGroupCollection.Provider>
        </RovingFocusGroup>
      </ProviderGroup>
    );
  });
