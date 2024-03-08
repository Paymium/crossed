/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { Logo } from '@/components/Logo';
import { createStyle, useStyle, withStyle } from '@crossed/styled';
import { B, Box, Button, Card, H1, H2, H3 } from '@crossed/ui';
import Link from 'next/link';
import { Trans, useTranslation } from 'react-i18next';
import { Github } from '@crossed/unicons/Github';

const Description = withStyle(H2, {
  base: { textAlign: 'center', marginTop: 0 },
  media: { xs: { width: '90%' }, md: { width: '60%' } },
});

const SectionCTA = withStyle(Box, {
  base: {
    marginTop: 30,
    marginHorizontal: 'auto',
    alignItems: 'center',
    alignSelf: 'center',
  },
  media: { xs: { width: '90%' }, xl: { width: '70%' } },
});

const ContainerButtonCta = withStyle(Box, {
  base: { justifyContent: 'space-between', flexWrap: 'wrap' },
  media: { xs: { flexDirection: 'column' }, md: { flexDirection: 'row' } },
});

const CardStyled = withStyle(Card, { base: { flex: 1 } });

const containerStyle = createStyle({
  base: {
    alignItems: 'center',
    paddingVertical: 50,
    minHeight: '90%',
  },
});

const titleActionStyle = createStyle({
  base: {
    textAlign: 'center',
  },
});

export default function Home() {
  const { t } = useTranslation();
  const { theme, style } = useStyle(containerStyle);
  const { style: titleStyle } = useStyle(titleActionStyle);

  return (
    <Box role="main" style={style} space="lg">
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
        <H3 style={titleStyle}>
          <Trans>Cross platform ecosystem</Trans>
        </H3>
        <ContainerButtonCta space="lg">
          <Link href="/styled/introduction" passHref legacyBehavior>
            <CardStyled role="link">
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
            </CardStyled>
          </Link>
          <Link href="/primitive/introduction" passHref legacyBehavior>
            <CardStyled role="link">
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
            </CardStyled>
          </Link>
          <Link href="/ui/introduction" passHref legacyBehavior>
            <CardStyled role="link">
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
            </CardStyled>
          </Link>
          <CardStyled>
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
          </CardStyled>
        </ContainerButtonCta>
      </SectionCTA>
    </Box>
  );
}
