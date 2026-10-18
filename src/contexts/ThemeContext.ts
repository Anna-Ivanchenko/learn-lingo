import { createContext } from 'react';

export const THEMES = ['orange', 'green', 'blue', 'pink', 'red'] as const;

export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = 'orange';
export const THEME_STORAGE_KEY = 'learn-lingo-theme';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && (THEMES as readonly string[]).includes(value);
}
