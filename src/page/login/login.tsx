import React from "react";
import { Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { loginAsync } from "src/store/reducer/registerSlice";
import { useAppDispatch } from "src/store/hooks";

const Login: React.FC<{ triggerTab: Function }> = ({ triggerTab }) => {
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    dispatch(loginAsync(values));
  };

  return (
    <>
      <Form
        style={{ minWidth: "25%" }}
        name="login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
            type={"email"}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="ghost"
            onClick={() => triggerTab()}
            className="login-form-button"
          >
            Register
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
