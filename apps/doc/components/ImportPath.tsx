import React, { useContext } from 'react';
import { Source, useOf } from '@storybook/blocks';

export const ImportPath = () => {
  const { preparedMeta } = useOf('meta') as any;

  return preparedMeta ? (
    <Source

      language="jsx"
      code={`import { ${preparedMeta.component.displayName} } from '@crossed/ui'`}
    />
  ) : null;
};

export default ImportPath;
