/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { Footer } from '@/components/Footer';
import { NavBar } from '@/components/NavBar';
import { createStyles } from '@crossed/styled';
import { FlatList } from 'react-native';

const styleSheet = createStyles(() => ({
  root: { base: { minHeight: '100%' } },
  container: {
    base: {
      // backgroundColor: t.colors.neutral['100'],
      minHeight: '100%',
      // display: 'flex',
    },
  },
}));

export const AppShell = ({ children }) => (
  <FlatList
    {...styleSheet.root.style()}
    ListHeaderComponent={<NavBar />}
    ListFooterComponent={<Footer />}
    data={[children]}
    renderItem={({ item }) => item as any}
    stickyHeaderIndices={[0]}
    contentContainerStyle={{ flex: 1 }}
  />
);
