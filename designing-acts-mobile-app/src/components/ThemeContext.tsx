import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Theme = "dark" | "light";

/** Matches React.Dispatch<React.SetStateAction<Theme>> — accepts value OR updater fn */
type ThemeSetter = (value: Theme | ((prev: Theme) => Theme)) => void;

type ThemeCtx = {
  theme: Theme;
  setTheme: ThemeSetter;
  toggleTheme: () => void;
};

function createDefaultContext(): ThemeCtx {
  const noop = () => {
    if (import.meta.env.DEV) {
      throw new Error("useTheme must be used within a ThemeProvider");
    }
  };
  return {
    theme: "dark",
    setTheme: noop,
    toggleTheme: noop,
  };
}

const ThemeCtx = createContext<ThemeCtx>(createDefaultContext());

const LS_KEY = "acts.theme" as const;

function readTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (raw === "light" || raw === "dark") return raw;
    return "dark";
  } catch {
    return "dark";
  }
}

function writeTheme(theme: Theme): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEY, theme);
  } catch {
    // ignore quota/private browsing errors
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readTheme);

  // Sync to localStorage + document.documentElement
  useEffect(() => {
    writeTheme(theme);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const value: ThemeCtx = {
    theme,
    setTheme,
    toggleTheme,
  };

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(ThemeCtx);
  if (import.meta.env.DEV && !ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}