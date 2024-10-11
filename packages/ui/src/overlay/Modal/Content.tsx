/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useContext } from 'react';
import { Floating } from '../Floating';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { modalStyles, sheetStyles } from '../styles';
import { createStyles } from '@crossed/styled';
import { localContext } from './context';
import { YBox, YBoxProps } from '../../layout/YBox';
import { useMedia } from '../../useMedia';
import { FlatList, ScrollView, SectionList } from 'react-native';
import { Text } from '../../typography/Text';

const styles = createStyles(() => ({
  sm: {
    media: {
      xs: { width: '90%', height: '50%' },
      md: { width: 560, height: 'auto' },
    },
  },
  md: {
    media: {
      xs: { width: '90%', height: '50%' },
      md: { width: 760, height: 'auto' },
    },
  },
  lg: {
    media: {
      xs: { width: '90%', height: '50%' },
      md: { width: 1024, height: 'auto' },
    },
  },
}));

export const ModalContent = ({ children, ...props }: YBoxProps) => {
  const { size } = useContext(localContext);
  const { md } = useMedia();
  return (
    <Floating.Portal
      style={inlineStyle(() => ({
        base: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }))}
    >
      <Floating.Overlay />
      <Floating.Content>
        <YBox
          {...composeStyles(
            inlineStyle(() => ({ base: { maxHeight: '100%' } })),
            md && modalStyles.content,
            md && styles[size],
            !md && sheetStyles.content
          ).rnw()}
        >
          <FlatList
            {...props}
            data={[children]}
            ListHeaderComponent={() => <Text>header</Text>}
            renderItem={({ item }) => item}
            stickyHeaderIndices={[0]}
          />
        </YBox>
      </Floating.Content>
    </Floating.Portal>
  );
};
ModalContent.displayName = 'Modal.Content';
