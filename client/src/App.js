import React from "react";
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

const App = () => {
  return (
    <div className="body-background">
      <div className="app-window" style={{ border: "1px solid red" }}>
        <ToastContainer></ToastContainer>
        <Routes>
          <Route path="/" element={<Home />}></Route>
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
              <ProtectedRoute>
                <ChatsProvider>
                  <Chats />
                </ChatsProvider>
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
