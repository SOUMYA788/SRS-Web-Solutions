const dayLists = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const monthLists = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

/**
 * 
 * @param {Date} dateObj javascript date object
 * @param {String} require DATE | TIME, if null, then both
 * @returns formated date and time accourding to require argument
 */
export const dateAndTimeFormatter = (dateObj, require) => {
  const newDate = new Date(dateObj);

  let amPm = "AM"
  let hour = newDate.getHours();
  let minute = newDate.getMinutes();
  let seconds = newDate.getSeconds();
  let date = newDate.getDate();
  let day = newDate.getDay();
  let month = newDate.getMonth();
  let year = newDate.getFullYear();

  if (hour < 10) { hour = `0${hour}` };
  if (minute < 10) { minute = `0${minute}` };
  if (seconds < 10) { seconds = `0${seconds}` };

  if (hour > 12 && hour <= 24) {
    hour = (hour - 12);
    amPm = "PM";
  } else { amPm = "AM" }

  const formatedDate = `${dayLists[day]}, ${date} ${monthLists[month]}, ${year}`;
  const formatedTime = `${hour}:${minute}:${seconds} ${amPm}`

  switch (require?.toLowerCase()) {
    case "date": { return formatedDate }
    case "time": { return formatedTime }
    default: { return `${formatedDate} at ${formatedTime}` }
  }
}