import { LoginState } from "src/types/loginState";
import { UserAccountState } from "src/types/userAccountState";
import { UserState } from "src/types/userState";
import { LSManager } from "./lsManager";

export class LoginManager {
  static setLoginData(loginData: LoginState) {
    LSManager.setLS("expires", loginData.expires.toString());
    LSManager.setLS("token", loginData.token.toString());
    LSManager.setLS("user", JSON.stringify(loginData.user));
    LSManager.setLS("userAccount", JSON.stringify(loginData.userAccount));
  }

  static clearLoginData() {
    LSManager.removeLS("expires");
    LSManager.removeLS("token");
    LSManager.removeLS("user");
    LSManager.removeLS("userAccount");
  }

  static getLoginData(): LoginState {
    const expires = Number(LSManager.getLS("expires"));
    const token = LSManager.getLS("token").toString();
    const userState = JSON.parse(
      LSManager.getLS("user") ? LSManager.getLS("user").toString() : "{}"
    ) as UserState;
    const userAccount = JSON.parse(
      LSManager.getLS("userAccount")
        ? LSManager.getLS("userAccount").toString()
        : "[]"
    ) as UserAccountState[];

    return { user: userState, expires, token, userAccount };
  }

  static setUserAccount(userAccountData: UserAccountState[]) {
    LSManager.setLS("userAccount", JSON.stringify(userAccountData));
  }
  static getUserAccount() {
    const userAccount = JSON.parse(
      LSManager.getLS("userAccount")
        ? LSManager.getLS("userAccount").toString()
        : "[]"
    ) as UserAccountState[];
    return userAccount;
  }
}
