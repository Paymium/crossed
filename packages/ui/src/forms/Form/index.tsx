/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Pressable, View } from 'react-native';
import {
  FormControlComponent,
  FormLabelComponent,
  FieldContext,
  FormFieldProps,
} from './types';
import {
  cloneElement,
  ComponentProps,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { withStaticProperties } from '@crossed/core';
import { Label } from '../Label';
import { Text } from '../../typography/Text';
import { isWeb } from '@crossed/styled';

const fieldContext = createContext<FieldContext>({} as FieldContext);

const Root = ({ children }: FormFieldProps) => {
  const [inputId, setInputId] = useState<string>();
  const controlRef = useRef<View>(null);

  return (
    <fieldContext.Provider value={{ setInputId, inputId, controlRef }}>
      {children}
    </fieldContext.Provider>
  );
};
Root.displayName = 'FormFieldRoot';
const FormFieldControl: FormControlComponent = ({ children }) => {
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
FormFieldControl.displayName = 'FormFieldControl';
const FormFieldLabel: FormLabelComponent = (props) => {
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
FormFieldLabel.displayName = 'FormFieldLabel';

const FormFieldHelper = (props: ComponentProps<typeof Text>) => {
  const { inputId } = useContext(fieldContext);
  return (
    <Text
      color={'tertiary'}
      fontSize={'sm'}
      id={`${inputId}:helper`}
      {...props}
    />
  );
};

FormFieldHelper.displayName = 'FormFieldHelper';

const FormFieldError = (props: ComponentProps<typeof Text>) => {
  return <Text color="error" fontSize={'sm'} {...props} />;
};
FormFieldError.displayName = 'FormFieldError';

export const FormField = withStaticProperties(Root, {
  Control: FormFieldControl,
  Label: FormFieldLabel,
  Helper: FormFieldHelper,
  Error: FormFieldError,
});

export { FormFieldControl, FormFieldLabel };
