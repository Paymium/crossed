/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

type NestedKeys = 'shadowOffset' | 'transform' | 'textShadowOffset';

export type CrossedstyleView = Omit<ViewStyle, NestedKeys>;
export type CrossedstyleText = Omit<TextStyle, NestedKeys>;
export type CrossedstyleImage = Omit<ImageStyle, NestedKeys>;

export type AllAvailableStyles = CrossedstyleView &
  CrossedstyleText &
  CrossedstyleImage;

export interface CrossedstyleTheme {}
export interface CrossedstyleThemes extends Record<string, CrossedstyleTheme> {}

export type AllAvailableKeys = keyof AllAvailableStyles;

export type CrossedstyleValues = {
  [propName in AllAvailableKeys]?: AllAvailableStyles[propName];
};

export interface StyleSheet {}

export type CreateStyleParams = StyleSheet;

export type CreateStylesParams<K extends string> = Record<K, StyleSheet>;

export type PluginContext<S> = {
  /**
   * Key detected
   */
  key: keyof S;
  /**
   * style correspond of test key
   */
  styles: S[keyof S];

  /**
   * isWeb is true when plugin loaded by @crossed/loader
   */
  isWeb?: boolean;

  /**
   * props of component, only on runtime
   */
  props?: any;
  /**
   * Callback function for add className and style object
   * @returns {void}
   */
  addClassname: (_params: {
    /**
     * Add suffix on className
     * @returns {string} string to add as suffix
     */
    suffix?: string;
    /**
     * Add prefix on className
     * @returns {string} string to add as prefix
     */
    prefix?: string;
    wrapper?: (_str: string) => string;
    body: Record<string, CrossedstyleValues>;
  }) => void;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore S should exists
export interface CrossedPropsExtended<S extends StyleSheet> {} // eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars

export type Plugin<S = any> = {
  /**
   * Test of key, if true, apply plugin
   */
  test: string;

  /**
   * init plugin
   * @returns
   */
  init?: (_context: Omit<PluginContext<Required<S>>, 'key' | 'styles'>) => void;

  /**
   * apply transform on detected object
   * @returns
   */
  apply?: (_context: PluginContext<Required<S>>) => void;

  /**
   * add utils added in parsing
   * @returns
   */
  utils?: () => Record<string, any>;
  /**
   * driver to use
   * @returns
   */
  // useDriver?: () => any;
};
