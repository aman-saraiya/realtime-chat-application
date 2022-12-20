import React, { useState } from "react";
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
import AuthHOC from "./AuthHOC";
import AppPreviewSection from "./AppPreviewSection";
import FormSection from "./FormSection";

const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    try {
      await sendSignInLinkToEmail(auth, email, config);
      toast.success(
        `Sign-In link is sent to ${email}. Click the link to complete your registration.`
      );
      window.localStorage.setItem("emailForRegistration", email);
    } catch (error) {
      toast.error("Unexpected error occurred. Please retry!");
      console.log(error);
    }
    setEmail("");
  };
  return (
    <AuthHOC>
      <AppPreviewSection />
      <FormSection>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="d-flex">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="auth-form-input flex-grow-1"
              placeholder="Email"
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
              disabled={!email}
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </form>
      </FormSection>
    </AuthHOC>
  );
};

export default Register;
