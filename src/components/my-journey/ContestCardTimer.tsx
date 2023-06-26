import React, { useEffect, useState } from "react";

function getRemainingTime(startTime: Date): [string, boolean] {
  const currentTime = new Date();
  const currentUTCTime = Date.UTC(
    currentTime.getUTCFullYear(),
    currentTime.getUTCMonth(),
    currentTime.getUTCDate(),
    currentTime.getUTCHours(),
    currentTime.getUTCMinutes(),
    currentTime.getUTCSeconds(),
    currentTime.getUTCMilliseconds()
  );

  const startUTCTime = Date.UTC(
    startTime.getUTCFullYear(),
    startTime.getUTCMonth(),
    startTime.getUTCDate(),
    startTime.getUTCHours(),
    startTime.getUTCMinutes(),
    startTime.getUTCSeconds(),
    startTime.getUTCMilliseconds()
  );

  console.log(startTime, currentTime);
  const timeDifference = startUTCTime - currentUTCTime;
  if (timeDifference < 0) {
    return ["", false];
  } else if (timeDifference > 24 * 60 * 60 * 1000) {
    const remainingDays = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    return [`${remainingDays} day${remainingDays > 1 ? "s" : ""}`, false];
  } else {
    const remainingHours = Math.floor(timeDifference / (60 * 60 * 1000));
    const remainingMinutes = Math.floor(
      (timeDifference % (60 * 60 * 1000)) / (60 * 1000)
    );
    const remainingSeconds = Math.floor((timeDifference % (60 * 1000)) / 1000);
    return [
      `${String(remainingHours).padStart(2, "0")}:${String(
        remainingMinutes
      ).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`,
      true,
    ];
  }
}
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
