import { format, getDaysInMonth, startOfMonth, getDay, addMonths, subMonths } from "date-fns";
import { TZDate } from "@date-fns/tz";
import { PriceData } from "../../types";

export const getMonthTitle = (date: Date, timezone: string): string => {
  const tzDate = new TZDate(date, timezone);
  return format(tzDate, "MMMM yyyy");
};

export const generateCalendarDays = (currentMonth: Date, timezone: string) => {
  const daysInCurrentMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getDay(startOfMonth(currentMonth));

  return Array.from({ length: firstDayOfMonth + daysInCurrentMonth }, (_, i) => {
    if (i < firstDayOfMonth) {
      return null; 
    }
    const day = i - firstDayOfMonth + 1;
    return new TZDate(currentMonth.getFullYear(), currentMonth.getMonth(), day, timezone);
  });
};

export const getPriceDataForDate = (
  date: TZDate,
  prices: PriceData | undefined,
  roomId: string
) => {
  const dateKey = format(date, "yyyy-MM-dd");
  return prices?.prices.data[dateKey]?.[roomId];
};

export const goToPreviousMonth = (date: Date) => subMonths(date, 1);
export const goToNextMonth = (date: Date) => addMonths(date, 1);