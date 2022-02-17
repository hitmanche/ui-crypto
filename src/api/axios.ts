import axios from "axios";
import { LoginManager } from "src/services/loginManager";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://crypto-exchange-meditopia.herokuapp.com/"
    : "http://localhost:4500/";
axiosInstance.defaults.timeout = 25000;
axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
axiosInstance.defaults.headers.common["Accept"] = "application/json";
axiosInstance.defaults.headers.common["x-token"] =
  LoginManager.getLoginData().token.toString();

export default axiosInstance;
