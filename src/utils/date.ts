import dayjs, { ManipulateType } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";

dayjs.extend(relativeTime);
dayjs.locale("ar");

class DateController {
  constructor(public date: number) {}
  fromNow() {
    return dayjs(this.date).fromNow();
  }
  subtract(value: number, unit: ManipulateType) {
    return dayjs(this.date).subtract(value, unit);
  }
  add(value: number, unit: ManipulateType) {
    return dayjs(this.date).add(value, unit);
  }
  format(value: string) {
    return dayjs(this.date).format(value);
  }
}

export default DateController;
