/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  CSSProperties,
  forwardRef,
  memo,
  RefAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Floating } from '../../overlay/Floating';
import { useSelectConfig, useSelectValue } from './context';
import {
  composeStyles,
  createStyles,
  inlineStyle,
  isWeb,
} from '@crossed/styled';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { FlatList, View } from 'react-native';
import { MenuList } from '../../display';
import { form } from '../../styles/form';
import { Input } from '../Input';
import Fuse from 'fuse.js';
import { useSelect } from './styles';
import { Focus } from './Focus';
import { useFloatingContext } from '../../overlay/Floating/context';
import { Checkbox } from '../Checkbox';
import { XBox } from '../../layout';
import { Sheet } from '../../overlay/Sheet';
import { ActionSheetRef } from '@crossed/sheet';
import { Item, ValueTypeMultiple } from './types';
import { Spinner } from '../../display/Spinner';
import { gapStyles } from '../../styles';
import { useMedia } from '../../useMedia';

const duration = 100;

const styles = createStyles(() => ({ dynamic: (e) => e }));

type SelectContentProps = {
  floatingStyles?: CSSProperties;
  onSearch?: (_search: string) => void;
  loading?: boolean;
};
export const SelectContent = memo<SelectContentProps & RefAttributes<View>>(
  forwardRef<View, SelectContentProps>(
    ({ floatingStyles, onSearch, loading }, ref) => {
      const { onClose, open } = useFloatingContext();
      const { items, setValue, value: valueGlobal } = useSelectValue();
      const { searchable, multiple } = useSelectConfig();
      const [search, setSearch] = useState<string>('');

      const fuse = useMemo(
        () =>
          new Fuse(items, {
            keys: ['search', 'value'],
          }),
        [items]
      );
      const children = useMemo(() => {
        return search && !onSearch
          ? fuse.search(search).map(({ item }) => item)
          : items;
      }, [fuse, search, items, onSearch]);

      const onPress = useCallback(
        (item: Item) => () => {
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

      const handleChangeSearch = useCallback(
        (value: string) => {
          setSearch(value);
          if (onSearch) onSearch(value);
        },
        [onSearch, setSearch]
      );

      useEffect(() => {
        if (!open) {
          totoRef.current?.hide();
          setSearch('');
        } else {
          totoRef.current?.show();
        }
      }, [open]);

      const renderItem = useCallback(
        ({ item }: { item: Item }) => {
          const checked =
            item.value === valueGlobal ||
            (Array.isArray(valueGlobal) &&
              valueGlobal.includes(item.value as any));
          return (
            <MenuList.Item
              style={composeStyles(
                useSelect.options,
                item.value === valueGlobal &&
                  inlineStyle(({ colors }) => ({
                    'base': { backgroundColor: colors.background.active },
                    ':hover': { backgroundColor: colors.background.active },
                  }))
              )}
              onPress={onPress(item)}
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

      const renderSearch = searchable ? (
        <Input
          formFieldStyle={inlineStyle(() => ({ base: { flexGrow: 0 } }))}
          value={search}
          onChangeText={handleChangeSearch}
          clearable
          autoFocus
        />
      ) : null;

      const totoRef = useRef<ActionSheetRef>();
      const { md } = useMedia();

      return (
        <Floating.Portal>
          {!md ? (
            <Sheet.Content
              ref={totoRef as any}
              onClose={onClose}
              snapPoints={searchable ? [100] : undefined}
              containerStyle={composeStyles(
                searchable &&
                  inlineStyle(() => ({
                    base: { height: '100%' },
                  }))
              )}
            >
              <Sheet.Padded testID={'content-select'}>
                <MenuList.Item>{renderSearch}</MenuList.Item>
                {loading ? (
                  <Spinner />
                ) : (
                  <Sheet.FlatList
                    scrollEnabled
                    data={children}
                    renderItem={renderItem as any}
                  />
                )}
              </Sheet.Padded>
            </Sheet.Content>
          ) : (
            <Focus
              onEscapeKey={onClose}
              onClickOutside={onClose}
              enabled={open}
            >
              <Floating.Content
                exiting={FadeOut.duration(duration)}
                entering={FadeIn.duration(duration)}
                style={composeStyles(
                  inlineStyle(({ boxShadow }) => ({
                    base: { zIndex: 100 },
                    web: { base: { boxShadow } },
                  }))
                )}
              >
                <MenuList
                  testID="content-select"
                  ref={ref}
                  style={composeStyles(
                    form.input,
                    useSelect.content,
                    inlineStyle(() => ({
                      web: { base: { overflowY: 'auto' } },
                    })),
                    styles.dynamic(floatingStyles) as any
                  )}
                >
                  {renderSearch}
                  {loading ? (
                    <Spinner />
                  ) : (
                    <FlatList
                      contentContainerStyle={gapStyles.xxs.style().style}
                      style={{ flex: 1 }}
                      data={children}
                      renderItem={renderItem}
                    />
                  )}
                </MenuList>
              </Floating.Content>
            </Focus>
          )}
        </Floating.Portal>
      );
    }
  )
);
