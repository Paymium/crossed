/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import {
  YBox,
  H2,
  XBox,
  Button,
  ButtonText,
  Text,
  Box,
  ButtonIcon,
  Divider,
} from '@crossed/ui';
import { createStyles, inlineStyle } from '@crossed/styled';
import { SectionList } from 'react-native';
import { Github } from '@crossed/unicons';
// import {Github} from '@crossed/unicons';

const styles = createStyles(() => ({
  scrollview: { base: { paddingHorizontal: 10, paddingVertical: 10 } },
  between: {
    base: {
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  end: { base: { alignSelt: 'flex-end', flexDirection: 'row' } },
}));

const states = [
  { title: 'Default', props: {} },
  { title: 'Hover', props: { hover: true } },
  { title: 'Active', props: { active: true } },
  { title: 'Disabled', props: { disabled: true } },
  { title: 'Loading', props: { loading: true } },
  { title: 'Error', props: { error: true } },
  { title: 'Error loading', props: { error: true, loading: true } },
];

const variantList = [
  { title: 'Primary', props: { variant: 'primary' }, data: states },
  { title: 'Secondary', props: { variant: 'secondary' }, data: states },
  { title: 'Tertiary', props: { variant: 'tertiary' }, data: states },
] as const;

export default function ButtonScreen() {
  return (
    <SectionList
      contentContainerStyle={styles.scrollview.rnw().style}
      sections={variantList}
      ListHeaderComponent={
        <Button>
          <ButtonText>Button</ButtonText>
        </Button>
      }
      ItemSeparatorComponent={() => (
        <YBox style={inlineStyle(() => ({ base: { height: 5 } }))} />
      )}
      SectionSeparatorComponent={Divider}
      renderItem={({
        item: { title, props },
        section: { title: titleVariant, props: propsVariant },
      }) => (
        <XBox style={styles.between} key={`${titleVariant}${title}`}>
          <Text weight="h1">{title}</Text>
          <Box style={styles.end} space="sm">
            <Button {...props} {...propsVariant}>
              <ButtonText>Button</ButtonText>
            </Button>
            <Button {...props} {...propsVariant}>
              <ButtonIcon>
                <Github />
              </ButtonIcon>
              <ButtonText>Button</ButtonText>
            </Button>
          </Box>
        </XBox>
      )}
      renderSectionHeader={({ section: { title } }) => <H2>{title}</H2>}
    />
  );
}
