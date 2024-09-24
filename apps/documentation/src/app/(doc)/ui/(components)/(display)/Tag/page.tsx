/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Tag, XBox, Text, Select } from '@crossed/ui';
import { useState } from 'react';

export default function CreateBadge() {
  const { t } = useTranslation();
  const [color, setColor] = useState('default');
  return (
    <TemplatePrimitive
      title="Tag"
      description={t('// coming soon')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`<XBox alignItems="center" justifyContent="between">
      <Text>Promo25</Text>
      <Tag variant="${color}">Appliqué</Tag>
      </XBox>`}
      scope={{ Tag, XBox, Text }}
      variants={
        <>
          <Text>variant</Text>
          <Select
            value={color}
            onChange={(e: string) => {
              setColor(e);
            }}
          >
            <Select.Trigger>
              <XBox alignItems="center">
                <Select.Value />
              </XBox>
            </Select.Trigger>
            <Select.Content>
              {['default', 'green', 'red'].map((key) => {
                return (
                  <Select.Option value={key} key={key}>
                    <Text>{key}</Text>
                  </Select.Option>
                );
              })}
            </Select.Content>
          </Select>
        </>
      }
    />
  );
}
