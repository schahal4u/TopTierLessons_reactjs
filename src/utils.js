export const getFormatedStringFromDays = (value) => {
  let res = "";
  let y = Math.floor(value / 31536000);
  let mo = Math.floor(value / 2628288);
  let d = Math.floor(value / 86400);
  let h = Math.floor(value / 3600);
  let m = Math.floor(value / 60);
  // let s = Math.floor(value % 60);

  if (y >= 1) {
    if (y === 1) {
      res = y + " year ago";
    } else {
      res = y + " years ago";
    }
  } else if (mo <= 12 && mo > 0) {
    if (mo === 1) {
      res = mo + " month ago";
    } else {
      res = mo + " months ago";
    }
  } else if (d <= 31 && d > 0) {
    if (d === 1) {
      res = d + " day ago";
    } else {
      res = d + " days ago";
    }
  } else if (h <= 24 && h > 0) {
    if (h === 1) {
      res = h + " hour ago";
    } else {
      res = h + " hours ago";
    }
  } else if (m <= 60 && m > 0) {
    if (m === 1) {
      res = m + " minute ago";
    } else {
      res = m + " minutes ago";
    }
  } else {
    let sec = Math.round(value + 2);
    if (sec === 1) {
      res = Math.round(value + 2) + " second ago";
    } else {
      res = Math.round(value) + " seconds ago";
    }
  }

  return res; // Return is HH : MM : SS
};

export const monthDiff = (start) => {
  let startDate = start.toString().split(" ");
  let newStartDate = startDate[0].split("/");
  let actualDate =
    newStartDate[2] +
    "-" +
    newStartDate[0] +
    "-" +
    newStartDate[1] +
    "T" +
    startDate[1] +
    "Z";

  var t1 = new Date(actualDate);
  var t2 = new Date();

  var dif = (t2.getTime() - t1.getTime()) / 1000;

  return dif;
};

// export const throttle = (func, limit) => {
//   let inThrottle;
//   return function () {
//     const args = arguments;
//     const context = this;
//     if (!inThrottle) {
//       func.apply(context, args);
//       inThrottle = true;
//       setTimeout(() => (inThrottle = false), limit);
//     }
//   };
// };
