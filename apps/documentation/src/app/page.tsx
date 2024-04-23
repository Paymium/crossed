/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import '@/style.config';
import { Logo } from '@/components/Logo';
import { createStyles } from '@crossed/styled';
import {
  B,
  Box,
  Button,
  ButtonIcon,
  Card,
  H1,
  H2,
  H3,
  YBox,
} from '@crossed/ui';
import Link from 'next/link';
import { Trans, useTranslation } from 'react-i18next';
import { Github } from '@crossed/unicons/Github';

const useStyles = createStyles((t) => ({
  description: {
    base: { textAlign: 'center', marginTop: 0 },
    media: { xs: { width: '90%' }, md: { width: '60%' } },
  },
  sectionCta: {
    base: {
      marginTop: 30,
      marginHorizontal: 'auto',
      alignItems: 'center',
      alignSelf: 'center',
    },
    media: { xs: { width: '90%' }, xl: { width: '70%' } },
  },
  containerButtonCta: {
    base: {
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    media: { md: { flexDirection: 'row' } },
  },
  card: { base: { flexShrink: 1, flexBasis: 0, flexGrow: 1 } },
  title: {
    base: {
      textAlign: 'center',
    },
  },
  container: {
    base: {
      flexDirection: 'column',
      alignItems: 'center',
      paddingVertical: 50,
      flex: 1,
      backgroundColor: t.colors.neutral[300],
    },
  },
  cardTitle: {
    base: { textAlign: 'center' },
  },
  cardDescription: { base: { textAlign: 'center' } },
}));

export default function Home() {
  const { t } = useTranslation();
  return (
    <Box role="main" {...useStyles.container.rnw()} space="lg">
      <Logo size={100} />
      <H1 size={'md'}>Crossed</H1>
      <H2 size="md" weight="medium" {...useStyles.description.rnw()}>
        <Trans>
          Explore our ecosystem to develop cross-platform applications with
          <br />
          <B size="md">react-native</B> and <B size="md">react-native-web</B>
        </Trans>
      </H2>
      <Button
        role="link"
        href="https://github.com/Paymium/crossed"
        hrefAttrs={{
          target: '_blank',
        }}
      >
        <Button.Text>{t('Star us')}</Button.Text>
        <ButtonIcon>
          <Github />
        </ButtonIcon>
      </Button>
      <YBox space="lg" {...useStyles.sectionCta.rnw()}>
        <H3 {...useStyles.title.rnw()}>
          <Trans>Cross platform ecosystem</Trans>
        </H3>
        <Box space="sm" {...useStyles.containerButtonCta.rnw()}>
          <Link href="/styled/introduction" passHref legacyBehavior>
            <Card {...useStyles.card.rnw()} role="link" space="xxs">
              <Card.Title
                role="heading"
                aria-level={4}
                {...useStyles.cardTitle.rnw()}
              >
                @crossed/styled
              </Card.Title>
              <Card.Description {...useStyles.cardDescription.rnw()}>
                <Trans>Styled your component</Trans>
              </Card.Description>
            </Card>
          </Link>
          <Link href="/primitive/introduction" passHref legacyBehavior>
            <Card {...useStyles.card.rnw()} role="link" space="xxs">
              <Card.Title
                role="heading"
                aria-level={4}
                {...useStyles.cardTitle.rnw()}
              >
                @crossed/primitive
              </Card.Title>
              <Card.Description {...useStyles.cardDescription.rnw()}>
                <Trans>Create your accessible component from anything</Trans>
              </Card.Description>
            </Card>
          </Link>
          <Link href="/ui/introduction" passHref legacyBehavior>
            <Card {...useStyles.card.rnw()} role="link" space="xxs">
              <Card.Title
                role="heading"
                aria-level={4}
                {...useStyles.cardTitle.rnw()}
              >
                @crossed/ui
              </Card.Title>
              <Card.Description {...useStyles.cardDescription.rnw()}>
                <Trans>
                  UI Component made with @crossed/primitive and @crossed/styled
                </Trans>
              </Card.Description>
            </Card>
          </Link>
          {/* <Card {...useStyles.card.rnw()}>
            <Card.Title
              role="heading"
              aria-level={4}
              {...useStyles.cardTitle.rnw()}
            >
              @crossed/router
            </Card.Title>
            <Card.Description {...useStyles.cardDescription.rnw()}>
              <Trans>Comming soon</Trans>
            </Card.Description>
          </Card> */}
        </Box>
      </YBox>
    </Box>
  );
}
