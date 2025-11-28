/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedMethods, StyleSheet, Themes } from './types';
import { Registry } from './Registry';
import { createMethods } from './createMethods';
import { isWeb } from './isWeb';

export const inlineStyle = <O extends StyleSheet>(
  stylesParam: (_theme: Themes[keyof Themes]) => O
): CrossedMethods<O> => {
  // styles calculés avec le thème actuel
  let current = stylesParam(Registry.getTheme(isWeb));

  // proxy renvoyé
  const proxy = new Proxy(createMethods(current), {
    get(_target, prop) {
      return createMethods(current)[
        prop as keyof ReturnType<typeof createMethods>
      ];
    },
  }) as CrossedMethods<O>;

  // sur mobile, on écoute les changements de thème
  if (!isWeb) {
    Registry.subscribe(() => {
      current = stylesParam(Registry.getTheme(isWeb));
    });
  }

  return proxy;
};
