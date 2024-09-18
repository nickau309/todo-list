import dayjs from "@/lib/dayjs";
import { FORMATS_WITHOUT_YEAR, FORMATS_WITH_YEAR } from "../constants/formats";

export default function getInputDate(
  inputValue: string,
  referenceDate: Date | null,
) {
  const trimmedValue = inputValue.trim().replaceAll(/\s+/g, "");

  let date = dayjs(trimmedValue, FORMATS_WITHOUT_YEAR, true);
  if (date.isValid()) {
    if (date.isSame(referenceDate, "day")) {
      return date.toDate();
    }

    const now = dayjs();
    if (date.isBefore(now, "day")) {
      date = date.add(1, "year");
    }
    return date.toDate();
  }

  date = dayjs(trimmedValue, FORMATS_WITH_YEAR, true);
  if (date.isValid()) {
    const year1900 = dayjs().year(1900);
    const year2200 = dayjs().year(2200);
    if (date.isBetween(year1900, year2200, "year", "[]")) {
      return date.toDate();
    }
  }

  return null;
}
