import { useState, useEffect, useRef, useContext } from "react";

import { motion } from "framer-motion";
import { Howl } from "howler";
import alarmToneAudio from "../assets/audio/alarm-tone.wav";

import { animationInterval } from "../timer-helper";

import { ThemeContext } from "../contexts/ThemeProvider.jsx";

const Timer = ({ minutes = 0, onFinished, start }) => {
  const { themeState } = useContext(ThemeContext);
  const TimerIconRef = useRef();

  const alarmTone = new Howl({
    src: [alarmToneAudio],
  });

  // idle | running | paused
  const [state, setState] = useState(() => (start ? "running" : "idle"));

  const [time, setTime] = useState({
    minutes: minutes,
    seconds: 0,
  });

  const [dash, setDash] = useState({
    array: 0,
    offset: 0,
    offsetPerSecond: 0,
  });

  useEffect(() => {
    const newDashArray = TimerIconRef.current?.getTotalLength();
    const totalSeconds = minutes * 60;

    const newDash = {
      array: newDashArray,
      offset: 0,
      offsetPerSecond: newDashArray / totalSeconds,
    };

    setDash(newDash);
  }, []);

  useEffect(() => {
    if ("running" === state) {
      const controller = new AbortController();

      animationInterval(1000, controller.signal, () => {
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

        setDash(({ array, offset, offsetPerSecond }) => {
          return {
            array,
            offset: offset + offsetPerSecond,
            offsetPerSecond,
          };
        });
      });

      return () => controller.abort();
    }
  }, [state]);

  useEffect(() => {
    const minutesFormatted = time.minutes.toString().padStart(2, "0");
    const secondsFormatted = time.seconds.toString().padStart(2, "0");

    document.title = `Pomodoro ${minutesFormatted}:${secondsFormatted}`;

    if (time.minutes === 0 && time.seconds === 0) {
      alarmTone.play();
      onFinished();
    }
  }, [time.minutes, time.seconds]);

  let timeFontSizeClasses;

  if (time.minutes > 99) {
    if (themeState.font === "mono") {
      timeFontSizeClasses = "text-2xl md:text-4xl";
    } else {
      timeFontSizeClasses = "text-3xl md:text-6xl";
    }
  } else {
    if (themeState.font === "mono") {
      timeFontSizeClasses = "text-3xl md:text-6xl";
    } else {
      timeFontSizeClasses = "text-4xl md:text-7xl";
    }
  }

  const timerAnimation = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        when: "beforeChildren",
        ease: "easeOut",
        duration: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      scale: 0.9,
      transition: {
        when: "afterChildren",
        ease: "easeOut",
        duration: 0.3,
      },
    },
  };

  const timeAnimation = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
    hidden: {
      opacity: 0,
      y: -20,
      translateY: "-50%",
    },
  };

  return (
    <motion.button
      initial="hidden"
      animate="visible"
      variants={timerAnimation}
      onClick={(e) => {
        setState(state !== "running" ? "running" : "paused");
      }}
      className={`timer group relative z-10 mx-auto mt-12 block flex h-[300px] w-[300px] rounded-full p-4 text-center text-center md:mt-27 md:h-[410px] md:w-[410px] md:p-5.5 lg:mt-11 ${
        state === "running" && "timer--running"
      }`}
    >
      <span className="relative h-full w-full rounded-full bg-mirage p-[0.618rem] text-center md:p-[0.844rem]">
        <motion.span
          variants={timeAnimation}
          className="absolute left-0 right-0 top-1/2 block px-6 text-center md:px-8"
        >
          <span className={timeFontSizeClasses}>
            {time.minutes.toString().padStart(2, "0")}:
            {time.seconds.toString().padStart(2, "0")}
          </span>
          <span className="absolute -bottom-6.5 left-1/2 ml-1.5 block -translate-x-1/2 text-sm font-bold tracking-widest md:text-base">
            {state === "idle" && "START"}
            {state === "running" && "PAUSE"}
            {state === "paused" && "RESUME"}
          </span>
        </motion.span>
        <svg
          viewBox="0 0 248 248"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block h-full w-full -rotate-90"
        >
          <circle
            ref={TimerIconRef}
            cx="124"
            cy="124"
            r="120"
            className="stroke-skin-fill transition-colors group-hover:stroke-skin-fill-hover"
            strokeWidth="8"
            strokeDasharray={dash.array}
            strokeDashoffset={dash.offset}
            strokeLinecap="round"
          />
        </svg>
      </span>
    </motion.button>
  );
};

export default Timer;
