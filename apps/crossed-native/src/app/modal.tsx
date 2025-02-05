/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text, YBox, Modal } from '@crossed/ui';
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
  end: { base: { alignSelf: 'flex-end', flexDirection: 'row' } },
}));

const Example = () => {
  return (
    <Modal>
      <Modal.Trigger>
        <Text>Open</Text>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Text>content</Text>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Trigger>
            <Text>Close</Text>
          </Modal.Trigger>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default function ModalScreen() {
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
