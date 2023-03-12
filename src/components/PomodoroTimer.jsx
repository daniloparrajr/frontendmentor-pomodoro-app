import { useContext, useState, useEffect } from "react";
import TimerToggle from "./TimerToggle.jsx";
import Timer from "./Timer.jsx";
import { TimeContext } from "../contexts/TimeProvider.jsx";

const PomodoroTimer = () => {
  const { timeState } = useContext(TimeContext);
  const [isAuto, setIsAuto] = useState(false);
  const [round, setRound] = useState(0);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  // pomodoro | shortBreak | longBreak
  const [activeTimer, setActiveTimer] = useState("pomodoro");

  function handleTimerToggle(id) {
    setActiveTimer(id);
    setIsAuto(false);
    setRound(round + 1);
  }
  function handleTimerFinished() {
    if ("pomodoro" === activeTimer) {
      const newPomodoroCount = pomodoroCount + 1;
      setPomodoroCount(newPomodoroCount);
      setIsAuto(true);

      if (newPomodoroCount === 4) {
        setActiveTimer("longBreak");
      } else {
        setActiveTimer("shortBreak");
      }
    } else if ("shortBreak" === activeTimer) {
      setActiveTimer("pomodoro");
    } else {
      setActiveTimer("pomodoro");
      setIsAuto(false);
      setPomodoroCount(0);
    }

    setRound(round + 1);
  }

  useEffect(() => {
    setRound(round + 1);
  }, [timeState[activeTimer]]);

  return (
    <>
      <TimerToggle onToggle={handleTimerToggle} activeTimer={activeTimer} />
      <Timer
        key={round} // reset the timer on every round.
        minutes={timeState[activeTimer]}
        start={isAuto}
        onFinished={handleTimerFinished}
      />
    </>
  );
};

export default PomodoroTimer;
