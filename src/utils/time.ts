const day: Record<number, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

export const convertNumberTimeStampInHoursAndMinutes = (number: number, is_unix = true) => {
  const time = new Date(number * (is_unix ? 10000 : 1));

  return time.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export const getDayFromTimeStamp = (timeStamp: string) => {
  const time = new Date(timeStamp);

  return day[time.getDay()];
};

export const getShortDayFromTimeStamp = (timeStamp: string) => {
  const time = new Date(timeStamp);

  return day[time.getDay()].slice(0, 3);
};
