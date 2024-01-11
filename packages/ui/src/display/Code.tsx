import { GetProps, UnistylesRuntime, styled } from '@crossed/styled';
import { Text } from '../typography/Text';

const Code = styled(Text, (t) => ({
  backgroundColor: t.colors.neutral,
  paddingVertical: 1,
  paddingHorizontal: t.space.xs,
  borderWidth: 1,
  borderColor: t.utils.shadeColor(
    t.colors.neutral,
    (UnistylesRuntime.themeName === 'dark' ? 1 : -1) * 50
  ),
  borderRadius: 4,
}));
type CodeProps = GetProps<typeof Code>;

export { Code, type CodeProps };
