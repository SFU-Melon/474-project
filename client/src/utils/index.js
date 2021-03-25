import { lightFormat } from "date-fns";
import short from "short-uuid";
const Utility = {};

Utility.getDisplayTime = (date) => {
  const now = new Date();
  const post_date = new Date(date);
  const interval = now - post_date;
  const seconds = Math.round(interval / 1000);
  if (seconds < 60) {
    return seconds + " second(s) ago";
  }
  const minutes = Math.round(interval / (60 * 1000));
  if (minutes < 60) {
    return minutes + " minute(s) ago";
  }
  const hours = Math.round(interval / (60 * 60 * 1000));
  if (hours < 24) {
    return hours + " hour(s) ago";
  }
  return lightFormat(post_date, "dd/MM/yyyy");
};

Utility.encodeUUID = (id) => {
  return short().fromUUID(id);
};

Utility.decodeUUID = (id) => {
  return short().toUUID(id);
};

Utility.formatDate = (date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [day, month, year].join('/');
}

Utility.monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default Utility;
