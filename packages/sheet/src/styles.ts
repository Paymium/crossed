/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  indicator: {
    height: 6,
    width: 45,
    borderRadius: 100,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    alignSelf: 'center',
  },
  parentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
