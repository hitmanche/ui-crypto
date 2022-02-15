import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import registerSlice from "./reducer/registerSlice";
import dashboardSlice from "./reducer/dashboardSlice";

export const store = configureStore({
  reducer: {
    register: registerSlice,
    dasboard: dashboardSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
