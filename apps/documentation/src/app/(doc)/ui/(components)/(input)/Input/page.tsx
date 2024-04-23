/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Checkbox, Input, Text, YBox } from '@crossed/ui';
import { useState } from 'react';

export default function CreateBadge() {
  const { t } = useTranslation();
  const [clearable, setClearable] = useState(false);
  return (
    <TemplatePrimitive
      title="Input"
      description={t(
        'Input component is a component that is used to get user input in a text field.'
      )}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`<YBox space="sm">
  <Input
    placeholder="Placeholder"
    clearable={${clearable}}
  />
  <Input
    placeholder="Placeholder"
    label="label"
    description="description"
    extra="extra"
    clearable={${clearable}}
  />
  <Input
    placeholder="Placeholder"
    label="Error"
    error="Your message"
    clearable={${clearable}}
  />
  <Input
    placeholder="Placeholder"
    label="Error"
    elementLeft={<Text>EUR</Text>}
    clearable={${clearable}}
  />
  <Input
    placeholder="Placeholder"
    label="Error"
    elementRight={<Text>EUR</Text>}
    clearable={${clearable}}
  />
</YBox>`}
      scope={{ Input, YBox, Text }}
      variants={
        <YBox>
          <Checkbox onChecked={setClearable} checked={clearable}>
            <Text>Clearable</Text>
          </Checkbox>
        </YBox>
      }
    />
  );
}
