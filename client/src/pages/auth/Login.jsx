import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../firebase";
import { createOrUpdateUser } from "../../utils/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const handlePasswordVisiblility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      const response = await createOrUpdateUser(idTokenResult.token);
      const loggedInUser = {
        name: response.data.name,
        email: response.data.email,
        profilePicture: response.data.profilePicture,
      };
      window.localStorage.setItem("user", JSON.stringify(loggedInUser));
      navigate("/chats");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const { user } = result;
      console.log(user);
      const idTokenResult = await user.getIdTokenResult();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div>
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
            <Button
              className="input-group-text"
              onClick={handlePasswordVisiblility}
              disabled={!password}
            >
              {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </Button>
          </div>
        </div>
        <Button onClick={handleLogin} disabled={!email || password.length < 6}>
          Login
        </Button>
        <a href="/forgot-password">Forgot Password?</a>
        <div>
          Don't have an account? <a href="/register">Sign Up</a>
        </div>
        <hr data-content="OR" className="hr-text" />
        <div className="form-group">
          <Button onClick={handleGoogleLogin} className="">
            <GoogleOutlined />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
