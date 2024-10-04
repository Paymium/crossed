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
