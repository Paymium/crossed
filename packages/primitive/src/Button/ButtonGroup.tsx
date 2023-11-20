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
