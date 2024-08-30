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
} from './plugins';
import type * as CSS from 'csstype';

type NestedKeys = 'shadowOffset' | 'transform' | 'textShadowOffset';

// interface DeepArray<T> extends Array<T | DeepArray<T>> {}

type DeepArray<T> = {
  [K in keyof T]: T[K] extends number | string | symbol // Is it a primitive? Then make it readonly
    ? T[K]
    : // Is it an array of items? Then make the array readonly and the item as well
      T[K] extends Array<infer A>
      ? Array<DeepArray<A>>
      : // It is some other object, make it readonly as well
        DeepArray<T[K]>;
};

type ParamCompose = boolean | undefined | null | StyleSheet;
export type CrossedStyle = DeepArray<ParamCompose>;

export type ParamComposeIntern =
  | ParamCompose
  | (Record<string, any> & { $$css: true });

export type CrossedStyleIntern = DeepArray<ParamComposeIntern>;

export type CrossedStyleArray<T> = T | ReadonlyArray<CrossedStyleArray<T>>;

export type CrossedstyleView = Omit<ViewStyle, NestedKeys>;
export type CrossedstyleText = Omit<TextStyle, NestedKeys>;
export type CrossedstyleImage = Omit<ImageStyle, NestedKeys>;

export type AllAvailableStyles = CrossedstyleView &
  CrossedstyleText &
  CrossedstyleImage;

export type AllAvailableKeys = keyof AllAvailableStyles;

export type CrossedstyleValues =
  | {
      [propName in AllAvailableKeys]?: AllAvailableStyles[propName];
    }
  | CSS.Properties;

export interface StyleSheet
  extends CrossedBasePlugin,
    CrossedPseudoClassPlugin,
    CrossedMediaQueriesPlugin {}

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

  cache?: Map<S[keyof S], any>;

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
