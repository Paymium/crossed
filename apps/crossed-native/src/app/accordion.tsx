/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  AccordionIcon,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  Text,
  Divider,
} from '@crossed/ui';
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
        <Accordion defaultValues={['1']} allowMultiple>
          <AccordionItem value="1">
            <AccordionTrigger>
              <Text>title 1</Text>
              <AccordionIcon />
            </AccordionTrigger>
            <AccordionPanel>
              <Text>content 1</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionTrigger>
              <Text>title 2</Text>
              <AccordionIcon />
            </AccordionTrigger>
            <AccordionPanel>
              <Text>content 2</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      }
      ItemSeparatorComponent={Divider}
      renderItem={() => null}
    />
  );
}
