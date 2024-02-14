import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "../pages/auth/Auth";
import Home from "../pages/home/Home";

const index = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signIn" />} />
      <Route path="/:authName" element={<Auth />} />
      <Route path="/dashboard" element={<Home />} />
    </Routes>
  );
};

export default index;
