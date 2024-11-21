/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, createStyles, inlineStyle } from '@crossed/styled';
import {
  createContext,
  forwardRef,
  type MutableRefObject,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { ChevronUp } from '@crossed/unicons';
import { LayoutChangeEvent, View, type ViewProps } from 'react-native';
import { useUncontrolled, withStaticProperties } from '@crossed/core';
import { Box } from '../layout';
import { Floating, FloatingTriggerProps } from '../overlay/Floating';
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const accordionStyles = createStyles((t) => ({
  root: {
    base: {
      borderBottomWidth: 1,
      borderColor: t.colors.border.primary,
      borderStyle: 'solid',
    },
  },
  trigger: {
    'base': {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  panel: {
    web: {
      base: { overflow: 'hidden', transition: 'height 170ms ease-out' },
    },
  },
  item: {
    base: {
      borderTopWidth: 1,
      borderColor: t.colors.border.primary,
      borderStyle: 'solid',
    },
    web: {
      base: { transition: 'height 1000ms ease' },
    },
  },
}));

export type AccordionProps = ViewProps & {
  allowMultiple?: boolean;
  defaultValues?: string[];
  values?: string[];
  onChange?: (_p: string[]) => void;
};

export type AccordionRootContext = Required<
  Pick<AccordionProps, 'allowMultiple' | 'values'>
> & {
  setValues: (_value: string[]) => void;
};

const rootContext = createContext<AccordionRootContext>(
  {} as AccordionRootContext
);
export type AccordionItemProps = ViewProps & { value: string };
export type ItemContext = Pick<AccordionItemProps, 'value'> & {
  buttonId: MutableRefObject<string | undefined>;
  panelId: MutableRefObject<string | undefined>;
};
const itemContext = createContext<ItemContext>({} as ItemContext);
const Root = (props: AccordionProps) => {
  const {
    children,
    allowMultiple = false,
    defaultValues,
    values: valueProps,
    onChange,
  } = props;
  const [values, setValues] = useUncontrolled({
    defaultValue: defaultValues ?? [],
    value: valueProps,
    onChange,
  });
  return (
    <rootContext.Provider value={{ values, setValues, allowMultiple }}>
      {children}
    </rootContext.Provider>
  );
};
Root.displayName = 'Accordion';

const AccordionItem = ({ children, value }: AccordionItemProps) => {
  const { setValues, values, allowMultiple } = useContext(rootContext);
  const buttonId = useRef<string>();
  const panelId = useRef<string>();
  const handleChange = useCallback(() => {
    setValues(
      allowMultiple
        ? values.includes(value)
          ? values.filter((e) => e !== value)
          : [...values, value]
        : [value]
    );
  }, [setValues, value, values, allowMultiple]);
  return (
    <itemContext.Provider value={{ value, buttonId, panelId }}>
      <Floating
        onChange={handleChange}
        value={values.includes(value)}
        visibilityHidden
        portal={false}
        removeScroll={false}
      >
        {children}
      </Floating>
    </itemContext.Provider>
  );
};
AccordionItem.displayName = 'Accordion.Item';

export type AccordionTriggerProps = FloatingTriggerProps;

const AccordionTrigger = forwardRef<View, AccordionTriggerProps>(
  ({ style, ...props }, ref) => (
    <Floating.Trigger
      {...props}
      ref={ref}
      style={composeStyles(accordionStyles.trigger, style)}
    />
  )
);
AccordionTrigger.displayName = 'Accordion.Trigger';

const Provider = ({ children }: PropsWithChildren) => {
  const height = useSharedValue(0);
  const handleLayout = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      height.value = layout.height;
    },
    [height]
  );
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value),
    };
  }, [height]);
  return (
    <Floating.Content
      animatedStyle={animatedStyle}
      style={inlineStyle(() => ({ base: { overflow: 'hidden' } }))}
      layout={LinearTransition}
    >
      <Box onLayout={handleLayout}>{children}</Box>
    </Floating.Content>
  );
};
export type AccordionPanelProps = PropsWithChildren;
const AccordionPanel = ({ children }: AccordionPanelProps) => {
  return (
    <Floating.Portal
      style={inlineStyle(() => ({ base: { position: 'relative' } }))}
      Provider={Provider}
    >
      {children}
    </Floating.Portal>
  );
};
AccordionPanel.displayName = 'Accordion.Panel';

const AccordionIcon = () => {
  const { value } = useContext(itemContext);
  const { values } = useContext(rootContext);
  const isOpen = values.includes(value);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withTiming(isOpen ? '-180deg' : '0deg') }],
    };
  }, [isOpen]);
  return (
    <Animated.View style={animatedStyle}>
      <ChevronUp />
    </Animated.View>
  );
};
AccordionIcon.displayName = 'Accordion.Icon';

export const Accordion = withStaticProperties(Root, {
  Item: AccordionItem,
  Panel: AccordionPanel,
  Trigger: AccordionTrigger,
  Icon: AccordionIcon,
});

export { AccordionItem, AccordionPanel, AccordionTrigger, AccordionIcon };
