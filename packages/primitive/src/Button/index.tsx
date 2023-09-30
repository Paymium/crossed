import { GetProps, withStaticProperties } from '@crossed/core';
import { useMemo, type ComponentType } from 'react';
import { createButtonMain } from './Button';
import { createButtonText } from './ButtonText';
import { createButtonIcon } from './ButtonIcon';
import { Provider } from './context';
export { useContext as useButtonContext } from './context';

type Arg<Context extends Record<string, any>> = {
  context?: Context;
};

export const createButton = <
  ButtonProps extends Record<string, any>,
  TextProps extends Record<string, any>,
  IconProps extends Record<string, any>,
  C extends Record<string, any>
>(
  components: {
    Root: ComponentType<ButtonProps>;
    Text: ComponentType<TextProps>;
    Icon: ComponentType<IconProps>;
  },
  { context }: Arg<C> = {}
) => {
  const { Root, Text, Icon } = components;
  const Button = createButtonMain(Root);
  const ButtonText = createButtonText(Text);
  const ButtonIcon = createButtonIcon(Icon);

  Button.displayName = 'Button';
  ButtonText.displayName = 'ButtonText';
  ButtonIcon.displayName = 'ButtonIcon';

  const ButtonRoot = (props: GetProps<typeof Button>) => {
    const {
      text,
      iconAfter: IconAfter,
      icon: Icon,
      children,
      ...otherProps
    } = props as any;

    const contextProps = useMemo(() => {
      return Object.entries(context || {}).reduce<C>((acc, [key]) => {
        if ((props as any)[key]) {
          (acc as any)[key] = (props as any)[key];
        }
        return acc;
      }, context || ({} as C));
    }, [props]);

    return (
      <Provider {...contextProps}>
        <Button {...otherProps}>
          {children ?? (
            <>
              {Icon && (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <ButtonIcon>
                  <Icon />
                </ButtonIcon>
              )}
              {text && (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <ButtonText>{text}</ButtonText>
              )}
              {IconAfter && (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <ButtonIcon>
                  <IconAfter />
                </ButtonIcon>
              )}
            </>
          )}
        </Button>
      </Provider>
    );
  };

  ButtonRoot.displayName = 'ButtonRoot';

  return withStaticProperties(ButtonRoot, {
    Text: ButtonText,
    Icon: ButtonIcon,
  });
};
