import React, { useState, useEffect, useMemo } from 'react';
import {
  Text,
  LoadingOverlay, Container
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useSettings } from '../hooks/useSettings';
import {
  generateCalendarDays,
  getMonthTitle,
  getPriceDataForDate,
  goToNextMonth,
  goToPreviousMonth,
} from '../utils/dateFormatters';
import { DaysOfTheMonth } from './DaysOfTheMonth';
import { RoomSelector } from './RoomSelector';
import { usePrices } from '../hooks/usePrice';

export const PricingCalendar: React.FC = () => {
  const {
    data: prices,
    isLoading: loadingPrices,
    error: pricesError,
  } = usePrices();
  const {
    data: settings,
    isLoading: loadingSettings,
    error: settingsError,
  } = useSettings();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  if (loadingPrices || loadingSettings) return <LoadingOverlay visible />;
  if (pricesError || settingsError)
    return <Text color="red">Error loading data</Text>;

  const roomNames = useMemo(() => {
    if (!settings) return {};

    const { reference, derived } = settings.rooms;

    return {
      [reference.id.toString()]: reference.name,
      ...Object.entries(derived).reduce((acc, [id, room]) => {
        acc[id] = room.name;
        return acc;
      }, {}),
    };
  }, [settings]);

  const timezone = settings?.hotel.timezone ?? 'UTC';
  const locale = settings?.hotel.locale ?? 'en-US';
  const currencyCode = prices?.currency.code ?? 'USD';

  useEffect(() => {
    if (settings && !selectedRoomId) {
      setSelectedRoomId(settings.rooms.reference.id.toString());
    }
  }, [settings]);

  const monthTitle = getMonthTitle(currentMonth, timezone, locale);
  const days = generateCalendarDays(currentMonth);

  const prevMonth = () => setCurrentMonth(goToPreviousMonth(currentMonth));
  const nextMonth = () => setCurrentMonth(goToNextMonth(currentMonth));


  return (
    <Container className="bg-white shadow-sm rounded-8xl border p-6">
      <Container className="w-full p-5 text-center">
        <Container className="flex justify-between items-center gap-4 mb-4">
          <button onClick={prevMonth} className="p-2 border shadow-lg rounded-full bg-green-300">
            <IconChevronLeft />
          </button>
          <h2 className="text-xl font-semibold">{monthTitle}</h2>
          <button onClick={nextMonth} className="p-2 border bg-green-300 shadow-lg rounded-full">
            <IconChevronRight />
          </button>
        </Container>

        <RoomSelector
          roomNames={roomNames}
          selectedRoomId={selectedRoomId}
          setSelectedRoomId={setSelectedRoomId}
        />

        <Container className="grid grid-cols-7 gap-2">
          {days.map((date, index) => {
            if (!date) {
              return <div key={index} style={{ minHeight: '80px' }} />;
            }
            const priceData = getPriceDataForDate(
              date,
              timezone,
              locale,
              prices,
              selectedRoomId
            );

            return (
              <DaysOfTheMonth
                key={date.toISOString()}
                date={date}
                priceData={priceData}
                locale={locale}
                currencyCode={currencyCode}
                timezone={timezone}
              />
            );
          })}
        </Container>
      </Container>
    </Container>
  );
};
