/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { YBox, Label, Input } from '@crossed/ui';
import { createStyles, inlineStyle } from '@crossed/styled';
import { FlatList } from 'react-native';
import { useInteraction } from '@crossed/styled/plugins';

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

const states = [
  { title: 'Default', props: {} },
  { title: 'Hover', props: { hover: true } },
  { title: 'Focus', props: { focus: true } },
  { title: 'Disabled', props: { disabled: true } },
  { title: 'Error', props: { error: true } },
];

const ItemSeparator = () => (
  <YBox style={inlineStyle(() => ({ base: { height: 5 } }))} />
);

export default function TabOneScreen() {
  const { state, props } = useInteraction();
  return (
    <FlatList
      contentContainerStyle={styles.scrollview.rnw().style}
      data={states}
      ListHeaderComponent={
        <>
          <Label {...state} {...props}>
            Label
          </Label>
          <Input {...state} {...props} placeholder="Placeholder" />
        </>
      }
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item: { title, props: itemProps } }) => (
        <YBox {...styles.between.rnw()} key={`${title}`} space="xs">
          <Label weight="semibold" {...itemProps}>
            {title}
          </Label>
          <Input {...itemProps} placeholder="Placeholder" />
          <Input {...itemProps} value={'Type something'} />
        </YBox>
      )}
    />
  );
}
