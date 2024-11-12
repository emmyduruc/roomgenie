import React from 'react';
import { Container, Text } from '@mantine/core';
import { getBgColorClass, getTextColorClass } from '../utils/getTextColorClass'; // Import the new utility function
import { getDotColor } from '../utils/dotColor';

interface CalendarDayProps {
  date: Date;
  priceData?: {
    price: number | null;
    price_in_pms: number | null;
    error?: boolean;
    error_reason?: string;
  };
  locale: string;
  currencyCode: string;
  timezone: string;
}

export const DaysOfTheMonth: React.FC<CalendarDayProps> = ({
  date,
  priceData,
  locale,
  currencyCode,
  timezone,
}) => {
  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  });
  const price = priceData?.price ?? null;
  const priceInPMS = priceData?.price_in_pms ?? null;

  const dotColor = getDotColor(price, priceInPMS, priceData?.error);

  const textColorClass = getTextColorClass(dotColor);
  const bgColorClass = getBgColorClass(dotColor);

  const formattedPrice =
    price !== null ? currencyFormatter.format(price) : 'N/A';
  const formattedPMSPrice =
    priceInPMS !== null ? currencyFormatter.format(priceInPMS) : 'N/A';

  const dayNumber = new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    day: '2-digit',
  }).format(date);

  return (
    <div
      className={`relative shadow-lg border min-w-[100px] gap-2 rounded-md p-2 min-h-[100px] transition-colors duration-300 ${bgColorClass
      }`}
    >
      {dotColor && (
        <div
          className={`absolute top-1 left-1 w-2 h-2 rounded-full ${
            dotColor === 'red'
              ? 'bg-red-500'
              : dotColor === 'green'
              ? 'bg-green-500'
              : dotColor === 'yellow'
              ? 'bg-yellow-500'
              : ''
          }`}
        ></div>
      )}

      <Text className={`${textColorClass} font-bold text-lg`}>
        {dayNumber}
      </Text>

      {priceData?.error ? (
        <Text className="text-sm text-red-500 animate-pulse">{'N/A'}</Text>
      ) : (
        <Container className="transition-opacity duration-500">
          <Text className={`text-xs ${textColorClass}`}>
            {currencyCode + formattedPrice}
          </Text>
          {priceInPMS !== null && (
            <Text
              className={`text-xs animate-fade-in ${
                dotColor ? textColorClass : 'text-gray-500'
              }`}
            >
              PMS: {currencyCode + formattedPMSPrice}
            </Text>
          )}
        </Container>
      )}
    </div>
  );
};


