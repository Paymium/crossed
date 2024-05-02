/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Toast, ToastDescription, ToastTitle, YBox } from '@crossed/ui';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Toast"
      description={t('Toast description')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`<YBox space="xs">
  <Toast status="success"> 
    <Toast.Title>Sollicitudin</Toast.Title>
    <Toast.Description>
      Lorem ipsum dolor sit amet
    </Toast.Description>
  </Toast>
  <Toast status="info"> 
    <Toast.Title>Sollicitudin</Toast.Title>
    <Toast.Description>
      Lorem ipsum dolor sit amet
    </Toast.Description>
  </Toast>
  <Toast status="warning"> 
    <Toast.Title>Sollicitudin</Toast.Title>
    <Toast.Description>
      Lorem ipsum dolor sit amet
    </Toast.Description>
  </Toast>
  <Toast status="error"> 
    <Toast.Title>Sollicitudin</Toast.Title>
    <Toast.Description>
      Lorem ipsum dolor sit amet
    </Toast.Description>
  </Toast>
</YBox>`}
      scope={{
        Toast,
        ToastDescription,
        ToastTitle,
        YBox,
      }}
    />
  );
}
