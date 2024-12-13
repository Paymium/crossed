/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { MenuList } from '../../display/MenuList';
import { Sheet } from '../../overlay/Sheet';
import { useSelectProvider } from './context';
import type { ContentProps } from './types';
import {
  Children,
  isValidElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { Input } from '../Input';
import { ScrollView, TextInput } from 'react-native';
import Fuse from 'fuse.js';
import { SelectOption } from './Option';

const ScrollComponent = (props) => {
  return (
    <MenuList
      {...(props as any)}
      style={composeStyles(
        inlineStyle(({ space }) => ({
          base: { borderWidth: 0, marginBottom: space.md, flexShrink: 1 },
        }))
      )}
    >
      <ScrollView {...props} />
    </MenuList>
  );
};

export const ContentNative = ({ children: childrenProps }: ContentProps) => {
  const all = useSelectProvider();
  const { open, searchable, label, setOpen } = all;
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

  const childrenOption = useMemo(() => {
    const children = Children.toArray(childrenProps);
    return children.reduce<ReactNode[]>((acc, c) => {
      if (isValidElement(c) && c.type === SelectOption) {
        acc.push(c);
      }
      return acc;
    }, []);
  }, [searchable, childrenProps]);

  const fuse = useMemo(
    () => new Fuse(childrenOption, { keys: ['props.search', 'props.value'] }),
    [childrenOption]
  );

  const children = useMemo(() => {
    return search
      ? fuse.search(search).map(({ item }) => item)
      : childrenOption;
  }, [fuse, search, childrenOption]);

  const renderItem = useCallback(({ item }) => item, []);
  return (
    <Sheet ref={refSheet}>
      <Sheet.FlatList
        stickyHeaderIndices={searchable ? [0] : []}
        renderScrollComponent={ScrollComponent}
        contentProps={{
          onClose: () => setOpen(false),
          snapPoints: searchable ? [100] : undefined,
          containerStyle: composeStyles(
            searchable && inlineStyle(() => ({ base: { height: '100%' } }))
          ),
        }}
        data={
          searchable
            ? [
                <Input
                  ref={inputRef}
                  value={search}
                  onChangeText={setSearch}
                  clearable
                />,
                ...children,
              ]
            : label
              ? [<MenuList.Label>{label}</MenuList.Label>, ...children]
              : children
        }
        renderItem={renderItem}
      />
    </Sheet>
  );
};

ContentNative.id = 'Select.Content';
ContentNative.displayName = 'Select.Content';
