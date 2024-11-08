import { TZDate } from "@date-fns/tz";
import { Card, Text } from "@mantine/core";
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
    <Card
      radius="md"
      bg={highlight ? "#5b48ee" : "white"}
      p="sm"
      itemType="center"
      bd={10}
    >
      <Text color="black">{format(date, "dd")}</Text>
      {priceData?.error ? (
        <Text color="red" size="lg">
          N/A
        </Text>
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
    </Card>
  );
};
