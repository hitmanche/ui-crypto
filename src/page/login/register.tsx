import React from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAppDispatch } from "src/store/hooks";
import { registerAsync } from "src/store/reducer/registerSlice";

const Register: React.FC<{ triggerTab: Function }> = ({ triggerTab }) => {
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    dispatch(registerAsync(values));
  };

  return (
    <>
      <Form
        style={{ minWidth: "25%" }}
        name="register"
        className="register-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please input your Full Name!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Full Name"
          />
        </Form.Item>
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
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Email"
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
            Login
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Register;
