"use client";

import { createContext, useState, useEffect, useContext } from "react";

// Create ThemeContext
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [themeLoaded, setThemeLoaded] = useState(false);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  };

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    } else {
      setTheme("dark");
      applyTheme("dark");
    }
    setThemeLoaded(true);
  }, []);

  useEffect(() => {
    if (themeLoaded) {
      localStorage.setItem("theme", theme);
      applyTheme(theme);
    }
  }, [theme, themeLoaded]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);
