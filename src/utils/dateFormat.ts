import "dayjs/locale/ko";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export function dateFormat(date: string) {
  const paramsDate = dayjs(date);
  const diff = dayjs().diff(paramsDate, "day");

  if (diff < 8) {
    return paramsDate.fromNow();
  }

  return paramsDate.format("YYYY.MM.DD");
}
