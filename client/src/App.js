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

const { io } = require("socket.io-client");
const socket = io(process.env.REACT_APP_BACKEND_SERVER_ENDPOINT);
const App = () => {
  const user = window.localStorage.getItem("user");
  useEffect(() => {
    socket.emit("setup", user);
    socket.on("connected", (userId) => {
      console.log("Connected " + userId);
    });
  }, []);

  return (
    <>
      <ToastContainer></ToastContainer>
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
        <Route path="/register/complete" element={<RegisterComplete />}></Route>
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
              </div>
            </div>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
