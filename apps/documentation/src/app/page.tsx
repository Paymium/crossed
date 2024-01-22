/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import '@/types/unistyles';
import { Logo } from '@/components/Logo';
import { createStyleSheet, mq, styled, useStyles } from '@crossed/styled';
import { B, Button, Card, H1, H2, H3, YBox } from '@crossed/ui';
import Link from 'next/link';
import { Trans, useTranslation } from 'react-i18next';
import { Github } from '@crossed/unicons/Github';

const Description = styled(H2, {
  textAlign: 'center',
  marginTop: 0,
  maxWidth: {
    [mq.only.width(undefined, 'xs')]: '90%',
    [mq.only.width('xs')]: '60%',
  },
});
const SectionCTA = styled(
  YBox,
  {
    marginTop: 30,
    alignItems: 'center',
    alignSelf: 'center',
    width: {
      [mq.only.width(undefined, 'xl')]: '90%',
      [mq.only.width('xl')]: '70%',
    },
  },
  { name: 'SectionCTA' }
);

const ContainerButtonCta = styled(
  YBox,
  {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: {
      [mq.only.width(undefined, 'sm')]: 'column',
      [mq.only.width('sm')]: 'row',
    },
  },
  { name: 'ContainerButtonCta' }
);

export default function Home() {
  const { styles } = useStyles(styleSheet);
  const { t } = useTranslation();

  return (
    <YBox role="main" style={styles.container} space="lg">
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
            <Card style={styles.card} role="link">
              <Card.Title
                role="heading"
                aria-level={4}
                style={styles.cardTitle}
              >
                @crossed/styled
              </Card.Title>
              <Card.Description style={styles.cardDescription}>
                <Trans>Styled your component with unistyles</Trans>
              </Card.Description>
            </Card>
          </Link>
          <Link href="/primitive/introduction" passHref legacyBehavior>
            <Card style={styles.card} role="link">
              <Card.Title
                role="heading"
                aria-level={4}
                style={styles.cardTitle}
              >
                @crossed/primitive
              </Card.Title>
              <Card.Description style={styles.cardDescription}>
                <Trans>Create your accessible component from anything</Trans>
              </Card.Description>
            </Card>
          </Link>
          <Link href="/ui/introduction" passHref legacyBehavior>
            <Card style={styles.card} role="link">
              <Card.Title
                role="heading"
                aria-level={4}
                style={styles.cardTitle}
              >
                @crossed/ui
              </Card.Title>
              <Card.Description style={styles.cardDescription}>
                <Trans>
                  UI Component made with @crossed/primitive and @crossed/styled
                </Trans>
              </Card.Description>
            </Card>
          </Link>
          <Card style={styles.card}>
            <Card.Title role="heading" aria-level={4} style={styles.cardTitle}>
              @crossed/router
            </Card.Title>
            <Card.Description style={styles.cardDescription}>
              <Trans>Comming soon</Trans>
            </Card.Description>
          </Card>
        </ContainerButtonCta>
      </SectionCTA>
    </YBox>
  );
}

const styleSheet = createStyleSheet((t) => ({
  container: { alignItems: 'center', paddingVertical: 50, minHeight: '90%' },
  card: { flex: 1 },
  cardTitle: { textAlign: 'center', marginBottom: t.space.md },
  cardDescription: { textAlign: 'center' },
}));
