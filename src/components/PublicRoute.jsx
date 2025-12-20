import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    // If user is already logged in, redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
