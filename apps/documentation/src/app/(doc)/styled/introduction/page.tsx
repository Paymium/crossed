"use client";

import '@/types/unistyles';
import { Link } from '@/components/Link';
import { H1, H2, P, Text, YBox, Ul, Li, B, Kbd } from '@crossed/ui';
import { Trans, useTranslation } from 'react-i18next';



export default function Home() {
  const { t, ...other } = useTranslation();
  console.log(other)
  return (
    <YBox role="main">
      <H1 id="introduction">{t('Introduction')}</H1>
      <P>
        <Trans><Kbd>@crossed/styled</Kbd> is here to streamline your styling workflow, offering the same ease of use as style-components but with a cross-platform twist.</Trans>
        {/* {t('@crossed/styled is here to streamline your styling workflow, offering the same ease of use as style-components but with a cross-platform twist.')} */}
        {/* <Kbd>@crossed/styled</Kbd> is here to streamline your styling workflow,
        offering the same ease of use as style-components but with a
        cross-platform twist. */}
      </P>
      <P>
        Additionally, CSS simplifies maintenance and scalability, allowing for
        consistent style changes and design expansion as the website evolves.
      </P>
      <H2 id="features">Key Features</H2>
      <Ul>
        <Li>
          <Text>
            <B>Unified Codebase:</B> Maintain a single codebase to generate
            styles seamlessly for both React and React Native platforms.
          </Text>
        </Li>
        <Li>
          <Text>
            <B>Higher Order Component (HOC):</B> Unlock the power of hover,
            active, and focus states in your components effortlessly.
          </Text>
        </Li>
        <Li>
          <Text>
            <B>React-Native-Unistyles Integration:</B> Familiar with
            react-native-unistyles? Harness its potential with our library for
            an enhanced styling experience.
          </Text>
        </Li>
      </Ul>
      <H2 id="dependencies">Dependencies used</H2>
      <Ul>
        <P>Dependencies used in @crossed/styled</P>
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
