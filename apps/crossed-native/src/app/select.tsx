/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Select, YBox } from '@crossed/ui';
import { createStyles } from '@crossed/styled';
import { FlatList } from 'react-native';
import { SelectProps } from '@crossed/ui';
import { countries } from './countriesFixtures.ts';

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

const Example = (props: Omit<SelectProps, 'items'>) => {
  return (
    <Select
      {...props}
      items={countries.map(({ name_fr, iso_alpha2 }) => ({
        value: iso_alpha2,
        label: name_fr,
      }))}
    />
  );
};

export default function TabOneScreen() {
  return (
    <FlatList
      contentContainerStyle={styles.scrollview.rnw().style}
      data={[]}
      ListHeaderComponent={
        <YBox alignItems="stretch" space="sm">
          <Example label={'Basic'} />
          <Example label={'Multiple'} multiple />
          <Example label={'Search'} searchable />
          <Example label={'Seach Multiple'} multiple searchable />
        </YBox>
      }
      renderItem={() => null}
    />
  );
}
