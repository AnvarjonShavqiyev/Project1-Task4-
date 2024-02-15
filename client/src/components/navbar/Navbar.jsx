import React from "react";
import "./Navbar.scss";
import { Container } from "../../utils/Utils";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate()
  function doLogOut(){
    localStorage.removeItem('Token')
    localStorage.removeItem('username')
    navigate('/signIn')
  }
  
  return (
    <div className="navbar-wrapper">
      <Container>
        <div className="navbar">
          <p className="username">Hello, {username}</p>
          <button onClick={() => doLogOut()} className="log-out-btn">Log Out</button>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
