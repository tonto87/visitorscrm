import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppPaths } from "../constants/appPaths";

const ProtectedRoute = ({ element, permissionGroup }) => {
  const { user } = useSelector((state) => state.auth);

  if (
    permissionGroup?.includes(user?.role?.toLowerCase()) ||
    user?.role?.toLowerCase() === "admin"
  ) {
    return element;
  }
  return <Navigate to={AppPaths.errors.forbidden} />;
};

export default ProtectedRoute;
