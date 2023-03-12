import { TimerTypes } from "../constants.js";

const TimerToggle = ({ activeTimer, onToggle }) => {
  return (
    <div className="relative z-20 mx-auto flex w-fit items-center justify-center overflow-hidden rounded-full bg-mirage p-2">
      {TimerTypes.map(({ label, id }) => {
        return (
          <button
            key={id}
            className={
              "rounded-full py-4  px-6 text-xs opacity-40 transition-colors hover:text-white hover:opacity-100 md:text-sm " +
              (activeTimer === id &&
                "bg-skin-button-accent text-mirage opacity-100 hover:bg-skin-button-accent-hover hover:text-mirage md:px-6.5")
            }
            onClick={() => onToggle(id)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default TimerToggle;
