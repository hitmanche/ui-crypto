import { LoginState } from "src/types/loginState";
import axiosInstance from "./axios";
import { UserState } from "src/types/userState";


export function postLogin(email: String, password: String) {
  return new Promise<LoginState>((resolve, reject) =>
    axiosInstance
      .post<LoginState>("auth/login", { email, password })
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

export function postRegister(data: any) {
  return new Promise<UserState>((resolve, reject) =>
    axiosInstance
      .post<UserState>("auth/register", data)
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
