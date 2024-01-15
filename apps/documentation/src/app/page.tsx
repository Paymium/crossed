'use client';
import '@/types/unistyles';
import { Logo } from '@/components/Logo';
import { createStyleSheet, mq, styled, useStyles } from '@crossed/styled';
import { B, Button, Card, H1, H2, H3, YBox } from '@crossed/ui';
import Link from 'next/link';
import { Trans, useTranslation } from 'react-i18next';

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
          <svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="#fff">
            <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"></path>
          </svg>
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
