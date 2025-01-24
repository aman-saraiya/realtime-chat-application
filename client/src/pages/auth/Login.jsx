import React, { useEffect, useState } from "react";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  EyeInvisibleOutlined,
  EyeOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

import { UserState } from "../../components/context/UserProvider";
import { auth, googleAuthProvider } from "../../firebase";
import { createOrUpdateUser } from "../../utils/auth";
import AppPreviewSection from "./AppPreviewSection";
import AuthHOC from "./AuthHOC";
import FormSection from "./FormSection";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { user, setUser } = UserState();
  const navigate = useNavigate();
  const handlePasswordVisiblility = (event) => {
    event.preventDefault();
    setPasswordVisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (user) {
      navigate("/chats");
    }
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    // window.localStorage.setItem("userLoading", "true");

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // const idTokenResult = await result.user.getIdTokenResult();
      // const response = await createOrUpdateUser();
      // const loggedInUser = {
      //   name: response.data.name,
      //   email: response.data.email,
      //   profilePicture: response.data.profilePicture,
      //   token: idTokenResult.token,
      //   _id: response.data._id,
      // };

      // setUser(loggedInUser);
      navigate("/chats");
    } catch (error) {
      window.localStorage.setItem("userLoading", "false");
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async (event) => {
    event.preventDefault();
    window.localStorage.setItem("userLoading", "true");
    window.localStorage.setItem("userCreating", "true");
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const response = await createOrUpdateUser();
    } catch (error) {
      window.localStorage.setItem("userLoading", "false");
      console.log(error);
    }
    window.localStorage.setItem("userCreating", "false");
  };
  return (
    <AuthHOC>
      <AppPreviewSection />
      <FormSection>
        <form className="login-form">
          {/* <AppName /> */}
          <div
            style={{
              fontFamily: "serif",
              marginBottom: "0.5rem",
              fontSize: "1.2rem",
              color: "#19bd06",
            }}
          >
            Welcome,
          </div>
          <div className="d-flex">
            <input
              type="email"
              name="email"
              value={email}
              className="auth-form-input flex-grow-1"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
            />
          </div>
          <div>
            <div className="d-flex">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={password}
                className="auth-form-input flex-grow-1"
                style={{ borderRight: "none" }}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
              <div
                className="d-flex align-items-center justify-content-center auth-form-input"
                style={{ border: "1px solid #dfdede", borderLeft: "none" }}
              >
                <button
                  className="d-flex"
                  style={{
                    outline: "none",
                    backgroundColor: "#ffffff",
                    color: "#9c9a9a",
                    border: "none",
                  }}
                  onClick={handlePasswordVisiblility}
                  disabled={!password}
                >
                  {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </button>
              </div>
            </div>
          </div>
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <a href="/forgot-password">
              <div style={{ fontSize: "0.6rem" }}>Forgot Password?</div>
            </a>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.5rem",
                width: "40%",
                justifyContent: "center",
                backgroundColor: "#19bd06",
                color: "#ffffff",
                outline: "none",
                border: "none",
                height: "1.4rem",
                fontSize: "0.8rem",
              }}
              onClick={handleLogin}
              disabled={!email || password.length < 6}
            >
              Login
            </button>
          </div>
          <div style={{ fontSize: "0.6rem" }}>
            Don't have an account? <a href="/register">Sign Up</a>
          </div>
          <hr data-content="or" className="hr-text" />
          <div className="justify-content-center  d-flex align-items-center">
            <button
              style={{
                fontSize: "0.8rem",
                border: "none",
                outline: "none",
                backgroundColor: "#19bd06",
                color: "#ffffff",
                padding: "0.05rem",
                display: "flex",
                alignItems: "center",
                flex: 1,
                justifyContent: "center",
              }}
              onClick={handleGoogleLogin}
            >
              <GoogleOutlined style={{ paddingRight: "0.5rem" }} /> Login with
              Google
            </button>
          </div>
        </form>
      </FormSection>
    </AuthHOC>
  );
};

export default Login;
