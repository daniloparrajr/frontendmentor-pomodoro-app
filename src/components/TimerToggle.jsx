import { TimerTypes } from "../constants.js";

const TimerToggle = ({ activeTimer, onToggle }) => {
  return (
    <div
      className={`timer-toggle timer-toggle--${activeTimer} relative z-20 mx-auto w-fit rounded-full bg-mirage p-2`}
    >
      <div className="relative grid grid-cols-3">
        {TimerTypes.map(({ label, id }) => {
          return (
            <button
              key={id}
              className={
                "relative z-20 h-12 w-24 rounded-full text-center text-xs font-bold transition-colors sm:w-30 md:w-[120px] md:text-sm " +
                (activeTimer === id
                  ? "peer/active text-mirage hover:text-mirage"
                  : "opacity-40 hover:text-white hover:opacity-100")
              }
              onClick={() => onToggle(id)}
            >
              {label}
            </button>
          );
        })}
        <span className="timer-toggle__indicator absolute inset-0 z-10 w-1/3 rounded-full bg-skin-fill transition-colors transition-transform peer-hover/active:bg-skin-fill-hover"></span>
      </div>
    </div>
  );
};

export default TimerToggle;
