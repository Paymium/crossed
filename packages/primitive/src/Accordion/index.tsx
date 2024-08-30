/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useRef,
} from 'react';
import { Pressable, View } from 'react-native';
import type {
  AccordionComponent,
  AccordionItemComponent,
  AccordionPanelComponent,
  AccordionTriggerComponent,
  CreateAccordion,
  ItemContext,
  AccordionRootContext,
} from './types';
import { Focus, useFocus } from './Focus';
import { composeEventHandlers, useUncontrolled } from '@crossed/core';
import { VisibilityHidden } from '../VisibilityHidden';

export type * from './types';

const createAccordion: CreateAccordion = () => {
  const rootContext = createContext<AccordionRootContext>(
    {} as AccordionRootContext
  );
  const itemContext = createContext<ItemContext>({} as ItemContext);

  const Accordion: AccordionComponent = (props) => {
    const {
      children,
      allowMultiple = false,
      defaultValues,
      values: valueProps,
      onChange,
      ...restProps
    } = props;
    const [values, setValues] = useUncontrolled({
      defaultValue: defaultValues,
      value: valueProps,
      onChange,
    });

    return (
      <Focus {...restProps}>
        <rootContext.Provider value={{ values, setValues, allowMultiple }}>
          {children}
        </rootContext.Provider>
      </Focus>
    );
  };
  const AccordionItem: AccordionItemComponent = forwardRef(
    ({ value, ...props }, ref) => {
      const buttonId = useRef<string>();
      const panelId = useRef<string>();
      return (
        <itemContext.Provider value={{ value, buttonId, panelId }}>
          <View {...props} ref={ref} />
        </itemContext.Provider>
      );
    }
  );
  const AccordionTrigger: AccordionTriggerComponent = forwardRef(
    (props, ref) => {
      const id = useId();
      const propsId = props.id || props.nativeID || `accordion-trigger-${id}`;
      const { setValues, values, allowMultiple } = useContext(rootContext);
      const { value, buttonId, panelId } = useContext(itemContext);
      const onPress = useCallback(() => {
        setValues(
          allowMultiple
            ? values.includes(value)
              ? values.filter((e) => e !== value)
              : [...values, value]
            : [value]
        );
      }, [setValues, value, allowMultiple, values]);
      const propsFocus = useFocus({ onPress });

      buttonId.current = propsId;

      return (
        <Pressable
          role="button"
          {...props}
          {...propsFocus}
          id={propsId}
          aria-controls={panelId.current}
          aria-expanded={values.includes(value)}
          onPress={composeEventHandlers(onPress, props.onPress)}
          ref={ref}
        />
      );
    }
  );
  const AccordionPanel: AccordionPanelComponent = forwardRef((props, ref) => {
    const { values } = useContext(rootContext);
    const { value, buttonId, panelId } = useContext(itemContext);
    const id = useId();
    const propsId = props.id || props.nativeID || `accordion-panel-${id}`;

    panelId.current = propsId;

    return (
      <VisibilityHidden
        role="region"
        ref={ref}
        id={propsId}
        aria-labelledby={buttonId.current}
        hide={!values.includes(value)}
        {...props}
      />
    );
  });

  Accordion.displayName = 'Accordion';
  AccordionItem.displayName = 'Accordion.Item';
  AccordionTrigger.displayName = 'Accordion.Trigger';
  AccordionPanel.displayName = 'Accordion.Panel';

  return {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionPanel,
    rootContext,
    itemContext,
  };
};

const { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } =
  createAccordion();

export {
  createAccordion,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
};
