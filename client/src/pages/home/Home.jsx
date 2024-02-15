import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Button, Tooltip } from "@mui/material";
import { Container } from "../../utils/Utils";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";

import "./Home.scss";
const Home = () => {
  return (
    <>
      <Navbar />
      <Container>
        <div className="actions-wrapper">
          <Button
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
            color="error"
            variant="contained"
          >
            <CiLock className="lock-icon" /> Block
          </Button>
          <Tooltip title="Unblock" placement="top">
            <Button className="custom-hover">
              <CiUnlock className="unlock-icon" />
            </Button>
          </Tooltip>
          <Tooltip title="Delete" placement="top">
            <Button className="custom-hover">
              <RiDeleteBinLine className="unlock-icon" />
            </Button>
          </Tooltip>
        </div>
      </Container>
    </>
  );
};

export default Home;
