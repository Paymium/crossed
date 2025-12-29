/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';

export interface HandleProps {
  style?: ViewStyle;
}

export const Handle: React.FC<HandleProps> = ({ style }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.indicator, style]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  indicator: {
    width: 36,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
  },
});
