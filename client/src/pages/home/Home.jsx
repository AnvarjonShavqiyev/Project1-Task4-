import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Button, Tooltip } from "@mui/material";
import { Container } from "../../utils/Utils";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "../../api/axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Home.scss";
import { ToastContainer, toast } from "react-toastify";
import instance from "../../api/axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Home = () => {
  const [usersData, setUsersData] = useState();
  const [rows, setRows] = useState([]);
  const [userIds, setSelectedUserIds] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  useEffect(() => {
    axios.get("/user").then((response) => setUsersData(response.data));
  }, []);
  function getTime(dayTime) {
    let day = dayTime.split(" ")[0];
    let time = dayTime.split(" ")[1];

    day = day.split("-");
    day = day.map((d) => (d.length < 2 ? "0" + d : d));
    day = day.join("-");

    time = time.split(":");
    time = time.map((t) => (t.length < 2 ? "0" + t : t));
    time = time.join(":");

    return day + " " + time;
  }
  useEffect(() => {
    usersData &&
      setRows(
        usersData.map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          lstLogTime: getTime(user.lstLogTime),
          regTime: getTime(user.regTime),
          status: user.status ? "Active" : "Blocked",
        }))
      );
  }, [usersData]);
  const handleCheckboxChange = (userId) => {
    const updatedSelectedUserIds = userIds.includes(userId)
      ? userIds.filter((id) => id !== userId)
      : [...userIds, userId];

    setSelectedUserIds(updatedSelectedUserIds);
    setIsAllChecked(updatedSelectedUserIds.length === rows.length);
  };

  const handleSelectAllChange = () => {
    const allChecked = !isAllChecked;
    setIsAllChecked(allChecked);
    setSelectedUserIds(allChecked ? rows.map((row) => row.id) : []);
  };

  const handleDeleteUsers = () => {
    if (window.confirm("Are you sure that?")) {
      instance
        .delete("/user/delete", { data: { userIds: userIds } })
        .then((response) => {
          if (response.status === 200) {
            setRows((prevRows) =>
              prevRows.filter((row) => !userIds.includes(row.id))
            );
            setSelectedUserIds([]);
            toast.success("Users deleted!");
          }
        });
    } else {
      toast.info("Operation canceled!");
    }
  };

  const handleBlockUsers = () => {
    if (window.confirm("Are you sure that?")) {
      instance
        .patch("/user/update", { userIds: userIds, status: "false" })
        .then((response) => {
          if (response.status === 200) {
            setRows((prevRows) =>
              prevRows.map((row) => ({
                ...row,
                status: userIds.includes(row.id) ? "Blocked" : row.status,
              }))
            );
            setSelectedUserIds([])
            toast.success("Users blocked!");
          }
        });
    } else {
      toast.info("Operation canceled!");
    }
  };
  const handleUnlockUsers = () => {
    if (window.confirm("Are you sure that?")) {
      instance
        .patch("/user/update", { userIds: userIds, status: "true" })
        .then((response) => {
          if (response.status === 200) {
            setRows((prevRows) =>
              prevRows.map((row) => ({
                ...row,
                status: userIds.includes(row.id) ? "Active" : row.status,
              }))
            );
            setSelectedUserIds([])
            toast.success("Users unlocked!");
          }
        });
    } else {
      toast.info("Operation canceled!");
    }
  };

 
  return (
    <>
      <Navbar />
      <Container>
        <div className="actions-wrapper">
          <Button
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
            color="error"
            variant="contained"
            onClick={() => handleBlockUsers()}
          >
            <CiLock className="lock-icon" /> Block
          </Button>
          <Tooltip title="Unblock" placement="top">
            <Button
              onClick={() => handleUnlockUsers()}
              className="custom-hover"
            >
              <CiUnlock className="unlock-icon" />
            </Button>
          </Tooltip>
          <Tooltip title="Delete" placement="top">
            <Button
              onClick={() => handleDeleteUsers()}
              className="custom-hover"
            >
              <RiDeleteBinLine className="unlock-icon" />
            </Button>
          </Tooltip>
        </div>
        <p style={{ fontSize: "20px", marginBottom: "20px" }}>Users Table</p>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">
                  <input
                    type="checkbox"
                    className={
                      !isAllChecked && userIds.length > 0
                        ? "custom-checkbox-minus"
                        : "custom-checkbox"
                    }
                    onChange={handleSelectAllChange}
                    checked={isAllChecked}
                  />
                </StyledTableCell>
                <StyledTableCell align="left">ID</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Last Login Time</StyledTableCell>
                <StyledTableCell align="left">
                  Registration Time
                </StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={userIds.includes(row.id)}
                      onChange={() => handleCheckboxChange(row.id)}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.id}</StyledTableCell>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.lstLogTime}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.regTime}</StyledTableCell>
                  <StyledTableCell align="left">{row.status}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Home;
