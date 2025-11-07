import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { Box, XBox } from '../layout';
import { Text } from '../typography';
import { radiusStyles } from '../styles/radius';
import { withStaticProperties } from '@crossed/core';
import { growStyles, positionStyles } from '../styles';

export type InfiniteLoadBarProps = {
  /**
   * Duration animation if no value
   */
  duration?: number;
  /**
   * Bar size animated if no value
   */
  barSize?: number;
  /**
   * Use 0-100 for choose percent fill
   */
  value?: number;
  /**
   * Show percent in end line
   */
  showPercent?: boolean;
};

const ProgressPercent = withStaticProperties(Text, {
  fontSize: 'sm',
  fontWeight: 'medium',
  color: 'secondary',
  style: inlineStyle(() => ({ base: { minWidth: 400 } })),
});
ProgressPercent.displayName = 'Progress.Percent';

/**
 * infinite loading bar
 * @barSize allow you to choose the size of the active bar
 * @duration allow you to choose the duration for the bar to go from left to right
 * */
export const Progress = ({
  duration = 2000,
  barSize = 100,
  value,
  showPercent,
}: InfiniteLoadBarProps) => {
  const start = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return value === undefined
      ? {
          transform: [
            {
              translateX: withRepeat(
                withTiming(start.value, {
                  duration,
                  easing: Easing.linear,
                }),
                -1
              ),
            },
          ],
        }
      : {
          width: withTiming((value * start.value) / 100, {
            duration: 100,
            easing: Easing.linear,
          }),
        };
  }, [start, value]);

  return (
    <XBox alignItems={'center'} space={'lg'}>
      <Box
        style={composeStyles(
          radiusStyles.full,
          growStyles.on,
          positionStyles.relative,
          inlineStyle(({ colors }) => ({
            base: {
              overflow: 'hidden',
              height: 10,
              backgroundColor: colors.background.brand.quaternary.default,
            },
          }))
        )}
        onLayout={({ nativeEvent: { layout } }) => {
          start.value =
            value === undefined ? layout.width + barSize : layout.width;
        }}
      >
        <Animated.View
          style={[
            animatedStyle,
            composeStyles(
              radiusStyles.full,
              inlineStyle(({ colors }) => ({
                base: {
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  backgroundColor: colors.foreground.brand.primary.default,
                },
              }))
            ).style().style,
            {
              left: value === undefined ? -barSize : 0,
              width: barSize,
            },
          ]}
        />
      </Box>
      {showPercent && <ProgressPercent>{value}%</ProgressPercent>}
    </XBox>
  );
};
Progress.displayName = 'Progress';
