import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../firebase";
import { createOrUpdateUser } from "../../utils/auth";
import AppPreviewSection from "./AppPreviewSection";
import FormSection from "./FormSection";
import AuthHOC from "./AuthHOC";
import { UserState } from "../../components/context/UserProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { user, setUser, setUserLoading } = UserState();
  const navigate = useNavigate();
  const handlePasswordVisiblility = (event) => {
    event.preventDefault();
    setPasswordVisible((prevState) => !prevState);
  };

  if (user) {
    navigate("/chats");
  }
  const handleLogin = async (event) => {
    event.preventDefault();
    window.localStorage.setItem("userLoading", "true");
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const idTokenResult = await result.user.getIdTokenResult();
      const response = await createOrUpdateUser(idTokenResult.token);
      const loggedInUser = {
        name: response.data.name,
        email: response.data.email,
        profilePicture: response.data.profilePicture,
        token: idTokenResult.token,
        _id: response.data._id,
      };

      setUser(loggedInUser);
      navigate("/chats");
    } catch (error) {
      window.localStorage.setItem("userLoading", "false");
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async (event) => {
    event.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);

      const idTokenResult = await result.user.getIdTokenResult();
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
    }
  };
  return (
    <AuthHOC>
      <AppPreviewSection />
      <FormSection>
        <form className="login-form">
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
