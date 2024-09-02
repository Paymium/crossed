/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Box, Button, Checkbox, Input, Sheet, Text } from '@crossed/ui';
import { useState } from 'react';
export default function CreateBadge() {
  const { t } = useTranslation();
  const [handle, setHandle] = useState(false);
  const [dismissOnOverlayPress, setdismissOnOverlayPress] = useState(true);
  const [offset, setOffset] = useState('20');
  return (
    <TemplatePrimitive
      title="Sheet"
      description={t('Sheet description')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`
<Sheet hideHandle={${handle}} dismissOnOverlayPress={${dismissOnOverlayPress}} offset={"${offset}"}>
  <Sheet.Trigger asChild>
    <Button>
      <Button.Text>open</Button.Text>
    </Button>
  </Sheet.Trigger>
  <Sheet.Frame>
    <Text>Hello</Text>
  </Sheet.Frame>
</Sheet>`}
      scope={{
        Sheet,
        Text,
        Button,
      }}
      variants={
        <Box>
          <Checkbox checked={handle} onChecked={(e) => setHandle(e)}>
            <Text>Hide Handle</Text>
          </Checkbox>
          <Checkbox
            checked={dismissOnOverlayPress}
            onChecked={(e) => setdismissOnOverlayPress(e)}
          >
            <Text>Dismiss on Overlay press</Text>
          </Checkbox>
          <Input label="Offset" value={offset} onChangeText={setOffset} />
        </Box>
      }
    />
  );
}
