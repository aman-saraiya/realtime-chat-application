import { Button } from "antd";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

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
    <div>
      <form onSubmit={handlePasswordReset}>
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
        <Button onClick={handlePasswordReset} disabled={!email}>
          Send Password Reset Link
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
