import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { message } from "antd";
import { CurrenciesState } from "src/types/currenciesState";
import { DashboardManager } from "src/services/dashboradManager";
import { getCurrencies } from "src/api";
import { BSDataState } from "src/types/bsDataState";

export interface DashboardSlice {
  currencies: CurrenciesState[];
  bsData: BSDataState;
}

const currenciesData = DashboardManager.getCurrenciesData();

const initialState: DashboardSlice = {
  currencies: currenciesData,
  bsData: { currency: "", open: false, type: "B", value: 0 },
};

export const currenciesAsync = createAsyncThunk(
  "dashboard/currencies",
  async () => {
    const response = await getCurrencies();
    return response;
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setBSData: (state, action: PayloadAction<BSDataState>) => {
      state.bsData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        currenciesAsync.fulfilled,
        (state, action: PayloadAction<CurrenciesState[]>) => {
          state.currencies = action.payload;
          DashboardManager.setCurrencies(action.payload);
        }
      )
      .addCase(currenciesAsync.rejected, (state, action) => {
        message.error(action.error.message);
      });
  },
});

export const { setBSData } = dashboardSlice.actions;

export const selectCurrencies = (state: RootState) => state.dasboard.currencies;
export const selectBSData = (state: RootState) => state.dasboard.bsData;

export default dashboardSlice.reducer;
