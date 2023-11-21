

export function formatDateThai(dateTimeString) {
  const thaiMonths = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];

  const date = new Date(dateTimeString);
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()]
  const year = date.getFullYear() + 543;
  // const { hour, minute } = getHourAndMinute(dateTimeString);

  const formattedDate = `${day} ${month} ${year.toString().slice(2)}`; // Concatenate the formatted date

  return formattedDate;
}

export function formatTimeThai(timeString) {
  const [hour, minute] = timeString.split(":").map(Number);
  const formattedTime = `${hour}:${minute.toString().padStart(2, "0")} น.`;

  return formattedTime;
}
export function extractTime(text) {
  const keyword = "เวลา";
  const index = text.indexOf(keyword);
  let date = "";
  let time = "";
  if (index !== -1) {
    date = text.substring(0, index).trim();
    time = text.substring(index + keyword.length).trim();
  }

  return { date, time };
}

export function formatUTFToThaiTime(text) {
  const timeKeyword = "T";
  const index = text.indexOf(timeKeyword);
  let time = "";
  if (index !== -1) {
    time = text.substring(index + timeKeyword.length).trim();
    time = formatTimeThai(time);
  }
  return time;
}

// From backend : 2023-10-17T10:00:00Z

export function convertThaiDateToISO(thaiDate) {
  // Map Thai months to numerical representations
  const thaiMonths = {
    "ม.ค.": 1,
    "ก.พ.": 2,
    "มี.ค.": 3,
    "เม.ย.": 4,
    "พ.ค.": 5,
    "มิ.ย.": 6,
    "ก.ค.": 7,
    "ส.ค.": 8,
    "ก.ย.": 9,
    "ต.ค.": 10,
    "พ.ย.": 11,
    "ธ.ค.": 12,
  };

  // Split the Thai date string into components
  const [day, thaiMonth, thaiYear, timeWord, time] = thaiDate.split(" ");

  // Extract numerical month from the mapping
  const month = thaiMonths[thaiMonth];

  // Add leading zeros for day and month when they are less than 10
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Extract hours, minutes, and seconds from the time
  const [hours, minutes] = time.split(":").map((part) => parseInt(part));

  // Add leading zeros for hours and minutes
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Construct ISO 8601 format
  const isoFormat = `${
    Number(thaiYear) + 2500 - 543
  }-${formattedMonth}-${formattedDay}T${formattedHours}:${formattedMinutes}:00Z`;

  return isoFormat;
}
