import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { PriceData } from '../../types';

export const formatDateInTimeZone = (
  date: Date,
  timezone: string,
  locale: string,
  formatOptions: Intl.DateTimeFormatOptions
) => {
  return new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    ...formatOptions,
  }).format(date);
};

export const getMonthTitle = (
  date: Date,
  timezone: string,
  locale: string
): string => {
  return formatDateInTimeZone(date, timezone, locale, {
    month: 'long',
    year: 'numeric',
  });
};

export const generateCalendarDays = (currentMonth: Date) => {
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);

  const daysInMonth = eachDayOfInterval({ start, end });

  const firstDayOfWeek = getDay(start);

  const daysArray: (Date | null)[] = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    daysArray.push(null);
  }

  daysArray.push(...daysInMonth);

  return daysArray;
};

export const getPriceDataForDate = (
  date: Date,
  timezone: string,
  locale: string,
  prices: PriceData | undefined,
  roomId: string | null
) => {
  if (!roomId) return null;

  const dateKey = formatDateInTimeZone(date, timezone, 'en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return prices?.prices.data[dateKey]?.[roomId];
};

export const goToPreviousMonth = (date: Date) => subMonths(date, 1);
export const goToNextMonth = (date: Date) => addMonths(date, 1);
