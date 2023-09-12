import { CrossedTheme, styled, useCrossedTheme } from '@crossed/styled';

const ButtonWithoutVariant = styled('button', {
  'className': ['px-2 py-1'],
  ':dark': {
    className: ['bg-neutral-800 text-white'],
  },
  ':light': {
    className: ['bg-neutral-300 text-black'],
  },
});

const ButtonWithVariant = styled('button', {
  className: ['px-2 py-1'],
  variants: {
    variant: {
      filled: {
        ':dark': {
          className: ['bg-neutral-800 text-white'],
        },
        ':light': {
          className: ['bg-neutral-300 text-black'],
        },
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
      className="bg-neutral-800 px-2 py-1"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Change theme: {theme}
    </button>
  );
};

export const ColorModeDemo = () => {
  return (
    <CrossedTheme>
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-row gap-2">
          <ButtonWithoutVariant>Button without variant</ButtonWithoutVariant>
          <ButtonWithVariant>Button with variant</ButtonWithVariant>
        </div>
        <ButtonTheme />
      </div>
    </CrossedTheme>
  );
};
