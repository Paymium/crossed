/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Checkbox, Text, Textarea, YBox } from '@crossed/ui';
import { useState } from 'react';

export default function CreateBadge() {
  const { t } = useTranslation();
  const [clearable, setClearable] = useState(false);
  return (
    <TemplatePrimitive
      title="Textarea"
      description={t(
        'The Textarea component allows you to easily create multi-line text inputs.'
      )}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`<YBox space="sm">
  <Textarea
    placeholder="Placeholder"
    clearable={${clearable}}
  />
  <Textarea
    placeholder="Placeholder"
    label="label"
    description="description"
    extra="extra"
    clearable={${clearable}}
  />
  <Textarea
    placeholder="Placeholder"
    label="Error"
    error="Your message"
    clearable={${clearable}}
  />
  <Textarea
    placeholder="Placeholder"
    label="Error"
    elementLeft={<Text>EUR</Text>}
    clearable={${clearable}}
  />
  <Textarea
    placeholder="Placeholder"
    label="Error"
    elementRight={<Text>EUR</Text>}
    clearable={${clearable}}
  />
</YBox>`}
      scope={{ Textarea, YBox, Text }}
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
