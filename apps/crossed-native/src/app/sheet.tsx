/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { YBox, XBox, Select, Text, Sheet, Button } from '@crossed/ui';
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

export default function SheetScreen() {
  return (
    <FlatList
      contentContainerStyle={styles.scrollview.rnw().style}
      data={[]}
      ListHeaderComponent={
        <>
          <XBox alignItems="center" space="sm">
            <Sheet>
              <Sheet.Trigger asChild>
                <Button>
                  <Button.Text>basic</Button.Text>
                </Button>
              </Sheet.Trigger>
              <Sheet.Content>
                <Text>Hello world</Text>
                <Text>Hello world</Text>
              </Sheet.Content>
            </Sheet>
            <Sheet>
              <Sheet.Trigger asChild>
                <Button>
                  <Button.Text>Scrollview</Button.Text>
                </Button>
              </Sheet.Trigger>
              <Sheet.ScrollView>
                {Array.from(Array(100).keys()).map((i) => (
                  <Text key={`renderscrollviewvody-${i}`}>Description {i}</Text>
                ))}
              </Sheet.ScrollView>
            </Sheet>
          </XBox>
        </>
      }
      renderItem={() => null}
    />
  );
}
