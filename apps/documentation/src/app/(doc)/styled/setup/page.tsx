/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import '@/style.config';
import { withDefaultProps } from '@crossed/core';
import { Banner, Card, H1, Select, Text, XBox } from '@crossed/ui';
import { CodeBlock } from '@/components/CodeBlock';
import { H2, P, createTabs, YBox } from '@crossed/ui';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { createStyles } from '@crossed/styled';

const Description = withDefaultProps(Text, {
  size: 'md',
  weight: 'medium',
});

const PlatformTabs = createTabs();
const BuilderTabs = createTabs();

const styles = createStyles(() => ({
  selectTrigger: {
    web: { base: { maxWidth: '150px', justifyContent: 'space-between' } },
  },
}));

export default function Home() {
  const { t } = useTranslation();
  const [platform, setPlatform] = useState<'web' | 'native'>('web');
  return (
    <PlatformTabs defaultValue="web" value={platform} onChange={setPlatform}>
      <BuilderTabs defaultValue="webpack">
        <H1>{t('Setup')}</H1>
        <Description>
          {t('Get @crossed/styled set up, step by step')}
        </Description>

        <Card>
          <PlatformTabs.Panels>
            <XBox space="xs">
              <Select value={platform} onChange={setPlatform}>
                <Select.Trigger {...styles.selectTrigger.rnw()}>
                  <Select.Value />
                </Select.Trigger>
                <Select.Content defaultValue="web">
                  <Select.Option value="web">
                    <Text>Web</Text>
                  </Select.Option>
                  <Select.Option value="native">
                    <Text>react-native</Text>
                  </Select.Option>
                </Select.Content>
              </Select>
              <YBox space="md">
                <BuilderTabs.List>
                  <BuilderTabs.Tab
                    value="webpack"
                    disabled={platform === 'native'}
                  >
                    <BuilderTabs.Tab.Text>webpack</BuilderTabs.Tab.Text>
                  </BuilderTabs.Tab>
                  <BuilderTabs.Tab
                    value="next"
                    disabled={platform === 'native'}
                  >
                    <BuilderTabs.Tab.Text>next</BuilderTabs.Tab.Text>
                  </BuilderTabs.Tab>
                </BuilderTabs.List>
              </YBox>
            </XBox>
          </PlatformTabs.Panels>

          <H2 id="install">{t('Install dependencies')}</H2>
          <PlatformTabs.Panels>
            <PlatformTabs.Panel value="web">
              <BuilderTabs.Panel value="webpack">
                <CodeBlock>pnpm i @crossed/styled @crossed/webpack</CodeBlock>
              </BuilderTabs.Panel>
              <BuilderTabs.Panel value="next">
                <CodeBlock>
                  pnpm i @crossed/styled @crossed/next-adapter
                </CodeBlock>
              </BuilderTabs.Panel>
            </PlatformTabs.Panel>
            <PlatformTabs.Panel value="native">
              <CodeBlock>pnpm i @crossed/styled</CodeBlock>
            </PlatformTabs.Panel>
          </PlatformTabs.Panels>

          <BuilderTabs.Panels>
            <PlatformTabs.Panel value="web">
              <H2 id="configure">{t('Configure builder')}</H2>
              <BuilderTabs.Panel value="webpack">
                <CodeBlock fileName="next.config.js">{`
const StylePlugin = require('@crossed/webpack');

module.exports = {
  /** your webpack config **/
  plugins: [new StylePlugin({ configPath: './src/style.config.ts' })]
};
              `}</CodeBlock>
              </BuilderTabs.Panel>
              <BuilderTabs.Panel value="next">
                <CodeBlock fileName="next.config.js">{`
const withCrossed = require('@crossed/next-adapter');


const nextConfig = withCrossed({
  configPath: './src/style.config.ts',
})({ /** your next config here */ });

module.exports = nextConfig;
              `}</CodeBlock>
              </BuilderTabs.Panel>
            </PlatformTabs.Panel>
          </BuilderTabs.Panels>

          <H2 id="install">{t('Init registry')}</H2>
          <P>{t('Create style.config.ts file')}</P>
          <CodeBlock fileName="./src/style.config.ts">{`
import { Registry } from '@crossed/styled';

// add base plugin or add yours
const themes = {
  dark: { colorText: "white" },
  light: { colorText: "black" },
};
type CustomThemes = typeof themes;

Registry.setThemes(themes).setThemeName("dark");

declare module '@crossed/styled' {
  export interface Themes extends CustomThemes {}
}

              `}</CodeBlock>

          <PlatformTabs.Panel value="web">
            <BuilderTabs.Panel value="webpack">
              <Text>
                {t('And import this file only once in your entry file')}
              </Text>
              <CodeBlock fileName="./App.ts">
                import "./style.config";
              </CodeBlock>
            </BuilderTabs.Panel>
            <BuilderTabs.Panel value="next">
              <Text>{t('And import this file in your _app.tsx')}</Text>
              <CodeBlock fileName="./App.ts">
                import "./style.config";
              </CodeBlock>
              <Banner status="warning">
                <YBox>
                  <Banner.Title>{t('Only for app Router')}</Banner.Title>
                  <Banner.Description>
                    {t(
                      'You should import style.config on your _layout root file (for server component) and in your global client component (generaly theme context provider)'
                    )}
                  </Banner.Description>
                </YBox>
              </Banner>
            </BuilderTabs.Panel>

            <H2 id="usage">{t('importCss')}</H2>
            <CodeBlock fileName="style.css">
              {`
@import "node_modules/crossed.css";
`}
            </CodeBlock>
          </PlatformTabs.Panel>

          <YBox space="md">
            <H2 id="usage">{t('Usage')}</H2>
            <CodeBlock fileName="foo.tsx">
              {`
import { createStyles } from '@crossed/styled';
import { Text } from "react-native";

const styles = createStyles((t) => ({
  root: {
    base: { color: t.colorText }
  }
}));

function App () {
  return (
    <>
      {/* react-native + web */}
      <Text {...styles.root.style()}>Hello World!</Text>

      {/* react-native + web */}
      <Text {...styles.root.rnw()}>Hello World!</Text>

      {/* web */}
      <p {...styles.root.className()}>Hello World!</p>
    </>
  );
}
`}
            </CodeBlock>
          </YBox>
        </Card>
      </BuilderTabs>
    </PlatformTabs>
  );
}
