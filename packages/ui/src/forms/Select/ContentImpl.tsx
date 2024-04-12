/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { isWeb } from '@crossed/styled';
import { ContentNative } from './ContentNative';
import { ContentWeb } from './ContentWeb';
import { useSelectProvider } from './context';
import { useMedia } from '../../useMedia';

export const ContentImpl = (props) => {
  const { adapt } = useSelectProvider();
  const { sm } = useMedia();
  return isWeb ? (
    !adapt ? (
      <ContentWeb {...props} />
    ) : sm ? (
      <ContentNative {...props} />
    ) : (
      <ContentWeb {...props} />
    )
  ) : (
    <ContentNative {...props} />
  );
};
