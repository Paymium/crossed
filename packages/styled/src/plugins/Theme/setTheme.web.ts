/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

export const setTheme = (old: string, theme: string) => {
  if (typeof window !== 'undefined') {
    window.document.documentElement.classList.remove(old);
    window.document.documentElement.classList.add(theme);
  }
};
