import { useQuery } from "@tanstack/react-query";
import { getPrices } from "../utils/api";
import { PriceQueryType } from "../../types";

export const usePrices = () => {
  return useQuery<PriceQueryType, Error>({
    queryKey: ["prices"],
    queryFn: getPrices,
  });
};
