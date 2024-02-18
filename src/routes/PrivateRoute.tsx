// PrivateRoute.tsx
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthProvider";

const PrivateRoute = () => {
  const { token } = useAuth();

  return token ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default PrivateRoute;
