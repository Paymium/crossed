/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import {
  CrossedBasePlugin,
  CrossedMediaQueriesPlugin,
  CrossedPseudoClassPlugin,
  CrossedWebPlugin,
} from './plugins';

type NestedKeys = 'shadowOffset' | 'transform' | 'textShadowOffset';

export type CrossedstyleView = Omit<ViewStyle, NestedKeys>;
export type CrossedstyleText = Omit<TextStyle, NestedKeys>;
export type CrossedstyleImage = Omit<ImageStyle, NestedKeys>;

export type AllAvailableStyles = CrossedstyleView &
  CrossedstyleText &
  CrossedstyleImage;

export type AllAvailableKeys = keyof AllAvailableStyles;

export type CrossedstyleValues = {
  [propName in AllAvailableKeys]?: AllAvailableStyles[propName];
};

export interface StyleSheet
  extends CrossedBasePlugin,
    CrossedWebPlugin,
    CrossedPseudoClassPlugin,
    CrossedMediaQueriesPlugin {}

export type ExtractForProps<S extends CrossedMethods<any, any>> =
  S extends CrossedMethods<any, any>
    ? CrossedPropsExtended
    : S extends { original: any }
      ? CrossedPropsExtended
      : never;

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

  cache: Map<S[keyof S], any>;

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

export interface Themes {}

export type BaseCrossedPropsExtended = {
  'className'?: string;
  'style'?: CrossedstyleValues | CrossedstyleValues[];
  'focus'?: true | false;
  'hover'?: true | false;
  'active'?: true | false;
  'focus-visible'?: true | false;
  'disabled'?: true | false;
};

export interface CrossedPropsExtended extends BaseCrossedPropsExtended {}

export type CrossedMethods<S extends StyleSheet, P = CrossedPropsExtended> = {
  original: S;
  style: (_p?: P) => { style: Record<string, string> };
  className: (_p?: P) => { className: string };
  rnw: (_p?: P) => { style: Record<string, any> };
};

export type Plugin<S = any> = {
  /**
   * Test of key, if true, apply plugin
   */
  test: string[];

  name: string;

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
