import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";
const STORAGE_KEY = "spc-theme";
const THEME_CHANGE_EVENT = "spc-theme-change";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  } catch {
    /* ignore */
  }
  return "light";
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleThemeChange = (e: CustomEvent<Theme>) => {
      setThemeState(e.detail);
    };

    window.addEventListener(THEME_CHANGE_EVENT as any, handleThemeChange);
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT as any, handleThemeChange);
    };
  }, []);

  const updateTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
    applyTheme(nextTheme);
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      /* ignore */
    }

    window.dispatchEvent(
      new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: nextTheme })
    );
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    updateTheme(nextTheme);
  }, [theme, updateTheme]);

  return {
    theme,
    setTheme: updateTheme,
    toggleTheme,
    mounted,
  };
}
