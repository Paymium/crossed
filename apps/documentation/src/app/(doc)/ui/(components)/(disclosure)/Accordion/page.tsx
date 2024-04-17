/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import {
  Accordion,
  AccordionTrigger,
  AccordionPanel,
  AccordionItem,
  Text,
  AccordionIcon,
} from '@crossed/ui';
import { XBox } from '@crossed/ui';
import { useState } from 'react';

export default function CreateBadge() {
  const { t } = useTranslation();
  const [allowMultiple, setAllowMultiple] = useState(false);
  return (
    <TemplatePrimitive
      title="Accordion"
      description={t(
        'Accordions display a list of high-level options that can expand/collapse to reveal more information.'
      )}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      variants={
        <XBox>
          <input
            type="checkbox"
            checked={allowMultiple}
            onChange={(e) => setAllowMultiple(e.target.checked)}
          />
          <Text>allowMultiple</Text>
        </XBox>
      }
      example={`
<Accordion defaultValues={["1"]} allowMultiple={${allowMultiple}}>
  <AccordionItem value="1">
    <AccordionTrigger>
      <Text>
        Section 1 title
      </Text>
      <AccordionIcon />
    </AccordionTrigger>
    <AccordionPanel>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Text>
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem value="2">
    <AccordionTrigger>
      <Text>
        Section 2 title
      </Text>
      <AccordionIcon />
    </AccordionTrigger>
    <AccordionPanel>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Text>
    </AccordionPanel>
  </AccordionItem>
</Accordion>
`}
      scope={{
        Accordion,
        AccordionTrigger,
        AccordionPanel,
        AccordionItem,
        AccordionIcon,
        Text,
      }}
    />
  );
}
