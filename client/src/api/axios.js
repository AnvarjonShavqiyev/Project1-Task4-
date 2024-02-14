import axios from "axios";

const instance = axios.create({
  baseURL: "https://task4-oyzn.onrender.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 10000,
});

export default instance