"use client";

import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "theme-preference";
const THEME_SWITCHING_CLASS = "theme-switching";

type ThemeMode = "light" | "dark";

const applyThemeMode = (mode: ThemeMode) => {
  const root = document.documentElement;
  root.classList.add(THEME_SWITCHING_CLASS);
  root.classList.toggle("dark", mode === "dark");
  root.dataset.theme = mode;
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      root.classList.remove(THEME_SWITCHING_CLASS);
    });
  });
};

const getInitialThemeMode = (): ThemeMode => {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initialMode = getInitialThemeMode();
    setMode(initialMode);
    applyThemeMode(initialMode);
    setMounted(true);
  }, []);

  const toggleMode = () => {
    const nextMode: ThemeMode = mode === "dark" ? "light" : "dark";
    setMode(nextMode);
    applyThemeMode(nextMode);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextMode);
  };

  const targetMode: ThemeMode = mounted && mode === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleMode}
      className="theme-toggle h-[54.74px] px-6 text-sm font-medium rounded-full border transition-colors"
      data-target-mode={targetMode}
      aria-label={targetMode === "light" ? "Switch to light mode" : "Switch to dark mode"}
      title={targetMode === "light" ? "Light mode" : "Dark mode"}
    >
      {targetMode === "light" ? "Light" : "Dark"}
    </button>
  );
}
