'use client';
import '@/types/unistyles';
import { CodeBlock } from '@/components/CodeBlock';
import { H1, H2, P, Text, YBox, Ul, Li, B, Kbd, Tabs } from '@crossed/ui';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <YBox role="main">
      <H1 id="introduction">Setup</H1>
      <YBox space="md">
        <H2 id="install">{t('Install dependencies')}</H2>
        <Tabs defaultValue="pnpm">
          <Tabs.List>
            <Tabs.Tab value="pnpm">
              <Tabs.Tab.Text>pnpm</Tabs.Tab.Text>
            </Tabs.Tab>
            <Tabs.Tab value="npm">
              <Tabs.Tab.Text>npm</Tabs.Tab.Text>
            </Tabs.Tab>
            <Tabs.Tab value="yarn">
              <Tabs.Tab.Text>yarn</Tabs.Tab.Text>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="pnpm">
              <CodeBlock language="sh">pnpm i @crossed/ui</CodeBlock>
            </Tabs.Panel>
            <Tabs.Panel value="npm">
              <CodeBlock language="sh">npm i @crossed/ui</CodeBlock>
            </Tabs.Panel>
            <Tabs.Panel value="yarn">
              <CodeBlock language="sh">yarn add @crossed/ui</CodeBlock>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </YBox>
    </YBox>
  );
}
