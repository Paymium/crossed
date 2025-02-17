/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { YBox, Calendar } from '@crossed/ui';
import { createStyles } from '@crossed/styled';
import { FlatList } from 'react-native';
import { Card } from '@crossed/ui';

const styles = createStyles(() => ({
  scrollview: { base: { paddingHorizontal: 10, paddingVertical: 10 } },
  between: {
    base: {
      width: '100%',
      justifyContent: 'space-between',
    },
  },
  end: { base: { alignSelf: 'flex-end', flexDirection: 'row' } },
}));

const Example = () => {
  return (
    <Card>
      <Calendar />
    </Card>
  );
};

export default function CalendarScreen() {
  return (
    <FlatList
      contentContainerStyle={styles.scrollview.rnw().style}
      data={[]}
      ListHeaderComponent={
        <YBox alignItems="stretch" space="sm">
          <Example />
        </YBox>
      }
      renderItem={() => null}
    />
  );
}
