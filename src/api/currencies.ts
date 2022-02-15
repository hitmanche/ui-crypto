import { CurrenciesState } from "src/types/currenciesState";
import axiosInstance from "./axios";

export async function getCurrencies() {
  const { data } = await axiosInstance.get<CurrenciesState[]>("currencies");
  return data;
}
