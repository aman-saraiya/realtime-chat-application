import React, { useState } from "react";
import { Button } from "antd";
import { EyeOutlined, EyeInvisibleOutlined, GoogleOutlined } from "@ant-design/icons";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisiblility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  return (
    <div className="container" >
      <form>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={email}
            className="form-control"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <div className="input-group">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={password}
              className="form-control"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
            <Button className="input-group-text" onClick={handlePasswordVisiblility} disabled={!password}>
              {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </Button>
          </div>
        </div>
        <Button>Login</Button>
        <div>
          Don't have an account? <a href="/register">Sign Up</a>
        </div>
        <hr data-content="OR" class="hr-text"/>
        <div className="form-group">
          <Button className=""><GoogleOutlined /></Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
