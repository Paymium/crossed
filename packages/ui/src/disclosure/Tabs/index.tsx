/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { createRoot } from './Root';
import { createList } from './List';
import { createTab } from './Tab';
import { createPanel } from './Panel';
import { createIndicator } from './Indicator';
import { createContext } from './context';
import { ComponentProps, ReactNode, useMemo } from 'react';

export { type Instance } from './useTabs';

export const createTabs = () => {
  const {
    tabsContext: [TabsProvider, useTabsContext],
    triggerContext: [TriggerProvider, useTriggerContext],
  } = createContext();

  return withStaticProperties(createRoot(TabsProvider), {
    List: createList(useTabsContext),
    Tab: createTab({ TriggerProvider, useTabsContext, useTriggerContext }),
    Panel: createPanel(useTabsContext),
    Indicator: createIndicator(useTabsContext),
  });
};
export const Tabs = createTabs();

type Items = { value: string; title: string; panel: ReactNode };
type TabsPresetProps = ComponentProps<typeof Tabs> & { items: Items[] };
export const TabsPreset = ({ items, ...props }: TabsPresetProps) => {
  const { tabs, panels } = useMemo(() => {
    return items.reduce<{ tabs: ReactNode[]; panels: ReactNode[] }>(
      (acc, cur) => {
        acc.tabs.push(
          <Tabs.Tab value={cur.value} key={`${cur.value}-Tab`}>
            <Tabs.Tab.Text>{cur.title}</Tabs.Tab.Text>
          </Tabs.Tab>
        );
        acc.panels.push(
          <Tabs.Panel value={cur.value} key={`${cur.value}-panel`}>
            {cur.panel}
          </Tabs.Panel>
        );
        return acc;
      },
      { tabs: [], panels: [] }
    );
  }, [items]);
  return (
    <Tabs {...props}>
      <Tabs.List>
        <Tabs.Indicator />
        {tabs}
      </Tabs.List>
      {panels}
    </Tabs>
  );
};
