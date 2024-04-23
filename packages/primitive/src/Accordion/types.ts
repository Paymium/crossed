/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type {
  ComponentType,
  Context,
  ForwardRefExoticComponent,
  KeyboardEventHandler,
  MutableRefObject,
  RefAttributes,
} from 'react';
import type { PressableProps, View, ViewProps } from 'react-native';
import type { VisibilityHiddenProps } from 'src/VisibilityHidden';

export type AccordionProps = ViewProps & {
  allowMultiple?: boolean;
  defaultValues: string[];
  values?: string[];
  onChange?: (_p: string[]) => void;
};
export type AccordionItemProps = ViewProps & { value: string };
export type AccordionTriggerProps = PressableProps;
export type AccordionPanelProps = VisibilityHiddenProps;

export type AccordionComponent = ComponentType<AccordionProps>;
export type AccordionItemComponent = ForwardRefExoticComponent<
  AccordionItemProps & RefAttributes<View>
>;
export type AccordionTriggerComponent = ForwardRefExoticComponent<
  AccordionTriggerProps & RefAttributes<View>
>;
export type AccordionPanelComponent = ForwardRefExoticComponent<
  AccordionPanelProps & RefAttributes<View>
>;

export type CreateAccordion = () => {
  Accordion: AccordionComponent;
  AccordionItem: AccordionItemComponent;
  AccordionTrigger: AccordionTriggerComponent;
  AccordionPanel: AccordionPanelComponent;
  itemContext: Context<ItemContext>;
  rootContext: Context<AccordionRootContext>;
};

////////////////////////////////////////
// Focus
////////////////////////////////////////
export type FocusComponent = ComponentType<ViewProps>;
export type AccordionOnKeyDown = KeyboardEventHandler<HTMLButtonElement>;
export type AccordionUseFocus = (_p: { onPress: () => void }) => {
  onKeyDown: AccordionOnKeyDown;
};

////////////////////////////////////////
// context
////////////////////////////////////////

export type AccordionRootContext = Required<
  Pick<AccordionProps, 'allowMultiple' | 'values'>
> & {
  setValues: (_value: string[]) => void;
};

export type ItemContext = Pick<AccordionItemProps, 'value'> & {
  buttonId: MutableRefObject<string | undefined>;
  panelId: MutableRefObject<string | undefined>;
};
