import React, { Component } from "react";
import Wobble from "react-reveal/Wobble";
import Spin from "react-reveal/Spin";
import { Link } from "react-router-dom";
import { FaVirus } from "react-icons/fa";
import { logout } from "../services/auth0Service";
import "./navBar.css";

class NavBar extends Component {
  state = {};
  logout = () => {
    logout();
  };
  render() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
      <nav className="navbar navbar-expand-lg navS">
        <div className="container-fluid">
          <div className="titleNav">
            <div style={{ display: "inherit" }}>
              <Wobble>
                <h1 style={{ color: "white" }}>Covid</h1>

                <Spin>
                  <Link to={"/dashboard"}>
                    <img
                      style={{ width: "30px" }}
                      src="/covidHome.png"
                      alt=""
                    />
                  </Link>
                </Spin>
                <h1 style={{ color: "white" }}>Tracker</h1>
              </Wobble>
            </div>
            {user && (
              <img
                style={{
                  width: "50px",
                  marginLeft: "40px",
                  borderRadius: "50%",
                }}
                src={user.picture}
                alt=""
              />
            )}
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FaVirus />
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav me-auto">
              {user && <div style={{ color: "white" }}>{user.name}</div>}
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/dashboard">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profile">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login" onClick={this.logout}>
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
