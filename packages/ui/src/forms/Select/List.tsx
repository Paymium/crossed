/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
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
  View,
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
  const { onClose, open } = useFloatingContext();
  const { setValue, value: valueGlobal } = useSelectValue();
  const { multiple, section, showSheet } = useSelectConfig();
  const flatListRef = useRef<FlatList<string>>(null);
  const hasScrollMultiple = useRef(false);

  useEffect(() => {
    if (!open) hasScrollMultiple.current = false;
  }, [open]);
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
    ({ item, index }) => {
      const checked = item.checked;
      return (
        <MenuList.Item
          onLayout={(e) => {
            if (open && isChecked(item.value as any, valueGlobal as any)) {
              if ((multiple && !hasScrollMultiple.current) || !multiple) {
                flatListRef.current?.scrollToOffset({
                  offset: index * e.nativeEvent.layout.height,
                });
                hasScrollMultiple.current = true;
              }
            }
          }}
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
        ref={flatListRef as any}
        scrollEnabled
        data={dataTransformed}
        renderItem={RenderItem}
      />
    )
  ) : section ? (
    <SectionList
      ref={flatListRef as any}
      sections={dataTransformed}
      renderItem={RenderItem as any}
      renderSectionHeader={RenderLabel}
      stickySectionHeadersEnabled
    />
  ) : (
    <FlatList
      ref={flatListRef as any}
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
