import type { PriceData, SettingsData } from "../../types";
import { Logger } from "./logger";

const logger = new Logger();

export const getPrices = async () => {
  try {
    const response = await fetch("/api/prices");

    if (!response.ok) {
      throw new Error("Failed to fetch prices");
    }

    return response.json() as Promise<PriceData>;
  } catch (error) {
    logger.error("Failed to fetch prices", error);
  }
};

export const getSettings = async () => {
  try {
  const response = await fetch("/api/settings");

  if (!response.ok) {
    throw new Error("Failed to fetch settings");
  }

  return response.json() as Promise<SettingsData>;
} catch (error) {
  logger.error("Failed to fetch settings", error);
}
};
