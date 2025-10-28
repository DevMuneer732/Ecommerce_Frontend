import { darkTheme, lightTheme } from '../constants/theme';

export enum THEME_TYPE {
  light = 'light',
  dark = 'dark',
}

export type THEME_CONTEXT = {
  theme: THEME_TYPE;
  themeConfig: typeof lightTheme | typeof darkTheme;
  toggle: () => void;
};
