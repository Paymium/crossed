'use client';

import '@/types/unistyles';
import { Link } from '@/components/Link';
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
        <Li>
          <Text>
            <Trans>
              <B>Higher Order Component (HOC):</B> Unlock the power of hover,
              active, and focus states in your components effortlessly.
            </Trans>
          </Text>
        </Li>
        <Li>
          <Text>
            <Trans>
              <B>React-Native-Unistyles Integration:</B> Familiar with
              react-native-unistyles? Harness its potential with our library for
              an enhanced styling experience.
            </Trans>
          </Text>
        </Li>
      </Ul>
      <H2 id="dependencies">
        <Trans>Dependencies used</Trans>
      </H2>
      <Ul>
        <P>
          <Trans>Dependencies used in @crossed/styled</Trans>
        </P>
        <Li>
          <Link
            href="https://reactnativeunistyles.vercel.app/"
            hrefAttrs={{ target: '_blank' }}
          >
            react-native-unistyles
          </Link>
        </Li>
      </Ul>
    </YBox>
  );
}
