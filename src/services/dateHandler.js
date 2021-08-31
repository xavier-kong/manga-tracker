const dateHandler = (date) => {
  const now = new Date();
  const last = new Date(date);
  const dateSeconds = (last).getTime();
  const s = (now.getTime() - dateSeconds) / 1000; // seconds
  if (s < 60) {
    return 'just now';
  } if (s < 60 * 60) {
    return `${Math.floor(s / 60)} minute(s) ago`;
  } if (s < 60 * 60 * 24) {
    return `${Math.floor(s / (60 * 60))} hour(s) ago`;
  } if (s < 60 * 60 * 24 * 30) {
    return `${Math.floor(s / (60 * 60 * 24))} day(s) ago`;
  } if (s < 60 * 60 * 24 * 30 * 12) {
    return `${Math.floor(s / (60 * 60 * 24 * 30))} month(s) ago`;
  }
  return `${Math.floor(s / (60 * 60 * 24 * 30 * 12))} year(s) ago`;
};

export default dateHandler