/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { YBox, XBox, Select, Text } from '@crossed/ui';
import { createStyles } from '@crossed/styled';
import { FlatList } from 'react-native';
import { ChevronDown } from '@crossed/unicons';

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

export default function TabOneScreen() {
  return (
    <FlatList
      contentContainerStyle={styles.scrollview.rnw().style}
      data={[]}
      ListHeaderComponent={
        <>
          <XBox alignItems="center" space="sm">
            <Select defaultValue="en">
              <Select.Trigger>
                <XBox alignItems="center" justifyContent="between">
                  <Text>
                    <Select.Value />
                  </Text>
                  <ChevronDown />
                </XBox>
              </Select.Trigger>
              <Select.Content>
                <Select.Option value="fr">
                  <Text>🇫🇷 Français</Text>
                </Select.Option>
                <Select.Option value="en">
                  <Text>🇬🇧 Anglais</Text>
                </Select.Option>
              </Select.Content>
            </Select>
          </XBox>
        </>
      }
      ItemSeparatorComponent={() => <YBox style={{ height: 5 }} />}
      renderItem={() => null}
    />
  );
}
