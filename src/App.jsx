import { createContext, useMemo, useReducer, useRef } from "react";

import { CSSTransition } from "react-transition-group";

// Components
import Header from "./components/Header";
import PomodoroTimer from "./components/PomodoroTimer";
import SettingsToggle from "./components/SettingsToggle.jsx";
import SettingsModal from "./components/SettingsModal.jsx";

// Contexts
import ThemeProvider from "./contexts/ThemeProvider.jsx";
import TimeProvider from "./contexts/TimeProvider.jsx";

export const UiContext = createContext();

const App = () => {
  const modalRef = useRef();

  const initialState = {
    isSettingsModalOpen: false,
  };

  const uiReducer = (state, action) => {
    switch (action.type) {
      case "openSettingsModal":
        return { ...state, isSettingsModalOpen: true };
      case "closeSettingsModal":
        return { ...state, isSettingsModalOpen: false };
    }
  };

  const [uiState, uiDispatch] = useReducer(uiReducer, initialState);

  const value = useMemo(() => {
    return { uiState, uiDispatch };
  }, [uiState.isSettingsModalOpen]);

  return (
    <ThemeProvider>
      <UiContext.Provider value={value}>
        <TimeProvider>
          <Header />
          <PomodoroTimer />
          <SettingsToggle />
          <CSSTransition
            in={uiState.isSettingsModalOpen}
            timeout={300}
            classNames="modal"
            nodeRef={modalRef}
            unmountOnExit
          >
            <SettingsModal ref={modalRef} />
          </CSSTransition>
        </TimeProvider>
      </UiContext.Provider>
    </ThemeProvider>
  );
};

export default App;
