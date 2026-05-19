import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Theme = "dark" | "light";

type ThemeCtx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const Ctx = createContext<ThemeCtx>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage?.getItem("acts.theme");
    if (stored === "light" || stored === "dark") return stored;
    return "dark";
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = theme;
    }
    try {
      window.localStorage?.setItem("acts.theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  return (
    <Ctx.Provider
      value={{
        theme,
        setTheme,
        toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useTheme() {
  return useContext(Ctx);
}
