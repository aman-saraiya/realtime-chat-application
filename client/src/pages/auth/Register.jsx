import { Button } from "antd";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";

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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
          <Button onClick={handleSubmit}>Register</Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
