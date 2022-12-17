import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
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

const RegisterComplete = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
    password: "",
  });
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    setUser((prevState) => ({
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
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const validateUserDetails = () => {
    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      toast.error("Please provide all the required details");
      return false;
    } else if (user.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };
  const handleRegistration = async (event) => {
    event.preventDefault();
    const isValidated = validateUserDetails();
    if (!isValidated) return;

    try {
      const result = await signInWithEmailLink(
        auth,
        user.email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        let registeredUser = auth.currentUser;
        await updatePassword(registeredUser, user.password);
        await updateProfile(registeredUser, {
          displayName: `${user.firstName} ${user.lastName}`,
        });
        const idTokenResult = await registeredUser.getIdTokenResult();
        const response = await createOrUpdateUser(idTokenResult.token);
        const loggedInUser = {
          name: response.data.name,
          email: response.data.email,
          profilePicture: response.data.profilePicture,
          token: idTokenResult.token,
          _id: response.data._id,
        };
        window.localStorage.setItem("user", JSON.stringify(loggedInUser));
        navigate("/chats");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  const uploadImageToCloudinary = () => {};
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
              value={user.firstName}
            />

            <input
              type="text"
              name="lastName"
              onChange={handleInputChange}
              placeholder="Last Name"
              className="auth-form-input flex-grow-1"
              value={user.lastName}
            />

            <input
              type="email"
              value={user.email}
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
                value={user.password}
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
                  disabled={!user.password}
                >
                  {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </button>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <input
              type="file"
              name="profilePicture"
              onChange={handleInputChange}
              className="auth-form-input flex-grow-1"
            />
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
