import { useContext } from "react";

import { UiContext } from "../App";

import { ReactComponent as SettingsIcon } from "../assets/icon-settings.svg";

const SettingsToggle = () => {
  const { uiDispatch } = useContext(UiContext);

  return (
    <div className="my-20 text-center md:my-36 lg:my-16">
      <button onClick={() => uiDispatch({ type: "openSettingsModal" })}>
        <SettingsIcon className="opacity-50 transition-opacity hover:opacity-100" />
        <span className="sr-only">settings</span>
      </button>
    </div>
  );
};
export default SettingsToggle;
