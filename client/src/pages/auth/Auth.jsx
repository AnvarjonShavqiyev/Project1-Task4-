import React from "react";
import { Link } from "react-router-dom";
import "./Auth.scss";
const Auth = () => {
  return (
    <div className="auth-wrapper">
      <div className="auth-header">
        <Link className="auth-link" to="/signIn">Sign In</Link>
        <Link className="auth-link" to="/signUp">Sign Up</Link>
      </div>
    </div>
  );
};

export default Auth;
