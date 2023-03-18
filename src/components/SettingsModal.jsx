import { useContext, useReducer, useEffect, forwardRef } from "react";

// Third Party
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";

// Icons
import { ReactComponent as CloseIcon } from "../assets/icon-close.svg";
import { ReactComponent as CheckIcon } from "../assets/icon-check.svg";

// Contexts
import { UiContext } from "../App";
import { ThemeContext } from "../contexts/ThemeProvider.jsx";
import { TimeContext } from "../contexts/TimeProvider.jsx";

// Components
import NumberInput from "./NumberInput";
import RadioButtons from "./RadioButtons";
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
          pomodoro: {
            hasErrors: false,
            value: Number.parseInt(action.value),
            message: "",
          },
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
      case "incrementByOne":
        const incrementedState = { ...state };
        incrementedState[action.name] = {
          ...incrementedState[action.name],
          value: incrementedState[action.name].value + 1,
        };
        return incrementedState;
      case "decrementByOne":
        const decrementedState = { ...state };
        decrementedState[action.name] = {
          ...decrementedState[action.name],
          value: decrementedState[action.name].value - 1,
        };
        return decrementedState;
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

  const fontRadioButtons = {
    inputs: [
      {
        value: "sans",
        id: "fontSans",
        label: (
          <>
            Aa <span className="sr-only">sans font</span>
          </>
        ),
      },
      {
        value: "serif",
        id: "fontSerif",
        label: (
          <>
            Aa <span className="sr-only">serif font</span>
          </>
        ),
      },
      {
        value: "mono",
        id: "fontMono",
        label: (
          <>
            Aa <span className="sr-only">mono font</span>
          </>
        ),
      },
    ],
    name: "font",
    value: state.font.value,
    onChange: (e) => {
      dispatch({
        type: "fontImmediately",
        value: e.target.value,
      });
    },
  };

  const themeColorRadioButtons = {
    inputs: [
      {
        value: "froly",
        id: "themeColorFroly",
        theme: "froly",
        label: (
          <>
            <CheckIcon className="stroke-current" />
            <span className="sr-only">theme color froly</span>
          </>
        ),
      },
      {
        value: "malibu",
        id: "themeColorMalibu",
        theme: "malibu",
        label: (
          <>
            <CheckIcon className="stroke-current" />
            <span className="sr-only">theme color malibu</span>
          </>
        ),
      },
      {
        value: "heliotrope",
        id: "themeColorHeliotrope",
        theme: "heliotrope",
        label: (
          <>
            <CheckIcon className="stroke-current" />
            <span className="sr-only">theme color heliotrope</span>
          </>
        ),
      },
    ],
    name: "color",
    value: state.color.value,
    onChange: (e) => {
      dispatch({
        type: "colorImmediately",
        value: e.target.value,
      });
    },
  };

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
                      <NumberInput
                        id="pomodoroDuration"
                        type="number"
                        label="pomodoro"
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
                        onAdd={() =>
                          dispatch({
                            type: "incrementByOne",
                            name: "pomodoro",
                          })
                        }
                        onSubtract={() => {
                          dispatch({
                            type: "decrementByOne",
                            name: "pomodoro",
                          });
                        }}
                      />
                    </div>
                    <div className="mb-2 flex items-center justify-between md:block md:w-1/3 md:grow">
                      <NumberInput
                        id="shortBreakDuration"
                        type="number"
                        label="short break"
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
                        onAdd={() =>
                          dispatch({
                            type: "incrementByOne",
                            name: "shortBreak",
                          })
                        }
                        onSubtract={() => {
                          dispatch({
                            type: "decrementByOne",
                            name: "shortBreak",
                          });
                        }}
                      />
                    </div>
                    <div className="mb-2 flex items-center justify-between md:block md:w-1/3 md:grow">
                      <NumberInput
                        id="longBreakDuration"
                        type="number"
                        label="long break"
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
                        onAdd={() =>
                          dispatch({
                            type: "incrementByOne",
                            name: "longBreak",
                          })
                        }
                        onSubtract={() => {
                          dispatch({
                            type: "decrementByOne",
                            name: "longBreak",
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="border-b border-solid border-lilac p-6 md:flex md:items-center md:justify-between">
                  <p className="mb-4 text-center text-sm tracking-wide md:mb-0">
                    FONT
                  </p>
                  <RadioButtons
                    inputs={fontRadioButtons.inputs}
                    fieldValue={fontRadioButtons.value}
                    colors={fontRadioButtons.colors}
                    onChange={fontRadioButtons.onChange}
                  />
                </div>
                <div className="px-6 pt-6 pb-14 md:flex md:items-center md:justify-between">
                  <p className="mb-4 text-center text-sm tracking-wide md:mb-0">
                    COLOR
                  </p>
                  <RadioButtons
                    inputs={themeColorRadioButtons.inputs}
                    fieldValue={themeColorRadioButtons.value}
                    colors={themeColorRadioButtons.colors}
                    onChange={themeColorRadioButtons.onChange}
                  />
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
