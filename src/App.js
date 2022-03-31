import "./App.css";
import React, { Component } from "react";
import Login from "./components/login";
import Register from "./components/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/notFound";
import Dashboard from "./components/dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import Authorize from "./components/authorize";
import CovidDetails from "./components/covidDetails";
import Profile from "./components/profile";
import UserDetails from "./components/userDetails";
class App extends Component {
  state = {};

  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/authorize" element={<Authorize />} />
          <Route
            path="/covidDetails"
            element={<CovidDetails user={this.state.user} />}
          />
          <Route path="/profile/:email" element={<UserDetails />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </React.Fragment>
    );
  }
}

export default App;
