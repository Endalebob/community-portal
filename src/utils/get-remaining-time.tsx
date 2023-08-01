const getRemainingTime = (startTime: Date): [string, boolean] => {
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
};

export default getRemainingTime;
