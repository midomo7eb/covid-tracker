import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "./loader";
import { logout, webAuth } from "../services/auth0Service";
const Authorize = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const parseAuthToken = () => {
    if (window.location.hash) {
      webAuth.parseHash({ hash: window.location.hash }, (err, res) => {
        if (err) {
          logout();
          return;
        }
        localStorage.setItem("auth_token", res.idToken);
        setIsAuthenticated(true);
      });
    }
  };

  useEffect(parseAuthToken, []);

  if (isAuthenticated) {
    return <Navigate to="/covidDetails" />;
  }

  return <Loader />;
};

export default Authorize;
