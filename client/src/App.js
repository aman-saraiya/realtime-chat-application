import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Chats from "./pages/Chats";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import ChatsProvider from "./components/context/ChatsProvider";
import AuthHOC from "./pages/auth/AuthHOC";
import UserProvider from "./components/context/UserProvider";
import { HeartFilled } from "@ant-design/icons";
const { io } = require("socket.io-client");
const socket = io(process.env.REACT_APP_BACKEND_SERVER_ENDPOINT);
const App = () => {
  return (
    <>
      <ToastContainer></ToastContainer>
      <UserProvider>
        <Routes>
          <Route
            path="/"
            element={
              <AuthHOC>
                <Home />
              </AuthHOC>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/register/complete"
            element={<RegisterComplete />}
          ></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route
            path="/chats"
            element={
              <div className="body-background">
                <div className="app-window">
                  <ProtectedRoute>
                    <ChatsProvider>
                      <Chats socket={socket} />
                    </ChatsProvider>
                  </ProtectedRoute>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ fontSize: "0.6rem" }}
                  >
                    Made with{" "}
                    <HeartFilled
                      style={{
                        color: "#19bd06",
                        fontSize: "0.6rem",
                        marginLeft: "0.3rem",
                        marginRight: "0.3rem",
                      }}
                    />{" "}
                    by{" "}
                    <span
                      style={{
                        color: "#19bd06",
                        marginLeft: "0.3rem",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      Aman
                    </span>
                  </div>
                </div>
              </div>
            }
          ></Route>
        </Routes>
      </UserProvider>
    </>
  );
};

export default App;
