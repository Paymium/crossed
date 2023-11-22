import { ComponentType, forwardRef, useId } from 'react';
import { Provider } from './context';
import { RovingFocusGroupItem } from '../utils';
import { ButtonGroupCollection } from './contextCollection';

export const createButtonMain = <T extends Record<string, any>>(
  StyledButton: ComponentType<T>
) =>
  forwardRef<any, T>((props, ref) => {
    const idDefault = useId();
    const id = props.id ?? idDefault;

    return (
      <Provider id={id}>
        <ButtonGroupCollection.ItemSlot id={id}>
          <RovingFocusGroupItem
            ref={ref}
            focusable={props.focusable ?? !props.disabled}
          >
            <StyledButton
              aria-disabled={Boolean(props.disabled ?? false)}
              aria-labelledby={id}
              role="button"
              tabIndex={props.disabled ? -1 : 0}
              {...(props as any)}
              id={id}
            />
          </RovingFocusGroupItem>
        </ButtonGroupCollection.ItemSlot>
      </Provider>
    );
  });
