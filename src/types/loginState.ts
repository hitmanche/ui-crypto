import { UserAccountState } from "./userAccountState";
import { UserState } from "./userState";

export interface LoginState {
  user: UserState;
  userAccount: UserAccountState[];
  token: String;
  expires: Number;
}
