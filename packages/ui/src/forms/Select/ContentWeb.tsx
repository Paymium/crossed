/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { MenuList } from '../../display/MenuList';
import { useSelectProvider } from './context';
import { form } from '../../styles/form';
import { useSelect } from './styles';
import type { ContentProps } from './types';
import { composeStyles, createStyles, inlineStyle } from '@crossed/styled';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Input } from '../Input';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, TextInput } from 'react-native';
import { SelectOption } from './Option';
import Fuse from 'fuse.js';

const duration = 100;
const styles = createStyles(() => ({ dynamic: (e) => e }));
export const ContentWeb = ({
  sheetProps,
  children: childrenProps,
  ...props
}: ContentProps) => {
  const { triggerLayout, open, searchable, refs, floatingStyles, items } =
    useSelectProvider();

  const inputRef = useRef<TextInput>();
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  const { width } = (triggerLayout.current as any) || {
    top: 0,
    height: 0,
    left: 0,
  };
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

  const renderItem = useCallback(({ item }) => {
    return (
      <SelectOption value={item.value}>
        <MenuList.Title>{item.label}</MenuList.Title>
      </SelectOption>
    );
  }, []);

  return open ? (
    <Animated.View
      exiting={FadeOut.duration(duration)}
      entering={FadeIn.duration(duration)}
      {...inlineStyle(() => ({ base: { zIndex: 1 } })).style()}
    >
      <MenuList
        {...(props as any)}
        ref={refs.setFloating as any}
        style={composeStyles(
          form.input,
          useSelect.content,
          inlineStyle(() => ({
            web: { base: { overflowY: 'auto' } },
          })),
          styles.dynamic({ ...floatingStyles, minWidth: width })
        )}
      >
        {searchable && (
          <MenuList>
            <Input
              ref={inputRef}
              value={search}
              onChangeText={setSearch}
              clearable
              autoFocus
            />
          </MenuList>
        )}
        <FlatList style={{ flex: 1 }} data={children} renderItem={renderItem} />
      </MenuList>
    </Animated.View>
  ) : null;
};

ContentWeb.id = 'Select.Content';
ContentWeb.displayName = 'Select.Content';
