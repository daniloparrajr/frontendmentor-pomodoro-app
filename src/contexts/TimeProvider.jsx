import { createContext, useReducer, useMemo, useEffect } from "react";
import { setThemeClass } from "../theme-helpers.js";

export const TimeContext = createContext();

function createInitialState(state) {
  state.pomodoro = Number.parseInt(
    localStorage.getItem("pomodoroTimePomodoro") ?? 25
  );
  state.shortBreak = Number.parseInt(
    localStorage.getItem("pomodoroTimeShortBreak") ?? 5
  );
  state.longBreak = Number.parseInt(
    localStorage.getItem("pomodoroTimeLongBreak") ?? 15
  );

  return state;
}

const TimeProvider = ({ children }) => {
  const initialState = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  };

  const timeReducer = (state, action) => {
    switch (action.type) {
      case "updateTime":
        return { ...action.value };
    }
  };

  const [timeState, timeDispatch] = useReducer(
    timeReducer,
    initialState,
    createInitialState
  );

  useEffect(() => {
    localStorage.setItem("pomodoroTimePomodoro", timeState.pomodoro);
    localStorage.setItem("pomodoroTimeShortBreak", timeState.shortBreak);
    localStorage.setItem("pomodoroTimeLongBreak", timeState.longBreak);
  }, [timeState.pomodoro, timeState.shortBreak, timeState.longBreak]);

  const value = useMemo(() => {
    return { timeState, timeDispatch };
  }, [timeState.pomodoro, timeState.shortBreak, timeState.longBreak]);

  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
};

export default TimeProvider;
