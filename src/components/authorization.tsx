import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { logout, selectUser } from "src/store/reducer/registerSlice";
import LoginPage from "src/page/login";
import DashboardComponent from "src/page/dashboard";
import axiosInstance from "src/api/axios";

export function Authorization() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch(logout());
        }
        return Promise.reject(error);
      }
    );
  }, [dispatch, user]);

  if (user && user._id) {
    return <DashboardComponent />;
  } else {
    return <LoginPage />;
  }
}
