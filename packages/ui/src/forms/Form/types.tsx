/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type {
  ComponentType,
  Dispatch,
  MutableRefObject,
  PropsWithChildren,
  SetStateAction,
} from 'react';
import type {
  MouseEvent,
  NativeSyntheticEvent,
  TargetedEvent,
  View,
  ViewProps,
} from 'react-native';
import type { LabelProps } from '../Label/types';
import type { YBoxProps } from '../../layout/YBox';

export type FormProps = YBoxProps & { onSubmit: () => void; asChild?: boolean };
export type FormFieldProps = ViewProps & { name?: string; disabled?: boolean };
export type FormControlProps = PropsWithChildren<{}>;
export type FormLabelProps = LabelProps;
export type FormMessageProps = PropsWithChildren<{}>;

export type FormComponent = ComponentType<FormProps>;
export type FormFieldComponent = ComponentType<FormFieldProps>;
export type FormControlComponent = ComponentType<FormControlProps>;
export type FormLabelComponent = ComponentType<FormLabelProps>;
export type FormMessageComponent = ComponentType<FormMessageProps>;

export type FieldContext = {
  inputId: string;
  setInputId: Dispatch<SetStateAction<string>>;
  controlRef: MutableRefObject<View>;
};
