import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SocketContext } from "../Context/socketContext";

export const ProtectedRoute = () => {
  const { auth } = useContext(SocketContext);

  return auth ? <Outlet /> : <Navigate to="/signin" />;
};
