import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrUpdateUser } from "../../utils/auth";
import { useEffect } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import {
  signInWithEmailLink,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import AuthHOC from "./AuthHOC";
import AppPreviewSection from "./AppPreviewSection";
import FormSection from "./FormSection";
import { UserState } from "../../components/context/UserProvider";

const RegisterComplete = () => {
  const { user } = UserState();

  useEffect(() => {
    if (user) {
      navigate("/chats");
    }
  }, [user]);

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem("emailForRegistration")) {
      navigate("/register");
    }
    setUserDetails((prevState) => ({
      ...prevState,
      email: window.localStorage.getItem("emailForRegistration"),
    }));
  }, []);

  const handlePasswordVisiblility = (event) => {
    event.preventDefault();
    setPasswordVisible((prevState) => !prevState);
  };
  const handleInputChange = (event) => {
    event.preventDefault();
    setUserDetails((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const validateUserDetails = () => {
    if (
      !userDetails.firstName ||
      !userDetails.lastName ||
      !userDetails.email ||
      !userDetails.password
    ) {
      toast.error("Please provide all the required details");
      return false;
    } else if (userDetails.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };
  const handleRegistration = async (event) => {
    event.preventDefault();
    window.localStorage.setItem("userLoading", "true");
    // setUserLoading(true);
    const isValidated = validateUserDetails();
    if (!isValidated) return;

    try {
      const result = await signInWithEmailLink(
        auth,
        userDetails.email,
        window.location.href
      );
      if (result.userDetails.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        let registeredUser = auth.currentUser;
        await updatePassword(registeredUser, userDetails.password);
        const idTokenResult = await registeredUser.getIdTokenResult();
        await updateProfile(registeredUser, {
          displayName: `${userDetails.firstName} ${userDetails.lastName}`,
        });
        const response = await createOrUpdateUser();
      }
    } catch (error) {
      window.localStorage.setItem("userLoading", "false");
      // console.log(error);
      toast.error(error);
    }
  };
  return (
    <AuthHOC>
      <AppPreviewSection />
      <FormSection>
        <form className="login-form">
          <div className="d-flex flex-column">
            <input
              type="text"
              name="firstName"
              onChange={handleInputChange}
              placeholder="First Name"
              className="auth-form-input flex-grow-1"
              value={userDetails.firstName}
            />

            <input
              type="text"
              name="lastName"
              onChange={handleInputChange}
              placeholder="Last Name"
              className="auth-form-input flex-grow-1"
              value={userDetails.lastName}
            />

            <input
              type="email"
              value={userDetails.email}
              name="email"
              onChange={handleInputChange}
              placeholder="Email"
              disabled
              className="auth-form-input flex-grow-1"
            />
          </div>

          <div>
            <div className="d-flex">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={userDetails.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="auth-form-input flex-grow-1"
                style={{ borderRight: "none" }}
              />
              <div
                className="d-flex align-items-center justify-content-center auth-form-input"
                style={{ border: "1px solid ##dfdede", borderLeft: "none" }}
              >
                <button
                  className="d-flex"
                  style={{
                    outline: "none",
                    backgroundColor: "#ffffff",
                    border: "none",
                  }}
                  onClick={handlePasswordVisiblility}
                  disabled={!userDetails.password}
                >
                  {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </button>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
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
              type="submit"
              onClick={handleRegistration}
            >
              Complete Registration
            </button>
          </div>
        </form>
      </FormSection>
    </AuthHOC>
  );
};

export default RegisterComplete;
