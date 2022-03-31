import React from "react";
import NavBar from "./navBar";
import { Navigate, useParams } from "react-router-dom";
import Joi from "joi-browser";
import Form from "../common/form";
import { getUser, updateUserInfo } from "../services/userService";
import "./userDetails.css";
class UserDetails extends Form {
  state = {
    user: {},
    data: {
      name: "",
      gender: "",
      age: null,
    },
    errors: {},
    isSubmitted: false,
  };
  schema = {
    name: Joi.string().min(3).max(50).label("Name"),
    age: Joi.number().min(5).max(100).label("Age"),
    gender: Joi.string().label("Gender"),
  };
  handleSelect = (e) => {
    const data = { ...this.state.data };
    data["gender"] = e.target.value;
    this.setState({ data });
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  fetchUser = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { data } = await getUser(user.name);
    this.setState({ user: data });
    const formData = {
      name: this.state.user.name,
      age: this.state.user.age,
      gender: this.state.user.gender,
    };
    this.setState({ data: formData });
  };
  doSubmit = (e) => {
    updateUserInfo(this.state.user.email, this.state.data);
    const isSubmitted = true;
    this.setState({ isSubmitted });
  };
  componentDidMount = () => {
    this.fetchUser();
  };
  render() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      return <Navigate to={"/login"} />;
    }
    return (
      <>
        <NavBar />
        <div className="myCovidContainer">
          <div className="card">
            <ul className="list-group list-group-flush">
              <li style={{ alignSelf: "center" }} className="list-group-item">
                <img
                  style={{ borderRadius: "50%" }}
                  src={user.picture}
                  alt=""
                />
              </li>
              <li className="list-group-item">
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput(
                    "name",
                    "Name",
                    "name",
                    this.state.user.name
                  )}
                  {this.renderInput("age", "Age", "age", this.state.user.age)}
                  <label htmlFor="">Gender</label>
                  <select className="form-select" onChange={this.handleSelect}>
                    <option value="">Choose Gender</option>
                    <option
                      value="Male"
                      selected={this.state.user.gender === "Male"}
                    >
                      Male
                    </option>
                    <option
                      value="Female"
                      selected={this.state.user.gender === "Female"}
                    >
                      Female
                    </option>
                  </select>
                  <div className="btn-covid">{this.renderButton("Submit")}</div>
                </form>
              </li>
            </ul>
          </div>
        </div>
        {this.state.isSubmitted && <Navigate to="/profile" />}
      </>
    );
  }
}

export default UserDetails;
