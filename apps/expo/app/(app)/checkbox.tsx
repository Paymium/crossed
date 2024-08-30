/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { YBox, Label, Checkbox, XBox } from '@crossed/ui';
import { createStyles } from '@crossed/styled';
import { FlatList } from 'react-native';

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
            <Checkbox>
              <Label>Label</Label>
            </Checkbox>
          </XBox>
        </>
      }
      ItemSeparatorComponent={() => <YBox style={{ height: 5 }} />}
      renderItem={() => null}
    />
  );
}
