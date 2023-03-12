import { createContext, useEffect, useReducer, useMemo } from "react";
import { setThemeClass } from "../theme-helpers.js";

export const ThemeContext = createContext();

function createInitialState(state) {
  state.color = localStorage.getItem("pomodoroThemeColor") ?? "froly";
  state.font = localStorage.getItem("pomodoroThemeFont") ?? "sans";

  return state;
}

const ThemeProvider = ({ children }) => {
  const initialState = {
    color: "froly",
    font: "sans",
  };

  const themeReducer = (state, action) => {
    switch (action.type) {
      case "updateTheme":
        return { ...action.value };
    }
  };

  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    initialState,
    createInitialState
  );

  useEffect(() => {
    const colorRegex = new RegExp(/\btheme-color-.+?\b/, "g");
    const fontRegex = new RegExp(/\btheme-font-.+?\b/, "g");

    setThemeClass("color", colorRegex, themeState.color);
    setThemeClass("font", fontRegex, themeState.font);

    localStorage.setItem("pomodoroThemeColor", themeState.color);
    localStorage.setItem("pomodoroThemeFont", themeState.font);
  }, [themeState.color, themeState.font]);

  const value = useMemo(() => {
    return { themeState, themeDispatch };
  }, [themeState.color, themeState.font]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
