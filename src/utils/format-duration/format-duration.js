import dayjs from 'dayjs';

const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

const format2Digit = (num) => num < 10 ? `0${num}` : String(num);

/**
 * Calculates and formats date duration
 * @param {Date} startDate - start date
 * @param {Date} endDate - end date
 * @returns {String} - formatted duration
 */
const formatDuration = (startDate, endDate) => {
  const minutes = dayjs(endDate).diff(dayjs(startDate), 'm');
  const hours = Math.floor(minutes / MINUTES_IN_HOUR);
  const days = Math.floor(hours / HOURS_IN_DAY);

  if (days) {
    return `${format2Digit(days)}D ${format2Digit(hours % HOURS_IN_DAY)}H
      ${format2Digit(minutes % MINUTES_IN_HOUR)}M`;
  }

  if (hours) {
    return `${format2Digit(hours % HOURS_IN_DAY)}H
      ${format2Digit(minutes % MINUTES_IN_HOUR)}M`;
  }

  return `${format2Digit(minutes % MINUTES_IN_HOUR)}M`;
};

export default formatDuration;
