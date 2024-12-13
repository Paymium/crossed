/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text, YBox } from '@crossed/ui';
import { createStyles } from '@crossed/styled';
import { FlatList } from 'react-native';
import { Tooltip } from '@crossed/ui';

const styles = createStyles(() => ({
  scrollview: { base: { paddingHorizontal: 10, paddingVertical: 10 } },
  between: {
    base: {
      width: '100%',
      justifyContent: 'space-between',
    },
  },
  end: { base: { alignSelt: 'flex-end', flexDirection: 'row' } },
}));

export default function TooltipScreen() {
  return (
    <FlatList
      contentContainerStyle={styles.scrollview.rnw().style}
      data={[]}
      ListHeaderComponent={
        <YBox alignItems="stretch" space="sm">
          <Tooltip>
            <Tooltip.Trigger>
              <Text>click me</Text>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <Tooltip.Text>Content</Tooltip.Text>
            </Tooltip.Content>
          </Tooltip>
        </YBox>
      }
      renderItem={() => null}
    />
  );
}
