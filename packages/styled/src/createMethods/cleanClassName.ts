/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

export const cleanClassName = (classNames: string[]) => {
  return classNames.reduce((acc, className) => {
    const [property] = className.match(/^([a-z\-:]+)\[/g) || [];

    if (property) {
      acc.forEach((accKey) => {
        const [same] =
          accKey.match(new RegExp(`^${property.replace('[', '\\[')}`, 'g')) ||
          [];

        if (same) {
          acc.delete(accKey);
        }
      });
    }
    acc.add(className);
    return acc;
  }, new Set<string>());
};
