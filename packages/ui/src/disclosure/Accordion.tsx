/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  createAccordion,
  type AccordionTriggerComponent,
  type AccordionPanelComponent,
  type AccordionItemComponent,
  type AccordionComponent,
} from '@crossed/primitive';
import { createStyles } from '@crossed/styled';
import { forwardRef, useContext, useRef } from 'react';
import { ChevronDown, ChevronUp } from '@crossed/unicons';
import { View } from 'react-native';

const accordionStyles = createStyles((t) => ({
  root: {
    base: {
      borderBottomWidth: 1,
      borderColor: t.colors.border.primary,
      borderStyle: 'solid',
    },
  },
  trigger: {
    'base': {
      display: 'flex',
      padding: t.space.xs,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    ':hover': {
      backgroundColor: t.colors.background.secondary,
    },
    ':active': {
      backgroundColor: t.colors.background.primary,
    },
    'web': { base: { transition: 'all 170ms' } },
  },
  panel: {
    web: {
      base: { overflow: 'hidden', transition: 'height 170ms ease-out' },
    },
  },
  item: {
    base: {
      borderTopWidth: 1,
      borderColor: t.colors.border.primary,
      borderStyle: 'solid',
    },
    web: {
      base: { transition: 'height 1000ms ease' },
    },
  },
}));

const {
  itemContext,
  rootContext,
  Accordion: PAccordion,
  AccordionItem: PAccordionItem,
  AccordionPanel: PAccordionPanel,
  AccordionTrigger: PAccordionTrigger,
} = createAccordion();

const Accordion: AccordionComponent = (props) => {
  return <PAccordion {...props} {...accordionStyles.root.rnw()} />;
};

const AccordionItem: AccordionItemComponent = forwardRef((props, ref) => {
  return (
    <PAccordionItem {...props} ref={ref} {...accordionStyles.item.rnw()} />
  );
});

const AccordionTrigger: AccordionTriggerComponent = forwardRef(
  ({ style, ...props }, ref) => {
    return (
      <PAccordionTrigger
        {...props}
        ref={ref}
        style={({ pressed }) =>
          accordionStyles.trigger.rnw({
            style: (typeof style === 'function'
              ? style({ pressed })
              : style) as any,
            active: pressed,
          }).style
        }
      />
    );
  }
);

const AccordionPanel: AccordionPanelComponent = forwardRef((props, ref) => {
  const { value } = useContext(itemContext);
  const { values } = useContext(rootContext);
  const refLocal = useRef<number>();
  return (
    <PAccordionPanel
      {...props}
      ref={ref}
      hide={false}
      style={[
        accordionStyles.panel.rnw().style,
        values.includes(value) && { height: refLocal.current },
      ]}
    >
      <View
        onLayout={({ nativeEvent: { layout } }) => {
          refLocal.current = layout.height;
        }}
      >
        {props.children}
      </View>
    </PAccordionPanel>
  );
});

const AccordionIcon = () => {
  const { value } = useContext(itemContext);
  const { values } = useContext(rootContext);
  return values.includes(value) ? <ChevronUp /> : <ChevronDown />;
};

export {
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  Accordion,
  AccordionIcon,
};
