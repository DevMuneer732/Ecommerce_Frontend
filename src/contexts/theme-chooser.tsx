import { ReactNode, createContext, useContext, useMemo } from 'react';
import { THEME_CONTEXT, THEME_TYPE } from '../types/theme';

import { lightTheme } from '../constants/theme';
import { useThemeToggle } from '../hooks/useThemeToggle';

export const ThemeChooser = createContext<THEME_CONTEXT>({
  theme: THEME_TYPE.light,
  themeConfig: lightTheme,
  toggle: () => {},
});

export const ThemeChooserProvider = ({ children }: { children: ReactNode }) => {
  const { theme, themeConfig, toggle } = useThemeToggle();

  const values = useMemo(
    () => ({
      theme,
      themeConfig,
      toggle,
    }),
    [theme, themeConfig, toggle],
  );

  return <ThemeChooser.Provider value={values}>{children}</ThemeChooser.Provider>;
};

export const useThemeChooser = () => {
  const value = useContext(ThemeChooser);
  if (value === null) {
    throw new Error('ThemeChooser Context is missing');
  }
  return value;
};
