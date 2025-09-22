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
import { XBox } from '../../layout';
import { Checkbox } from '../Checkbox';
import { useSelectConfig, useSelectValue } from './context';
import { Sheet, useFloatingContext } from '../../overlay';
import { gapStyles } from '../../styles';
import {
  FlatListProps,
  SectionListProps,
  FlatList,
  SectionList,
} from 'react-native';

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
          style={
            checked &&
            inlineStyle(({ colors }) => ({
              'base': { backgroundColor: colors.background.active },
              ':hover': { backgroundColor: colors.background.active },
            }))
          }
        >
          <XBox space={'xxs'}>
            {multiple && (
              <Checkbox checked={checked} onChecked={onPress(item)} />
            )}
            <MenuList.Title>{item.label}</MenuList.Title>
          </XBox>
        </MenuList.Item>
      );
    },
    [onPress, multiple]
  );

  const RenderLabel: SectionListProps<ItemList>['renderItem'] = useCallback(
    ({ section }) => {
      return (
        <MenuList.Label
          style={inlineStyle(({ colors }) => ({
            base: { backgroundColor: colors.background.primary },
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
