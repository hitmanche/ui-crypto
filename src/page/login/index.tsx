import { Typography } from "antd";
import { useState } from "react";
import Login from "./login";
import Register from "./register";

export default function LoginPage() {
  const [stateTab, setStateTab] = useState<boolean>(true);
  const triggerTab = () => {
    setStateTab((old) => !old);
  };

  return (
    <div className="App">
      <div className="App-header">
        <Typography.Title level={1}>Crypto Exchange</Typography.Title>
        <hr />
        {stateTab && <Login triggerTab={triggerTab} />}
        {!stateTab && <Register triggerTab={triggerTab} />}
      </div>
    </div>
  );
}
