import { TZDate } from "@date-fns/tz";
import { Box, Text } from "@mantine/core";
import { format } from "date-fns";

interface CalendarDayProps {
    date: TZDate;
    priceData?: {
        price: number;
        price_in_pms: number | null;
        error?: boolean;
        error_reason?: string;
    };
    currencySymbol: string;
}

export const DaysOfTheMonth: React.FC<CalendarDayProps> = ({
    date,
    priceData,
    currencySymbol,
}) => {
    const priceDifference = priceData?.price_in_pms
        ? Math.abs(priceData.price - priceData.price_in_pms)
        : 0;
    const highlight = priceDifference >= (priceData?.price_in_pms ?? 0) * 0.04;

    return (
        <Box bg={highlight ? "#5b48ee" : "white"} p="sm" itemType="center" bd={10}>
            <Text color="white">{format(date, "dd")}</Text>
            {priceData?.error ? (
                <Text size="lg">N/A</Text>
            ) : (
                <>
                    <Text size="sm" color="black">
                        {currencySymbol}
                        {priceData?.price}
                    </Text>
                    {priceData?.price_in_pms && (
                        <Text size="xs" color="yellow">
                            PMS: {currencySymbol}
                            {priceData.price_in_pms}
                        </Text>
                    )}
                </>
            )}
        </Box>
    );
};
