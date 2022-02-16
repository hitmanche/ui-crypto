import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postLogin, postRegister } from "src/api/auth";
import { UserState } from "src/types/userState";
import { UserAccountState } from "src/types/userAccountState";
import { UserLoginState } from "src/types/userLoginState";
import { RootState } from "../../store/store";
import { LoginState } from "src/types/loginState";
import { message } from "antd";
import { LoginManager } from "src/services/loginManager";
import { getUserAccount } from "src/api/user";
import axiosInstance from "src/api/axios";

export interface RegisterState {
  user: UserState;
  userAccount: UserAccountState[];
  token: String;
  expires: Number;
  state: "idle" | "loading";
}

const localUserData = LoginManager.getLoginData();

const initialState: RegisterState = {
  user: localUserData.user,
  userAccount: localUserData.userAccount,
  token: localUserData.token,
  expires: localUserData.expires,
  state: "idle",
};

export const loginAsync = createAsyncThunk(
  "register/login",
  async (userLogin: UserLoginState) => {
    const response = await postLogin(userLogin.email, userLogin.password);
    return response;
  }
);

export const registerAsync = createAsyncThunk(
  "register/register",
  async (userData: UserState) => {
    const response = await postRegister(userData);
    userData._body(userData.email.toString(), userData.password.toString());
    return response;
  }
);

export const userAccountAsync = createAsyncThunk(
  "register/userAccount",
  async () => {
    const response = await getUserAccount();
    return response;
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {} as UserState;
      state.token = "";
      state.expires = 0;
      state.state = "idle";
      LoginManager.clearLoginData();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.state = "loading";
      })
      .addCase(
        loginAsync.fulfilled,
        (state, action: PayloadAction<LoginState>) => {
          axiosInstance.defaults.headers.common["x-token"] =
            action.payload.token.toString();
          state.state = "idle";
          state.user = action.payload.user;
          state.userAccount = action.payload.userAccount;
          state.token = action.payload.token;
          state.expires = action.payload.expires;
          LoginManager.setLoginData(action.payload);
        }
      )
      .addCase(loginAsync.rejected, (state, action) => {
        message.error(action.error.message);
        state.state = "idle";
      })
      .addCase(registerAsync.pending, (state) => {
        state.state = "loading";
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        message.info(action.payload);
        state.state = "idle";
      })
      .addCase(registerAsync.rejected, (state, action) => {
        message.error(action.error.message);
        state.state = "idle";
      })
      .addCase(userAccountAsync.fulfilled, (state, action) => {
        state.userAccount = action.payload;
        LoginManager.setUserAccount(action.payload);
      });
  },
});

export const { logout } = registerSlice.actions;
export const selectUser = (state: RootState) => state.register.user;
export const selectUserAccount = (state: RootState) =>
  state.register.userAccount;
export const selectToken = (state: RootState) => state.register.token;
export const selectExpires = (state: RootState) => state.register.expires;
export const selectState = (state: RootState) => state.register.state;

export default registerSlice.reducer;
