import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import {
  logout,
  selectLogIn,
  selectUser,
} from "src/store/reducer/registerSlice";
import { message } from "antd";
import LoginPage from "src/page/login";

export function Authorization(props: any) {
  const user = useAppSelector(selectUser);
  const loginDate = useAppSelector(selectLogIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeoutInterval = setInterval(() => {
      if (user._id && loginDate) {
        if (new Date() > loginDate) {
          dispatch(logout());
          message.info("Login süreniz dolmuştur.");
        }
      }
    }, 1000);

    return () => {
      clearInterval(timeoutInterval);
    };
  }, [user]);

  if (user && user._id) {
    return props?.children;
  } else {
    return <LoginPage />;
  }
}
