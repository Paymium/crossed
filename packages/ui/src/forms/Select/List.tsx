/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { memo, useCallback, useMemo } from 'react';
import { ItemList, ValueTypeMultiple } from './types';
import { MenuList } from '../../display';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { Box } from '../../layout';
import { useSelectConfig, useSelectValue } from './context';
import { Sheet, useFloatingContext } from '../../overlay';
import { gapStyles, growStyles, justifyContentStyle } from '../../styles';
import {
  FlatListProps,
  SectionListProps,
  FlatList,
  SectionList,
} from 'react-native';
import { Check } from '@crossed/icons';

const isChecked = (
  value: string,
  valueGlobal: string | number | (string | number)[]
) => {
  return (
    value === valueGlobal ||
    (Array.isArray(valueGlobal) && valueGlobal.includes(value))
  );
};

export const List = memo(({ data }: { data: any }) => {
  const { onClose } = useFloatingContext();
  const { setValue, value: valueGlobal } = useSelectValue();
  const { multiple, section, showSheet } = useSelectConfig();

  const dataTransformed = useMemo(() => {
    if (section) {
      return data.map((d) => ({
        ...d,
        data: (d.data || []).map((item) => ({
          ...item,
          checked: isChecked(item.value, valueGlobal as any),
        })),
      }));
    }
    return data.map((item) => ({
      ...item,
      checked: isChecked(item.value, valueGlobal as any),
    }));
  }, [data, valueGlobal, section]);
  // console.log(dataTransformed[0].data)
  const onPress = useCallback(
    (item: ItemList) => () => {
      if (!multiple) onClose();
      if (multiple) {
        if (!valueGlobal || !Array.isArray(valueGlobal)) {
          setValue([item.value]);
        } else {
          const toto = valueGlobal as ValueTypeMultiple;
          setValue(
            toto.includes(item.value)
              ? toto.filter((t) => t !== item.value)
              : [...toto, item.value]
          );
        }
        return;
      }
      setValue(item.value);
    },
    [onClose, setValue, valueGlobal, multiple]
  );

  const RenderItem: FlatListProps<
    ItemList & { checked: boolean }
  >['renderItem'] = useCallback(
    ({ item }) => {
      const checked = item.checked;

      return (
        <MenuList.Item
          onPress={onPress(item)}
          style={justifyContentStyle.between}
          space={'xxs'}
        >
          <MenuList.Title style={growStyles.on}>{item.label}</MenuList.Title>
          {checked && (
            <Box alignSelf={'center'}>
              <Check size={16} color={'foreground.brand.primary.default'} />
            </Box>
          )}
        </MenuList.Item>
      );
    },
    [multiple, onPress]
  );

  const RenderLabel: SectionListProps<ItemList>['renderItem'] = useCallback(
    ({ section }) => {
      return (
        <MenuList.Label
          style={inlineStyle(({ colors, space }) => ({
            base: {
              backgroundColor: colors.background.primary.subtle,
              padding: space.sm,
            },
          }))}
        >
          {section.title}
        </MenuList.Label>
      );
    },
    []
  );

  return showSheet ? (
    section ? (
      <Sheet.SectionList
        scrollEnabled
        sections={dataTransformed}
        renderItem={RenderItem}
        renderSectionHeader={RenderLabel}
        stickySectionHeadersEnabled
      />
    ) : (
      <Sheet.FlatList
        scrollEnabled
        data={dataTransformed}
        renderItem={RenderItem}
      />
    )
  ) : section ? (
    <SectionList
      sections={dataTransformed}
      renderItem={RenderItem as any}
      renderSectionHeader={RenderLabel}
      stickySectionHeadersEnabled
    />
  ) : (
    <FlatList
      contentContainerStyle={
        composeStyles(
          gapStyles.xxs,
          inlineStyle(({ space }) => ({
            base: {
              paddingVertical: space.xs,
              paddingHorizontal: space.xs,
            },
          }))
        ).style().style
      }
      style={{ flex: 1 }}
      data={dataTransformed}
      renderItem={RenderItem}
    />
  );
});
