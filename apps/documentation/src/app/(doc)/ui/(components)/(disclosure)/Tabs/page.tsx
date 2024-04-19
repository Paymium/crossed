/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Tabs, Text } from '@crossed/ui';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Tabs"
      description={t(
        'A React component that helps you build accessible tabs, by providing keyboard interactions and ARIA attributes described in the WAI-ARIA Tab Panel Design Pattern.'
      )}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`<Tabs defaultValue="web">
  <Tabs.List>
    <Tabs.Tab value="web">
      <Tabs.Tab.Text>web</BuilderTabs.Tab.Text>
    </Tabs.Tab>
    <Tabs.Tab value="native">
      <Tabs.Tab.Text>native</BuilderTabs.Tab.Text>
    </Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel value="web">
    <Text>web</Text>
    </Tabs.Panel>
    <Tabs.Panel value="native">
      <Text>native</Text>
    </Tabs.Panel>
  </PlatformTabs.Panels>
</Tabs>`}
      scope={{ Tabs, Text }}
    />
  );
}
