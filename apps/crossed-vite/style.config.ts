import { Registry } from '@crossed/styled';
import { themes } from '@crossed/theme';

// add base plugin or add yours
type CustomThemes = typeof themes;

Registry.setThemes(themes).setThemeName('dark');

declare module '@crossed/styled' {
  export interface Themes extends CustomThemes {}
}
