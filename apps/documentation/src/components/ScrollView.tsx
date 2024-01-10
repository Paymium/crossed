'use client';
import { ScrollView as NScrollView, ScrollViewProps } from 'react-native';
import { NavBar } from './NavBar';

export const ScrollView = (props: ScrollViewProps) => (
  <NScrollView StickyHeaderComponent={NavBar} {...props} />
);
