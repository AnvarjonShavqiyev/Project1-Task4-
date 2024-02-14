import { Navigate } from "react-router-dom";
import { validateToken } from "../../helpers";
import Home from "../../pages/home/Home";

const Private = () => {
  const token = localStorage.getItem("Token") || "";
  return validateToken(token) ? <Home /> : <Navigate to={"/signIn"} />;
};

export default Private;
