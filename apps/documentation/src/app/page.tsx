/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { Registry } from '@crossed/styled/registry';
import theme from '../../style.config';

Registry.setTheme(theme);
import { Logo } from '@/components/Logo';
import mq from '@crossed/styled/mq';
import { withStyle } from '@crossed/styled';
import { B, Button, Card, H1, H2, H3, Text } from '@crossed/ui';
import Link from 'next/link';
import { Trans, useTranslation } from 'react-i18next';
import { Github } from '@crossed/unicons/Github';
import { YBox } from '@crossed/ui/src';

const Description = withStyle(
  H2,
  {
    base: {
      textAlign: 'center',
      marginTop: 0,
      [mq.width(undefined, 'xs')]: { maxWidth: '90%' },
      [mq.width('xs')]: { maxWidth: '60%' },
    },
  },
  { native: true }
);
const SectionCTA = withStyle(
  YBox,
  {
    base: {
      marginTop: 30,
      alignItems: 'center',
      alignSelf: 'center',
      [mq.width(undefined, 'xl')]: {
        width: '90%',
      },
      [mq.width('xl')]: {
        width: '70%',
      },
    },
  },
  { native: true }
);

const ContainerButtonCta = withStyle(
  YBox,
  {
    base: {
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      [mq.width(undefined, 'sm')]: { flexDirection: 'column' },
      [mq.width('sm')]: { flexDirection: 'row' },
    },
  },
  { native: true }
);

export default function Home() {
  const { t } = useTranslation();
  return (
    <YBox
      role="main"
      style={{
        alignItems: 'center',
        paddingVertical: '50px',
        minHeight: '90%',
      }}
      space="lg"
    >
      <Logo size={100} />
      <H1 size={'4xl'}>Crossed</H1>
      <Description size="2xl" weight="medium">
        <Trans>
          Explore our ecosystem to develop cross-platform applications with
          <br />
          <B size="2xl">react-native</B> and <B size="2xl">react-native-web</B>
        </Trans>
      </Description>
      <Button
        role="link"
        href="https://github.com/Paymium/crossed"
        hrefAttrs={{
          target: '_blank',
        }}
      >
        <Button.Text>{t('Star us')}</Button.Text>
        <Button.Element>
          <Github />
        </Button.Element>
      </Button>
      <SectionCTA space="lg">
        <H3 textAlign="center">
          <Trans>Cross platform ecosystem</Trans>
        </H3>
        <ContainerButtonCta space="lg">
          <Link href="/styled/introduction" passHref legacyBehavior>
            <Card style={{ flex: 1 }} role="link">
              <Card.Title
                role="heading"
                aria-level={4}
                style={{ textAlign: 'center', marginBottom: theme.space.md }}
              >
                @crossed/styled
              </Card.Title>
              <Card.Description style={{ textAlign: 'center' }}>
                <Trans>Styled your component with unistyles</Trans>
              </Card.Description>
            </Card>
          </Link>
          <Link href="/primitive/introduction" passHref legacyBehavior>
            <Card style={{ flex: 1 }} role="link">
              <Card.Title
                role="heading"
                aria-level={4}
                style={{ textAlign: 'center', marginBottom: theme.space.md }}
              >
                @crossed/primitive
              </Card.Title>
              <Card.Description style={{ textAlign: 'center' }}>
                <Trans>Create your accessible component from anything</Trans>
              </Card.Description>
            </Card>
          </Link>
          <Link href="/ui/introduction" passHref legacyBehavior>
            <Card style={{ flex: 1 }} role="link">
              <Card.Title
                role="heading"
                aria-level={4}
                style={{ textAlign: 'center', marginBottom: theme.space.md }}
              >
                @crossed/ui
              </Card.Title>
              <Card.Description style={{ textAlign: 'center' }}>
                <Trans>
                  UI Component made with @crossed/primitive and @crossed/styled
                </Trans>
              </Card.Description>
            </Card>
          </Link>
          <Card style={{ flex: 1 }}>
            <Card.Title
              role="heading"
              aria-level={4}
              style={{ textAlign: 'center', marginBottom: theme.space.md }}
            >
              @crossed/router
            </Card.Title>
            <Card.Description style={{ textAlign: 'center' }}>
              <Trans>Comming soon</Trans>
            </Card.Description>
          </Card>
        </ContainerButtonCta>
      </SectionCTA>
    </YBox>
  );
}
