import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import NavBar from "./navBar";
import { getUser } from "../services/userService";
import "./profile.css";
import {
  MdAlternateEmail,
  MdOutlineCoronavirus,
  MdOutlineDriveFileRenameOutline,
} from "react-icons/md";
import { FaThermometerThreeQuarters, FaVirus } from "react-icons/fa";
import Bounce from "react-reveal/Bounce";
import { Link } from "react-router-dom";
class Profile extends Component {
  state = {
    user: {},
  };
  fetchUser = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { data } = await getUser(user.name);
    this.setState({ user: data });
    const symptoms = this.state.user.symptoms.map((symp) => {
      return (
        <ul key={symp + "symp"} className="symps">
          <MdOutlineCoronavirus />
          {symp}
        </ul>
      );
    });
    const userData = this.state.user;
    userData["symptoms"] = symptoms;
    this.setState({ user: userData });
  };

  componentDidMount = () => {
    this.fetchUser();
  };
  titleCase(str) {
    str = str.substring(1, str.length - 1);
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }
  render() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      return <Navigate to={"/login"} />;
    }
    const userData = this.state.user;
    return (
      <>
        <NavBar />
        <div className="myContainer">
          <Bounce left>
            <div className="myCard">
              <div className="card">
                <ul className="list-group list-group-flush">
                  <li
                    style={{ alignSelf: "center" }}
                    className="list-group-item"
                  >
                    <img
                      style={{ borderRadius: "50%" }}
                      src={user.picture}
                      alt=""
                    />
                  </li>

                  <li className="list-group-item">
                    <h4>
                      Name <MdOutlineDriveFileRenameOutline />
                    </h4>

                    <i className="fa-solid fa-user"></i>
                    <span>
                      {userData.name &&
                        this.titleCase(JSON.stringify(userData.name))}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <h4>
                      Email <MdAlternateEmail />
                    </h4>
                    <span>{userData.email}</span>
                  </li>
                  <li className="list-group-item">
                    <h4>Age</h4>
                    <span>{userData.age}</span>
                  </li>
                  <li className="list-group-item">
                    <h4>Gender</h4>
                    <span>{userData.gender}</span>
                  </li>
                  <li className="list-group-item">
                    <h4>
                      Temperature
                      <FaThermometerThreeQuarters />
                    </h4>
                    <span>{userData.temperature}</span>
                  </li>
                  <li className="list-group-item">
                    <h4>
                      Symptoms <FaVirus />
                    </h4>
                    {userData.symptoms}
                    <Link className="btn btn-primary" to={"/covidDetails"}>
                      Edit covid details
                    </Link>
                  </li>
                </ul>
                <Link
                  className="btn btn-primary"
                  to={"/profile/" + this.state.user.email}
                >
                  Edit personal details
                </Link>
              </div>
            </div>
          </Bounce>
        </div>
      </>
    );
  }
}

export default Profile;
