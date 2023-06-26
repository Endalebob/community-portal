import React, { useEffect, useState } from "react";

interface ITimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function getRemainingTime(startTime: Date): ITimeLeft {
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

  const timeDifference = startUTCTime - currentUTCTime;
  if (timeDifference < 0) {
    return { days: "0", hours: "00", minutes: "00", seconds: "00" };
  }
  const remainingDays = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

  const remainingHours = Math.floor(
    (timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  const remainingMinutes = Math.floor(
    (timeDifference % (60 * 60 * 1000)) / (60 * 1000)
  );
  const remainingSeconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

  return {
    days: `${remainingDays}`,
    hours: `${String(remainingHours).padStart(2, "0")}`,
    minutes: `${String(remainingMinutes).padStart(2, "0")}`,
    seconds: `${String(remainingSeconds).padStart(2, "0")}`,
  };
}

interface ContestDetailTimerProps {
  date: Date;
}

const ContestDetailTimer: React.FC<ContestDetailTimerProps> = ({ date }) => {
  const [remainingTime, setRemainingTime] = useState<ITimeLeft>();
  useEffect(() => {
    const timeLeft: ITimeLeft = getRemainingTime(date);
    setRemainingTime(timeLeft);

    const intervalId = setInterval(() => {
      setRemainingTime(getRemainingTime(date));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [date]);
  return (
    <div className="grid grid-cols-4 w-64">
      <div className="grid items-start place-items-center p-2">
        <p className="text-sm">Days</p>
        <p className="text-3xl">{remainingTime?.days}</p>
      </div>
      <div className="grid items-start place-items-center p-2">
        <p className="text-sm">Hours</p>
        <p className="text-3xl">{remainingTime?.hours}</p>
      </div>
      <div className="grid items-start place-items-center p-2">
        <p className="text-sm">Minutes</p>
        <p className="text-3xl">{remainingTime?.minutes}</p>
      </div>
      <div className="grid items-start place-items-center p-2">
        <p className="text-sm">Seconds</p>
        <p className="text-3xl">{remainingTime?.seconds}</p>
      </div>
    </div>
  );
};

export default ContestDetailTimer;
