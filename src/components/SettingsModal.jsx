import { useContext, useReducer, useEffect, forwardRef } from "react";

import { UiContext } from "../App";
import { ThemeContext } from "../contexts/ThemeProvider.jsx";
import { TimeContext } from "../contexts/TimeProvider.jsx";

import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";

import { ReactComponent as CloseIcon } from "../assets/icon-close.svg";
import { ReactComponent as CheckIcon } from "../assets/icon-check.svg";

const SettingsModal = ({}, ref) => {
  const { uiDispatch } = useContext(UiContext);
  const { themeState, themeDispatch } = useContext(ThemeContext);
  const { timeState, timeDispatch } = useContext(TimeContext);

  const initialState = {
    pomodoro: {
      value: Number.parseInt(timeState.pomodoro),
      hasErrors: false,
      message: "",
    },
    shortBreak: {
      value: Number.parseInt(timeState.shortBreak),
      hasErrors: false,
      message: "",
    },
    longBreak: {
      value: Number.parseInt(timeState.longBreak),
      hasErrors: false,
      message: "",
    },
    font: {
      value: themeState.font,
      hasErrors: false,
      message: "",
    },
    color: {
      value: themeState.color,
      hasErrors: false,
      message: "",
    },
  };

  function reducer(state, action) {
    switch (action.type) {
      case "pomodoroImmediately":
        return {
          ...state,
          pomodoro: { hasErrors: false, value: action.value, message: "" },
        };
      case "shortBreakImmediately":
        return {
          ...state,
          shortBreak: { hasErrors: false, value: action.value, message: "" },
        };
      case "longBreakImmediately":
        return {
          ...state,
          longBreak: { hasErrors: false, value: action.value, message: "" },
        };
      case "fontImmediately":
        return {
          ...state,
          font: { hasErrors: false, value: action.value, message: "" },
        };
      case "colorImmediately":
        return {
          ...state,
          color: { hasErrors: false, value: action.value, message: "" },
        };
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSubmit(e) {
    e.preventDefault();

    timeDispatch({
      type: "updateTime",
      value: {
        pomodoro: Number.parseInt(state.pomodoro.value),
        shortBreak: Number.parseInt(state.shortBreak.value),
        longBreak: Number.parseInt(state.longBreak.value),
      },
    });

    themeDispatch({
      type: "updateTheme",
      value: { color: state.color.value, font: state.font.value },
    });

    uiDispatch({ type: "closeSettingsModal" });
  }

  useEffect(() => {
    function handleEscapeKey(e) {
      if (e.key === "Escape") {
        uiDispatch({ type: "closeSettingsModal" });
      }
    }

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <FocusLock returnFocus={true}>
      <RemoveScroll>
        <div
          ref={ref}
          className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-mirage/50 px-6 pt-11.5 pb-17 text-mirage md:p-0"
        >
          <div className="relative min-h-screen px-0 md:flex md:items-center md:pb-14 md:pt-10">
            <div
              className="absolute inset-0 z-10 h-full"
              onClick={() => uiDispatch({ type: "closeSettingsModal" })}
            ></div>
            <div
              role="dialog"
              aria-modal="true"
              className="modal-body relative z-20 mx-auto w-full max-w-[540px] rounded-[25px] bg-white"
            >
              <header className="flex items-center justify-between border-b border-solid border-lilac p-6">
                <h2 className="text-lg md:text-xl">Settings</h2>
                <button
                  onClick={() => uiDispatch({ type: "closeSettingsModal" })}
                >
                  <CloseIcon />
                  <span className="sr-only">Close settings modal</span>
                </button>
              </header>
              <form onSubmit={handleSubmit}>
                <div className="border-b border-solid border-lilac p-6">
                  <p className="mb-4 text-center text-sm tracking-wide md:text-left">
                    TIME (MINUTES)
                  </p>
                  <div className="md:flex md:gap-5">
                    <div className="mb-2 flex items-center justify-between md:block md:w-1/3 md:grow">
                      <label
                        htmlFor="pomodoroDuration"
                        className="block w-1/2 grow basis-1/2 text-xs opacity-40 md:mb-1.5 md:w-full"
                      >
                        pomodoro
                      </label>
                      <input
                        id="pomodoroDuration"
                        type="number"
                        className="w-1/2 grow basis-1/2 md:w-full"
                        required={true}
                        min={1}
                        max={120}
                        value={state.pomodoro.value}
                        onChange={(e) =>
                          dispatch({
                            type: "pomodoroImmediately",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-2 flex items-center justify-between md:block md:w-1/3 md:grow">
                      <label
                        htmlFor="shortBreakDuration"
                        className="block w-1/2 grow basis-1/2 text-xs opacity-40 md:mb-1.5 md:w-full"
                      >
                        short break
                      </label>
                      <input
                        id="shortBreakDuration"
                        type="number"
                        className="w-1/2 grow basis-1/2 md:w-full"
                        required={true}
                        min={1}
                        max={30}
                        value={state.shortBreak.value}
                        onChange={(e) =>
                          dispatch({
                            type: "shortBreakImmediately",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-2 flex items-center justify-between md:block md:w-1/3 md:grow">
                      <label
                        htmlFor="longBreakDuration"
                        className="block w-1/2 grow basis-1/2 text-xs opacity-40 md:mb-1.5 md:w-full"
                      >
                        long break
                      </label>
                      <input
                        id="longBreakDuration"
                        type="number"
                        className="w-1/2 grow basis-1/2 md:w-full"
                        required={true}
                        min={1}
                        max={60}
                        value={state.longBreak.value}
                        onChange={(e) =>
                          dispatch({
                            type: "longBreakImmediately",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="border-b border-solid border-lilac p-6 md:flex md:items-center md:justify-between">
                  <p className="mb-4 text-center text-sm tracking-wide md:mb-0">
                    FONT
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <input
                      type="radio"
                      name="font"
                      value="sans"
                      id="fontSans"
                      className="peer/sans sr-only"
                      checked={state.font.value === "sans"}
                      onChange={(e) =>
                        dispatch({
                          type: "fontImmediately",
                          value: e.target.value,
                        })
                      }
                    />
                    <label
                      htmlFor="fontSans"
                      className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-lilac transition-shadow hover:ring-1 hover:ring-lilac hover:ring-offset-4 peer-checked/sans:bg-mirage peer-checked/sans:text-white"
                    >
                      Aa
                    </label>

                    <input
                      type="radio"
                      value="serif"
                      name="font"
                      id="fontSerif"
                      className="peer/serif sr-only"
                      checked={state.font.value === "serif"}
                      onChange={(e) =>
                        dispatch({
                          type: "fontImmediately",
                          value: e.target.value,
                        })
                      }
                    />
                    <label
                      htmlFor="fontSerif"
                      className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-lilac font-serif transition-shadow hover:ring-1 hover:ring-lilac hover:ring-offset-4 peer-checked/serif:bg-mirage peer-checked/serif:text-white"
                    >
                      Aa
                    </label>

                    <input
                      type="radio"
                      name="font"
                      value="mono"
                      id="fontMono"
                      className="peer/mono sr-only"
                      checked={state.font.value === "mono"}
                      onChange={(e) =>
                        dispatch({
                          type: "fontImmediately",
                          value: e.target.value,
                        })
                      }
                    />
                    <label
                      htmlFor="fontMono"
                      className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-lilac font-mono transition-shadow hover:ring-1 hover:ring-lilac hover:ring-offset-4 peer-checked/mono:bg-mirage peer-checked/mono:text-white"
                    >
                      Aa
                    </label>
                  </div>
                </div>
                <div className="px-6 pt-6 pb-14 md:flex md:items-center md:justify-between">
                  <p className="mb-4 text-center text-sm tracking-wide md:mb-0">
                    COLOR
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <input
                      type="radio"
                      name="color"
                      value="froly"
                      id="colorFroly"
                      checked={state.color.value === "froly"}
                      onChange={(e) =>
                        dispatch({
                          type: "colorImmediately",
                          value: e.target.value,
                        })
                      }
                      className="peer/froly sr-only"
                    />
                    <label
                      htmlFor="colorFroly"
                      className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-froly text-froly transition-shadow hover:ring-1 hover:ring-froly hover:ring-offset-4 peer-checked/froly:text-mirage"
                    >
                      <CheckIcon className="stroke-current" />
                    </label>

                    <input
                      type="radio"
                      name="color"
                      value="malibu"
                      id="colorMalibu"
                      className="peer/malibu sr-only"
                      checked={state.color.value === "malibu"}
                      onChange={(e) =>
                        dispatch({
                          type: "colorImmediately",
                          value: e.target.value,
                        })
                      }
                    />
                    <label
                      htmlFor="colorMalibu"
                      className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-malibu text-malibu transition-shadow hover:ring-1 hover:ring-malibu hover:ring-offset-4 peer-checked/malibu:text-mirage"
                    >
                      <CheckIcon className="stroke-current" />
                    </label>

                    <input
                      type="radio"
                      name="color"
                      value="heliotrope"
                      id="colorHeliotrope"
                      className="peer/heliotrope sr-only"
                      checked={state.color.value === "heliotrope"}
                      onChange={(e) =>
                        dispatch({
                          type: "colorImmediately",
                          value: e.target.value,
                        })
                      }
                    />
                    <label
                      htmlFor="colorHeliotrope"
                      className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-heliotrope text-heliotrope transition-shadow hover:ring-1 hover:ring-heliotrope hover:ring-offset-4 peer-checked/heliotrope:text-mirage"
                    >
                      <CheckIcon className="stroke-current" />
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="absolute -bottom-7 right-1/2 translate-x-1/2 rounded-full bg-skin-fill py-4 px-11.5 text-white hover:bg-skin-fill-hover"
                >
                  Apply
                </button>
              </form>
            </div>
          </div>
        </div>
      </RemoveScroll>
    </FocusLock>
  );
};

export default forwardRef(SettingsModal);
