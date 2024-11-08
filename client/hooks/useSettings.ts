import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../utils/api";
import { SettingQueryTypes } from "../../types";

export const useSettings = () => {
  return useQuery<SettingQueryTypes, Error>({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
};
