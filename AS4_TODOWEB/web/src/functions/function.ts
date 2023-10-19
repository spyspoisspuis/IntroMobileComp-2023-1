export function formatDateThai(dateTimeString: string): string {
  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม',
    'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน',
    'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
  ];

  const date = new Date(dateTimeString);
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543;
  const {hour,minute} = getHourAndMinute(dateTimeString)

  const formattedDate = `${day} ${month} ${year} เวลา ${hour}:${minute.toString().padStart(2, '0')} น`;

  return formattedDate;
}

export function generateCurrentThaiTime(): string {
  const now = new Date();
  const bangkokOffset = 7 * 60; // Bangkok (UTC+7) offset in minutes
  const nowInBangkok = new Date(now.getTime() + bangkokOffset * 60 * 1000);
  return nowInBangkok.toISOString().slice(0, 16);
}

function getHourAndMinute(dateTimeString: string): { hour: number, minute: number } {
  const timePart = dateTimeString.split('T')[1];
  if (timePart) {
    const [hour, minute] = timePart.split(':').map(Number);
    return { hour, minute };
  }
  return { hour: 0, minute: 0 }; // Default values if the format is not as expected
}


export function ReformatTimeForRequest(when: string): string {
  let RequestWhen = when;
  let count = 0;
  for (let i = 0; i < when.length; i++) {
    if (when[i] == ":") {
      count++;
    }
  }
  if (count != 2 && when[when.length - 1] != "Z") {
    //* Need to add second and add Z
    RequestWhen = RequestWhen + ":00Z";
  } else if (when[when.length - 1] != "Z") {
    //* Need to add Z
    RequestWhen = RequestWhen + "Z";
  }
  return RequestWhen
}