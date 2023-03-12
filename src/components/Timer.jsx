import { useState, useEffect, useRef } from "react";

import { animationInterval } from "../timer-helper";

const Timer = ({ minutes = 0, onFinished, start }) => {
  const TimerIconRef = useRef();

  // idle | running | paused
  const [state, setState] = useState(() => (start ? "running" : "idle"));

  const [time, setTime] = useState({
    minutes: minutes,
    seconds: 0,
  });

  const [dashOffset, setDashOffset] = useState(0);
  const [dashOffsetPerSecond, setDashOffsetPerSecond] = useState(0);
  const [dashArray, setDashArray] = useState(0);

  useEffect(() => {
    const newDashArray = TimerIconRef.current?.getTotalLength();
    const totalSeconds = minutes * 60;

    setDashArray(newDashArray);
    setDashOffsetPerSecond(newDashArray / totalSeconds);
  }, []);

  useEffect(() => {
    if ("running" === state) {
      const interval = setInterval(() => {
        setTime(({ minutes, seconds }) => {
          if (minutes === 0 && seconds === 0) {
            return { minutes: 0, seconds: 0 };
          }

          let newMinutes = minutes;
          let newSeconds = 0;

          // if the seconds runs out but we still have minutes
          if (seconds === 0 && minutes >= 1) {
            newMinutes = minutes - 1;
            seconds = 60;
          }

          // if we still have seconds
          if (seconds > 0) {
            newSeconds = seconds - 1;
          }

          return { minutes: newMinutes, seconds: newSeconds };
        });

        setDashOffset((prevDashOffset) => prevDashOffset + dashOffsetPerSecond);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [state]);

  useEffect(() => {
    const minutesFormatted = time.minutes.toString().padStart(2, "0");
    const secondsFormatted = time.seconds.toString().padStart(2, "0");

    document.title = `Pomodoro ${minutesFormatted}:${secondsFormatted}`;

    if (time.minutes === 0 && time.seconds === 0) {
      onFinished();
    }
  }, [time.minutes, time.seconds]);

  return (
    <button
      onClick={(e) => setState(state !== "running" ? "running" : "paused")}
      className={`timer relative z-10 mx-auto mt-12 block h-[300px] w-[300px] rounded-full text-center text-center md:mt-27 md:h-[410px] md:w-[410px] ${
        state === "running" && "timer--running"
      }`}
    >
      <div className="absolute inset-4 rounded-full bg-mirage text-center md:inset-5.5">
        <div className="absolute left-0 right-0 top-1/2 block -translate-y-1/2 text-center">
          <span className="text-2xl md:text-3xl">
            {time.minutes.toString().padStart(2, "0")}:
            {time.seconds.toString().padStart(2, "0")}
          </span>
          <span className="absolute -bottom-6.5 left-1/2 ml-1.5 block -translate-x-1/2 text-sm tracking-widest md:text-base">
            {state === "idle" && "START"}
            {state === "running" && "PAUSE"}
            {state === "paused" && "RESUME"}
          </span>
        </div>
        <svg
          viewBox="0 0 248 248"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-1.5 -rotate-90 md:inset-2.5"
        >
          <circle
            ref={TimerIconRef}
            cx="124"
            cy="124"
            r="120"
            className="stroke-skin-fill"
            strokeWidth="8"
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </button>
  );
};

export default Timer;
