/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { MenuList } from '../../display/MenuList';
import { Sheet } from '../../overlay/Sheet';
import { useSelectProvider } from './context';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { Input } from '../Input';
import { TextInput } from 'react-native';
import Fuse from 'fuse.js';
import { SelectOption } from './Option';

export const ContentNative = () => {
  const all = useSelectProvider();
  const { open, searchable, items, setOpen } = all;
  const refSheet = useRef(null);
  useEffect(() => {
    if (open) {
      refSheet.current.show();
    } else {
      setSearch('');
      refSheet.current.hide();
    }
  }, [open]);

  const inputRef = useRef<TextInput>();
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

  const renderItem = useCallback(({ item }) => {
    return (
      <SelectOption value={item.value}>
        <MenuList.Title>{item.label}</MenuList.Title>
      </SelectOption>
    );
  }, []);
  return (
    <Sheet ref={refSheet}>
      <Sheet.FlatList
        // renderScrollComponent={ScrollComponent}
        contentProps={{
          onClose: () => setOpen(false),
          snapPoints: searchable ? [100] : undefined,
          containerStyle: composeStyles(
            searchable && inlineStyle(() => ({ base: { height: '100%' } }))
          ),
        }}
        padded={false}
        style={{ flex: 1 }}
        data={children}
        renderItem={renderItem}
      >
        {searchable && (
          <MenuList.Item>
            <Input
              ref={inputRef}
              value={search}
              onChangeText={setSearch}
              clearable
              autoFocus
            />
          </MenuList.Item>
        )}
      </Sheet.FlatList>
    </Sheet>
  );
};

ContentNative.id = 'Select.Content';
ContentNative.displayName = 'Select.Content';
