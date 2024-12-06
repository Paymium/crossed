/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { CrossedPropsExtended, PluginContext } from '../types';
import { Registry } from '../Registry';
import { isWeb } from '../isWeb';
import { cache } from './cache';

export const apply = <S>(
  style: Record<string, any>,
  props: CrossedPropsExtended,
  addClassname: PluginContext<S>['addClassname']
) => {
  Registry.apply(() => style, {
    isWeb,
    props,
    addClassname,
    cache,
  });
};