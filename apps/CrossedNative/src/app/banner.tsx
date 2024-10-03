/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Banner, XBox, Divider, Button, YBox } from '@crossed/ui';
import { createStyles, inlineStyle } from '@crossed/styled';
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

export function BannerScreen() {
  return (
    <FlatList
      contentContainerStyle={styles.scrollview.rnw().style}
      data={[]}
      ListHeaderComponent={
        <YBox>
          <Banner>
            <XBox
              alignItems="center"
              space="sm"
              style={inlineStyle(() => ({ base: { flex: 1, flexShrink: 1 } }))}
            >
              <Banner.Icon />
              <Banner.Title>Title</Banner.Title>
            </XBox>
            <Banner.Action>
              <Button.Text>Action</Button.Text>
            </Banner.Action>
          </Banner>
          <Banner>
            <XBox
              alignItems="center"
              space="sm"
              style={inlineStyle(() => ({ base: { flex: 1, flexShrink: 1 } }))}
            >
              <Banner.Icon />
              <Banner.Title>Title</Banner.Title>
            </XBox>
            <Banner.Action>
              <Button.Text>Action</Button.Text>
            </Banner.Action>
          </Banner>
        </YBox>
      }
      ItemSeparatorComponent={Divider}
      renderItem={() => null}
    />
  );
}
