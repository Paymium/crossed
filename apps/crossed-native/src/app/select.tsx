/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { XBox, Select, Text, YBox } from '@crossed/ui';
import { createStyles } from '@crossed/styled';
import { FlatList } from 'react-native';
import { SelectProps } from '@crossed/ui';
import { useId } from 'react';

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

const countries = [
  '🇫🇷 Français',
  '🇬🇧 Anglais',
  '🇩🇪 Allemagne',
  '🇯🇵 Japon',
  '🇨🇲 Cameroun',
  '🇪🇸 Espagne',
  '🇬🇷 Grèce',
  '🇸🇪 Suède',
  '🇲🇽 Mexique',
  '🇳🇴 Norvège',
  '🇱🇺 Luxembourg',
  '🇲🇶 Martinique',
  '🇱🇹 Lituanie',
  '🇲🇨 Monaco',
  '🇳🇿 Nouvelle-Zélande',
  '🇮🇪 Irlande',
  '🇰🇭 Cambodge',
  '🇮🇸 Islande',
  '🇪🇺 Union Européenne',
  '🇨🇭 Suisse',
];

const Example = (props: SelectProps) => {
  const id = useId();
  return (
    <Select {...props}>
      <Select.Trigger>
        <XBox alignItems="center" justifyContent="between">
          <Text>
            <Select.Value />
          </Text>
        </XBox>
      </Select.Trigger>
      <Select.Content>
        {countries.map((country) => (
          <Select.Option
            key={`${id}-${country}`}
            value={country}
            search={country}
          >
            <Text>{country}</Text>
          </Select.Option>
        ))}
      </Select.Content>
    </Select>
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
