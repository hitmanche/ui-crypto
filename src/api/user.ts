import { UserAccountState } from "src/types/userAccountState";
import axiosInstance from "./axios";

export async function getUserAccount() {
  const { data } = await axiosInstance.get<UserAccountState[]>("user/account");
  return data;
}
