/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import '@/style.config';
import { H1, H2, P, Text, YBox, Ul, Li, B, Kbd } from '@crossed/ui';
import { Trans, useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <YBox role="main">
      <H1 id="introduction">{t('Introduction')}</H1>
      <P>
        <Trans>
          <Kbd>@crossed/styled</Kbd> is here to streamline your styling
          workflow, offering the same ease of use as style-components but with a
          cross-platform twist.
        </Trans>
      </P>
      <P>
        <Trans>
          Additionally, CSS simplifies maintenance and scalability, allowing for
          consistent style changes and design expansion as the website evolves.
        </Trans>
      </P>
      <H2 id="features">
        <Trans>Key Features</Trans>
      </H2>
      <Ul>
        <Li>
          <Text>
            <Trans>
              <B>Unified Codebase:</B> Maintain a single codebase to generate
              styles seamlessly for both React and React Native platforms.
            </Trans>
          </Text>
        </Li>
      </Ul>
    </YBox>
  );
}
