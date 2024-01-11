import {
  type GetProps,
  withDefaultProps,
  withStaticProperties,
} from '@crossed/core';
import { styled } from '@crossed/styled';
import { YBox } from '../layout/YBox';
import { Text } from '../typography/Text';

const CardRoot = styled(YBox, (t) => ({
  padding: t.space.md,
  borderRadius: t.space.xs,
  backgroundColor: t.utils.shadeColor(t.colors.background, 25),
  variants: {
    role: {
      link: {
        'hover:': {
          backgroundColor: t.utils.shadeColor(t.colors.background, 30),
        },
        'active:': {
          backgroundColor: t.utils.shadeColor(t.colors.background, 20),
        },
      },
    },
  },
}));

const Title = withDefaultProps(styled(Text, { alignSelf: 'stretch' }), {
  size: 'lg',
});

const Description = withDefaultProps(
  styled(Text, { alignSelf: 'stretch' }),
  {}
);

const Card = withStaticProperties(CardRoot, {
  Title,
  Description,
});
const { Title: CardTitle, Description: CardDescription } = Card;

type CardProps = GetProps<typeof Card>;
type CardTitleProps = GetProps<typeof CardTitle>;
type CardDescriptionProps = GetProps<typeof CardDescription>;

export {
  Card,
  CardTitle,
  CardDescription,
  type CardProps,
  type CardTitleProps,
  type CardDescriptionProps,
};
