/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  YBox,
  H2,
  XBox,
  Button,
  ButtonText,
  Text,
  ButtonElement,
  Box,
} from '@crossed/ui';
import { createStyles } from '@crossed/styled';
import { ScrollView } from 'react-native';
import { Github } from '@crossed/unicons';

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
  { title: 'Error', props: { error: true } },
];

const variantList = [
  { title: 'Primary', props: { variant: 'primary' } },
  { title: 'Secondary', props: { variant: 'secondary' } },
  { title: 'Tertiary', props: { variant: 'tertiary' } },
] as const;

export default function TabOneScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollview.rnw().style}>
      <Button>
        <ButtonText>Button</ButtonText>
      </Button>
      {variantList.map(({ title: titleVariant, props: propsVariant }) => {
        return (
          <YBox space="lg" key={titleVariant}>
            <H2>{titleVariant}</H2>
            {states.map(({ title, props }) => {
              return (
                <XBox {...styles.between.rnw()} key={`${titleVariant}${title}`}>
                  <Text weight="semibold" size="lg">
                    {title}
                  </Text>
                  <Box {...styles.end.rnw()} space="sm">
                    <Button {...props} {...propsVariant}>
                      <ButtonText>Button</ButtonText>
                    </Button>
                    <Button {...props} {...propsVariant}>
                      <ButtonElement>
                        <Github />
                      </ButtonElement>
                      <ButtonText>Button</ButtonText>
                    </Button>
                  </Box>
                </XBox>
              );
            })}
          </YBox>
        );
      })}
    </ScrollView>
  );
}
