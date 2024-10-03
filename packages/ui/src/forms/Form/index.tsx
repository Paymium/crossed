/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Pressable, View } from 'react-native';
import type {
  FormComponent,
  FormFieldComponent,
  FormControlComponent,
  FormLabelComponent,
  FormMessageComponent,
  FieldContext,
} from './types';
import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useId,
  useRef,
} from 'react';
import { composeEventHandlers } from '@crossed/core';
import { Label } from '../Label';
import { useInteraction } from '@crossed/styled';
import { YBox } from '../../layout/YBox';

const fieldContext = createContext<FieldContext>({} as FieldContext);

const Form: FormComponent = ({ onSubmit, asChild, children, ...props }) => {
  const propsTmp = { role: 'form', ...props } as const;
  return asChild && isValidElement(children) ? (
    cloneElement(children, propsTmp)
  ) : (
    <YBox space="md" {...propsTmp}>
      {children}
    </YBox>
  );
};
const FormField: FormFieldComponent = ({ name, ...props }) => {
  const inputId = useRef<string>();
  const {
    state: { focus, hover },
    props: { onFocus, onBlur, onHoverIn, onHoverOut },
  } = useInteraction(props);

  return (
    <fieldContext.Provider
      value={{
        name,
        inputId,
        states: { focus, hover, disabled: props.disabled },
        handles: { onFocus, onBlur, onHoverIn, onHoverOut },
      }}
    >
      <View {...props} />
    </fieldContext.Provider>
  );
};
const FormControl: FormControlComponent = ({ children }) => {
  const { inputId, states, handles } = useContext(fieldContext);
  const localId = useId();
  if (!isValidElement(children)) {
    return children;
  }
  const id =
    children.props.id || children.props.nativeID || `form-control${localId}`;
  inputId.current = id;
  return cloneElement(children, {
    id,
    ...states,
    ...([undefined, true].includes(children.props.focusable)
      ? {
          onFocus: composeEventHandlers(
            handles.onFocus,
            children.props.onFocus
          ),
          onBlur: composeEventHandlers(handles.onBlur, children.props.onBlur),
        }
      : {}),
  } as any);
};
const FormLabel: FormLabelComponent = (props) => {
  const { inputId, states, handles } = useContext(fieldContext);
  return (
    <Pressable
      {...({ tabIndex: '-1' } as any)}
      onHoverIn={handles.onHoverIn}
      onHoverOut={handles.onHoverOut}
    >
      <Label {...states} {...props} htmlFor={inputId.current} />
    </Pressable>
  );
};
const FormMessage: FormMessageComponent = () => {
  return null;
};

export { Form, FormField, FormControl, FormLabel, FormMessage };
