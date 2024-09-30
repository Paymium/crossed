/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Card, Divider, Tabs, Text, YBox } from '@crossed/ui';

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
      example={`<YBox space="md">
        <Tabs defaultValue="web">
  <Tabs.List>
  <Tabs.Indicator />
    <Tabs.Tab value="web">
      <Tabs.Tab.Text>web</BuilderTabs.Tab.Text>
    </Tabs.Tab>
    <Tabs.Tab value="native">
      <Tabs.Tab.Text>native</BuilderTabs.Tab.Text>
    </Tabs.Tab>
    <Tabs.Tab value="disabled" disabled>
      <Tabs.Tab.Text>disabled</BuilderTabs.Tab.Text>
    </Tabs.Tab>
    <Tabs.Tab value="other">
      <Tabs.Tab.Text>other</BuilderTabs.Tab.Text>
    </Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel value="web">
    <Text>web</Text>
    </Tabs.Panel>
    <Tabs.Panel value="native">
      <Text>native</Text>
    </Tabs.Panel>
    <Tabs.Panel value="disabled">
      <Text>disabled</Text>
    </Tabs.Panel>
    <Tabs.Panel value="other">
      <Text>other</Text>
    </Tabs.Panel>
  </PlatformTabs.Panels>
</Tabs><Divider /><Card><Tabs defaultValue="native" variant="underline">
  <Tabs.List>
    <Tabs.Indicator />
    <Tabs.Tab value="web">
      <Tabs.Tab.Text>web</BuilderTabs.Tab.Text>
    </Tabs.Tab>
    <Tabs.Tab value="native">
      <Tabs.Tab.Text>native</BuilderTabs.Tab.Text>
    </Tabs.Tab>
    <Tabs.Tab value="disabled" disabled>
      <Tabs.Tab.Text>disabled</BuilderTabs.Tab.Text>
    </Tabs.Tab>
    <Tabs.Tab value="other1">
      <Tabs.Tab.Text>An other 1</BuilderTabs.Tab.Text>
    </Tabs.Tab>
    <Tabs.Tab value="other2">
      <Tabs.Tab.Text>An other 2</BuilderTabs.Tab.Text>
    </Tabs.Tab>
    <Tabs.Tab value="other3">
      <Tabs.Tab.Text>An other 3</BuilderTabs.Tab.Text>
    </Tabs.Tab>
    <Tabs.Tab value="other4">
      <Tabs.Tab.Text>An other 4</BuilderTabs.Tab.Text>
    </Tabs.Tab>
    <Tabs.Tab value="other5">
      <Tabs.Tab.Text>An other 5</BuilderTabs.Tab.Text>
    </Tabs.Tab>
    <Tabs.Tab value="other6">
      <Tabs.Tab.Text>An other 6</BuilderTabs.Tab.Text>
    </Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel value="web"><button>click</button>
    <Text>web</Text>
    <Text>web</Text>
    <Text>web</Text>
    <Text>web</Text>
    <Text>web</Text>
    <Text>web</Text>
    </Tabs.Panel>
    <Tabs.Panel value="native">
      <Text>native</Text>
    </Tabs.Panel>
    <Tabs.Panel value="disabled">
      <Text>disabled</Text>
    </Tabs.Panel>
    <Tabs.Panel value="other">
      <Text>other</Text>
    </Tabs.Panel>
  </PlatformTabs.Panels>
</Tabs></Card>
        </YBox>`}
      scope={{ Tabs, Text, YBox, Card, Divider }}
    />
  );
}
