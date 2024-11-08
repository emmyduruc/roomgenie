// src/components/PricingCalendar.tsx
import React, { useState } from "react";
import { Box, Text, LoadingOverlay, ActionIcon, SimpleGrid, Flex } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { usePrices } from "../hooks/usePrice";
import { useSettings } from "../hooks/useSettings";
import { format } from "date-fns";
import { generateCalendarDays, getMonthTitle, getPriceDataForDate, goToNextMonth, goToPreviousMonth } from "../utils/dateFormatters";
import { DaysOfTheMonth } from "./DaysOfTheMonth";

export const PricingCalendar: React.FC = () => {
    const { data: prices, isLoading: loadingPrices, error: pricesError } = usePrices();
    const { data: settings, isLoading: loadingSettings, error: settingsError } = useSettings();
    const [currentMonth, setCurrentMonth] = useState(new Date());

    if (loadingPrices || loadingSettings) return <LoadingOverlay visible />;
    if (pricesError || settingsError) return <Text className="text-red-500">Error loading data</Text>;

    const timezone = settings?.hotel.timezone ?? "UTC";
    const roomId = settings?.rooms.reference.id.toString() ?? "";

    const monthTitle = getMonthTitle(currentMonth, timezone);
    const days = generateCalendarDays(currentMonth, timezone);

    const prevMonth = () => setCurrentMonth(goToPreviousMonth(currentMonth));
    const nextMonth = () => setCurrentMonth(goToNextMonth(currentMonth));

    return (
        <Box w={'40%'}>
            <Flex justify="space-between" align="center" mb="md">
                <ActionIcon onClick={prevMonth}><IconChevronLeft /></ActionIcon>
                <Text size="xl">{monthTitle}</Text>
                <ActionIcon onClick={nextMonth}><IconChevronRight /></ActionIcon>
            </Flex>

            <SimpleGrid cols={7} spacing="xs">
                {days.map((date, index) => {
                    if (!date) {
                        return <Box key={index} style={{ minHeight: "80px" }} />;
                    }
                    const priceData = getPriceDataForDate(date, prices, roomId);

                    return (
                        <DaysOfTheMonth
                            key={format(date, "yyyy-MM-dd")}
                            date={date}
                            priceData={priceData}
                            currencySymbol={prices?.currency.symbol ?? "$"}
                        />
                    );
                })}
            </SimpleGrid>
        </Box>
    );
};



