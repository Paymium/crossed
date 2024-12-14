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
import { visibility } from '../../styles/visibilityHidden';
import { Item, ValueTypeMultiple } from './types';
import { Checkbox } from '../Checkbox';
import { XBox } from '../../layout';
import { Adapt } from '../../other';
import { Sheet } from '../../overlay/Sheet';

const duration = 100;

const styles = createStyles(() => ({ dynamic: (e) => e }));

type SelectContentProps = {
  floatingStyles?: CSSProperties;
};
export const SelectContent = memo<SelectContentProps & RefAttributes<View>>(
  forwardRef<View, SelectContentProps>(({ floatingStyles }, ref) => {
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
      return search ? fuse.search(search).map(({ item }) => item) : items;
    }, [fuse, search, items]);

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

    useEffect(() => {
      if (!open) {
        setSearch('');
      }
    }, [open]);

    const renderItem = useCallback(
      ({ item }) => {
        const checked =
          item.value === valueGlobal ||
          (Array.isArray(valueGlobal) && valueGlobal.includes(item.value));
        return (
          <MenuList.Item
            style={composeStyles(
              useSelect.options,
              item.value === valueGlobal &&
                inlineStyle(({ colors }) => ({
                  base: { backgroundColor: colors.background.active },
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
        onChangeText={setSearch}
        clearable
        autoFocus
      />
    ) : null;

    const sheetRender = (
      <Sheet.Content
        padded={false}
        onClose={onClose}
        snapPoints={searchable ? [100] : undefined}
      >
        <MenuList.Item>{renderSearch}</MenuList.Item>
        <Sheet.FlatList
          scrollEnabled
          style={{ flex: 1 }}
          data={children}
          renderItem={renderItem}
        />
      </Sheet.Content>
    );

    return (
      <Floating.Portal>
        {isWeb ? (
          <Adapt size={'md'} fallback={sheetRender}>
            <Focus
              onEscapeKey={onClose}
              onClickOutside={onClose}
              enabled={open}
            >
              <Floating.VisibilityHidden
                exiting={FadeOut.duration(duration)}
                entering={FadeIn.duration(duration)}
                style={composeStyles(
                  inlineStyle(() => ({ base: { zIndex: 1 } }))
                )}
              >
                <MenuList
                  ref={ref}
                  style={composeStyles(
                    form.input,
                    useSelect.content,
                    inlineStyle(() => ({
                      web: { base: { overflowY: 'auto' } },
                    })),
                    !open && visibility.hidden,
                    styles.dynamic(floatingStyles)
                  )}
                >
                  {renderSearch}
                  <FlatList
                    style={{ flex: 1 }}
                    data={children}
                    renderItem={renderItem}
                  />
                </MenuList>
              </Floating.VisibilityHidden>
            </Focus>
          </Adapt>
        ) : (
          sheetRender
        )}
      </Floating.Portal>
    );
  })
);
