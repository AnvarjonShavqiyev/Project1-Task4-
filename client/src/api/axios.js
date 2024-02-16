import axios from "axios";

const instance = axios.create({
  baseURL: "https://itrnasition-task4.onrender.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 10000,
});

export default instance;
