import { useContext } from "react";

import { UiContext } from "../App";

import { ReactComponent as SettingsIcon } from "../assets/icon-settings.svg";

const SettingsToggle = () => {
  const { uiDispatch } = useContext(UiContext);

  return (
    <div className="mt-20 text-center md:mt-36 lg:mt-16">
      <button onClick={() => uiDispatch({ type: "openSettingsModal" })}>
        <SettingsIcon className="opacity-50 transition-opacity hover:opacity-100" />
        <span className="sr-only">settings</span>
      </button>
    </div>
  );
};
export default SettingsToggle;
