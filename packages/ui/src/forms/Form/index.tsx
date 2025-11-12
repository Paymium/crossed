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
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { Label } from '../Label';
import { YBox } from '../../layout/YBox';
import { isWeb } from '@crossed/styled';

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
  const [inputId, setInputId] = useState<string>();
  const controlRef = useRef<View>(null);

  return (
    <fieldContext.Provider value={{ setInputId, inputId, controlRef }}>
      <View {...props} />
    </fieldContext.Provider>
  );
};
const FormControl: FormControlComponent = ({ children }) => {
  const { setInputId } = useContext(fieldContext);
  const localId = useId();

  const id = (children as any).props?.id || `form-control${localId}`;
  useEffect(() => {
    setInputId(id);
  }, [id, setInputId]);

  return isValidElement(children)
    ? cloneElement(children, {
        id,
        'nativeID': id,
        'data-describedby': `${id}:helper`,
      } as any)
    : children;
};
const FormLabel: FormLabelComponent = (props) => {
  const { inputId, controlRef } = useContext(fieldContext);
  const render = <Label {...props} for={inputId} />;

  return isWeb ? (
    render
  ) : (
    <Pressable tabIndex={-1} onPress={() => controlRef.current?.focus()}>
      {render}
    </Pressable>
  );
};
const FormMessage: FormMessageComponent = () => {
  return null;
};

export { Form, FormField, FormControl, FormLabel, FormMessage };
