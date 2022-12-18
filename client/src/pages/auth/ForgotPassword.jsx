import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import AppPreviewSection from "../auth/AppPreviewSection";
import AuthHOC from "../auth/AuthHOC";
import FormSection from "../auth/FormSection";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const handlePasswordReset = async (event) => {
    event.preventDefault();
    if (!email) return;
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await sendPasswordResetEmail(auth, email, config);
    toast.success(`Password reset link sent to ${email}`);
  };
  return (
    <AuthHOC>
      <AppPreviewSection />
      <FormSection>
        <form className="login-form" onSubmit={handlePasswordReset}>
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
          <div className="d-flex" style={{ justifyContent: "flex-end" }}>
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
              onClick={handlePasswordReset}
              disabled={!email}
            >
              Send Password Reset Link
            </button>
          </div>
        </form>
      </FormSection>
    </AuthHOC>
  );
};

export default ForgotPassword;
