import { styled } from '@crossed/styled';
import { Pressable, Text } from 'react-native';

const ButtonWithoutVariant = styled(Pressable, {
  className: [
    'px-2 py-1',
    'bg-neutral-300 text-black',
    'dark:bg-neutral-800 dark:text-white',
  ],
});

const ButtonWithVariant = styled(Pressable, {
  className: ['px-2 py-1'],
  variants: {
    variant: {
      filled: {
        className: [
          'bg-neutral-300 text-black',
          'dark:bg-neutral-800 dark:text-white',
        ],
      },
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

const ButtonTheme = () => {
  const { theme, setTheme } = useCrossedTheme();
  return (
    <button
      className="bg-neutral-500 dark:bg-neutral-800 px-2 py-1 text-black dark:text-white"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Change theme: {theme}
    </button>
  );
};

export const ColorModeDemo = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-row gap-2">
        <ButtonWithoutVariant>
          <Text>Button without variant</Text>
        </ButtonWithoutVariant>
        <ButtonWithVariant>
          <Text>Button with variant</Text>
        </ButtonWithVariant>
      </div>
      <ButtonTheme />
    </div>
  );
};
