import getRemainingTime from "<@>/utils/get-remaining-time";
import React, { useEffect, useState } from "react";

interface ContestTimerProps {
  date: Date;
}

const ContestTimer: React.FC<ContestTimerProps> = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const [remaining, isLessThanDay] = getRemainingTime(date);
    setTimeLeft(remaining);
    if (isLessThanDay) {
      intervalId = setInterval(() => {
        setTimeLeft(getRemainingTime(date)[0]);
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [date]);

  return <p>{timeLeft}</p>;
};

export default ContestTimer;
