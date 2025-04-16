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
import {
  SelectConfigProvider,
  SelectValueProvider,
  useSelectConfig,
  useSelectValue,
} from './context';
import {
  composeStyles,
  createStyles,
  inlineStyle,
  useTheme,
} from '@crossed/styled';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { View } from 'react-native';
import { MenuList } from '../../display';
import { form } from '../../styles/form';
import { Input } from '../Input';
import Fuse from 'fuse.js';
import { useSelect } from './styles';
import { Focus } from './Focus';
import { useFloatingContext } from '../../overlay/Floating/context';
import { Sheet } from '../../overlay/Sheet';
import { ActionSheetRef } from '@crossed/sheet';
import { Spinner } from '../../display/Spinner';
import { gapStyles } from '../../styles';
import { List } from './List';

const duration = 100;

const styles = createStyles(() => ({ dynamic: (e) => e }));

type SelectContentProps = {
  floatingStyles?: CSSProperties;
  onSearch?: (_search: string) => void;
  loading?: boolean;
};

export const SelectContent = memo<SelectContentProps & RefAttributes<View>>(
  forwardRef(({ floatingStyles, onSearch, loading }, ref) => {
    useTheme();
    const { onClose, open } = useFloatingContext();
    const selectValue = useSelectValue();
    const { items } = selectValue;
    const configContext = useSelectConfig();
    const { searchable, showSheet } = configContext;
    const [search, setSearch] = useState<string>('');

    const handleChangeSearch = useCallback(
      (value: string) => {
        setSearch(value);
        if (onSearch) onSearch(value);
      },
      [onSearch, setSearch]
    );

    const fuse = useMemo(
      () =>
        new Fuse(items, {
          keys: ['search', 'value'],
        }),
      [items]
    );
    const data = useMemo(() => {
      return search && !onSearch
        ? fuse.search(search).map(({ item }) => item)
        : items;
    }, [fuse, search, items, onSearch]);

    useEffect(() => {
      if (!open) {
        totoRef.current?.hide();
        setSearch('');
      } else {
        totoRef.current?.show();
      }
    }, [open]);

    const renderSearch = searchable ? (
      <Input
        formFieldStyle={inlineStyle(({ space }) => ({
          base: {
            flexGrow: 0,
            marginTop: space.xxs,
            marginHorizontal: space.xs,
          },
        }))}
        value={search}
        onChangeText={handleChangeSearch}
        clearable
        autoFocus
      />
    ) : null;

    const totoRef = useRef<ActionSheetRef>();

    return (
      <>
        {showSheet ? (
          <Sheet.Content
            ref={totoRef as any}
            onClose={onClose}
            containerStyle={composeStyles(
              searchable &&
                inlineStyle(() => ({
                  base: { height: '100%' },
                }))
            )}
          >
            <Sheet.Padded testID={'content-select'}>
              <MenuList.Item>{renderSearch}</MenuList.Item>
              {loading ? <Spinner /> : <List data={data} />}
            </Sheet.Padded>
          </Sheet.Content>
        ) : (
          <Floating.Portal>
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
                <SelectConfigProvider {...configContext}>
                  <SelectValueProvider {...selectValue}>
                    <MenuList
                      testID="content-select"
                      ref={ref}
                      style={composeStyles(
                        form.input,
                        useSelect.content,
                        gapStyles.xs,
                        inlineStyle(() => ({
                          web: { base: { overflowY: 'auto' } },
                        })),
                        styles.dynamic(floatingStyles) as any
                      )}
                    >
                      {renderSearch}
                      {loading ? <Spinner /> : <List data={data} />}
                    </MenuList>
                  </SelectValueProvider>
                </SelectConfigProvider>
              </Floating.Content>
            </Focus>
          </Floating.Portal>
        )}
      </>
    );
  })
);
