import { TwConfig, create } from 'twrnc';
import type { TwTheme, TwColors } from 'twrnc/dist/esm/tw-config';
export { useDeviceContext, useAppColorScheme } from 'twrnc';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { plugins, ...other } = process.env.CROSSED_THEME as TwConfig;

export const tw = create(other);
export type { TwConfig, TwTheme, TwColors };
