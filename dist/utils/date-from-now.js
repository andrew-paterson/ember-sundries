import timeStringToMilliseconds from './time-string-to-milliseconds.js';

function dateFromNow(interval, direction) {
  const dateFromNow = new Date();
  const dateShift = direction === 'past' ? -1 : 1;
  dateFromNow.setTime(dateFromNow.getTime() + dateShift * timeStringToMilliseconds(interval));
  return dateFromNow;
}

export { dateFromNow as default };
//# sourceMappingURL=date-from-now.js.map
