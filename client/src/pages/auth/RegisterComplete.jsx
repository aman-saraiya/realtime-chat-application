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

  const handlePasswordVisiblility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  const handleInputChange = (event) => {
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
    <div>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="firstName"
            onChange={handleInputChange}
            placeholder="First Name"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="lastName"
            onChange={handleInputChange}
            placeholder="Last Name"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            value={user.email}
            className="form-control"
            name="email"
            onChange={handleInputChange}
            placeholder="Email"
            disabled
          />
        </div>
        <div className="form-group">
          <div className="input-group">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={user.password}
              className="form-control"
              onChange={handleInputChange}
              placeholder="Password"
            />
            <Button
              className="input-group-text"
              onClick={handlePasswordVisiblility}
              disabled={!user.password}
            >
              {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </Button>
          </div>
        </div>
        <div className="form-group">
          <input
            type="file"
            className="form-control"
            name="profilePicture"
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" onClick={handleRegistration}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterComplete;
