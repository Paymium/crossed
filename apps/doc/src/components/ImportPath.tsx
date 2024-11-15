/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React from 'react';
import { Source, useOf } from '@storybook/blocks';

export const ImportPath = () => {
  const { preparedMeta } = useOf('meta') as any;

  return preparedMeta ? (
    <Source
      language="jsx"
      code={`import { ${preparedMeta.component?.displayName} } from '@crossed/ui'`}
    />
  ) : null;
};

export default ImportPath;
