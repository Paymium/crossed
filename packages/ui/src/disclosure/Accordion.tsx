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
import { forwardRef } from 'react';

const accordionStyles = createStyles((t) => ({
  root: {
    base: {
      borderBottomWidth: 1,
      borderColor: t.colors.neutral.default,
      borderStyle: 'solid',
    },
  },
  trigger: {
    'base': { display: 'flex', padding: t.space.sm },
    ':hover': { backgroundColor: t.colors.neutral.hover },
    ':active': { backgroundColor: t.colors.neutral.active },
    'web': { base: { transition: 'all 170ms' } },
  },
  panel: {
    base: { padding: t.space.sm },
  },
  item: {
    base: {
      borderTopWidth: 1,
      borderColor: t.colors.neutral.default,
      borderStyle: 'solid',
    },
  },
}));

const {
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

const AccordionTrigger: AccordionTriggerComponent = forwardRef((props, ref) => {
  return (
    <PAccordionTrigger
      {...props}
      ref={ref}
      style={({ pressed }) =>
        accordionStyles.trigger.rnw({ active: pressed }).style
      }
    />
  );
});

const AccordionPanel: AccordionPanelComponent = forwardRef((props, ref) => {
  return (
    <PAccordionPanel {...props} ref={ref} {...accordionStyles.panel.rnw()} />
  );
});

export { AccordionItem, AccordionPanel, AccordionTrigger, Accordion };