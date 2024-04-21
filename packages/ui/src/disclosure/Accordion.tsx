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
import { forwardRef, useContext } from 'react';
import { ChevronDown, ChevronUp } from '@crossed/unicons';

const accordionStyles = createStyles((t) => ({
  root: {
    base: {
      borderBottomWidth: 1,
      borderColor: t.colors.neutral[500],
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
    ':hover': { backgroundColor: t.colors.neutral[300] },
    ':active': { backgroundColor: t.colors.neutral[400] },
    'web': { base: { transition: 'all 170ms' } },
  },
  panel: {
    // base: { padding: t.space.sm },
  },
  item: {
    base: {
      borderTopWidth: 1,
      borderColor: t.colors.neutral[500],
      borderStyle: 'solid',
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
  return (
    <PAccordionPanel {...props} ref={ref} {...accordionStyles.panel.rnw()} />
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
