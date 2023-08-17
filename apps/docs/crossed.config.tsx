import { createTheme } from '@crossed/ui';

const config = createTheme({
  variants: {},
});

export default config;

export type AppConfig = typeof config;

declare module '@crossed/ui' {
  interface CrossedCustomConfig extends AppConfig {}
}
