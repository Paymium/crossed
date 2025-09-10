/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ImplementationComponent } from './type';
import { VisibilityHidden } from '../../other';

export const Implementation: ImplementationComponent = ({
  checked,
  setChecked,
}) => {
  return (
    <VisibilityHidden hide>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    </VisibilityHidden>
  );
};
