import { CurrenciesState } from "src/types/currenciesState";
import { LSManager } from "./lsManager";

export class DashboardManager {
  static setCurrencies(currenciesData: CurrenciesState[]) {
    LSManager.setLS("currenciesData", JSON.stringify(currenciesData));
  }

  static getCurrenciesData(): CurrenciesState[] {
    const currenciesData = JSON.parse(
      LSManager.getLS("currenciesData")
        ? LSManager.getLS("currenciesData").toString()
        : "[]"
    ) as CurrenciesState[];

    return currenciesData;
  }
}
