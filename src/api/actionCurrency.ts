import { ActionCurrencyState } from "src/types/actionCurrencyState";
import axiosInstance from "./axios";

export function postActionCurrency(data: ActionCurrencyState) {
  return new Promise<ActionCurrencyState>((resolve, reject) =>
    axiosInstance
      .post<ActionCurrencyState>("actionCurrency", data)
      .then(async (res: any) => {
        if (res.status < 240) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch((err: any) => reject(err.response.data))
  );
}
