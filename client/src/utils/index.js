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
  // DD/MM/YYYY
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
};

Utility.monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

Utility.diffTime = (date1, date2) => {
  var timeDiff = [];
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30 * 12));
  timeDiff.push(diffDays);
  timeDiff.push(diffMonths);
  timeDiff.push(diffYears);
  return timeDiff;
};

Utility.tags = [
  { key: "firstpost", text: "First Post", value: "First Post", color: "blue" },
  { key: "question", text: "Question", value: "Question", color: "teal" },
  { key: "help", text: "Help", value: "Help", color: "yellow" },
  { key: "tips", text: "Tips", value: "Tips", color: "red" },
  { key: "suggestion", text: "Suggestion", value: "Suggestion", color: "" },
];

Utility.getLabelColor = (tagName) => {
  if (tagName == "First Post") return "blue";
  if (tagName == "Question") return "teal";
  if (tagName == "Suggestion") return "green";
  if (tagName == "Help") return "brown";
  if (tagName == "Tips") return "";
  return "";
};

export default Utility;
