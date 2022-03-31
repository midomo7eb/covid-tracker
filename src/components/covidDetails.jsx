import React from "react";
import { Navigate } from "react-router-dom";
import Joi from "joi-browser";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { updateCovidInfo } from "../services/userService";
import NavBar from "./navBar";
import Form from "../common/form";
import "./covidDetails.css";

class CovidDetails extends Form {
  constructor(props) {
    super(props);

    try {
      const jwt = localStorage.getItem("auth_token");
      const user = jwtDecode(jwt);
      this.state = {
        user: user,
        loc: {
          lat: "",
          lng: "",
        },
        data: {
          temperature: "",
          symptoms: [],
        },
        errors: {},
        isSubmitted: false,
      };
    } catch (ex) {}
  }

  schema = {
    temperature: Joi.number()
      .integer()
      .required()
      .min(34)
      .max(40)
      .label("Temperature"),
    symptoms: Joi.array().items(Joi.string()).label("Symptoms"),
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  componentDidMount() {
    localStorage.setItem("user", JSON.stringify(this.state.user));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        const loc = { ...this.state.loc };
        loc["lat"] = lat;
        loc["lng"] = lng;
        toast("How are you feeling today?");

        this.setState({ loc });
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true }
    );
  }

  doSubmit = (e) => {
    const sympArray = this.getAllChecked();
    const data = { ...this.state.data };
    data["symptoms"] = sympArray;
    this.setState({ data });
    const allData = { ...this.state.loc, data };
    updateCovidInfo(this.state.user.name, allData);
    const isSubmitted = true;
    this.setState({ isSubmitted });
  };

  handleSelect = (e) => {
    const data = { ...this.state.data };
    data["gender"] = e.target.value;
    this.setState({ data });
  };
  getAllChecked = () => {
    let checkedArray = [];
    let inputElements = document.getElementsByClassName("form-check-input");
    for (var i = 0; inputElements[i]; ++i) {
      if (inputElements[i].checked) {
        checkedArray.push(inputElements[i].value);
      }
    }
    return checkedArray;
  };
  render() {
    if (!this.state.user) {
      return <Navigate to="/login" />;
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
                  src={this.state.user.picture}
                  alt=""
                />
              </li>
              <li className="list-group-item">
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput(
                    "temperature",
                    "Temperature",
                    "temperature"
                  )}
                  <label
                    style={{ paddingBottom: "10px", paddingTop: "5px" }}
                    htmlFor="Symptoms"
                  >
                    Symptoms
                  </label>

                  <li className="list-group-item">
                    <label className="form-check-label" htmlFor="cough">
                      Cough
                    </label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="Cough"
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" htmlFor="throat">
                      Sore Throat
                    </label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="Sore Throat"
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" htmlFor="tiredness">
                      Tiredness
                    </label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="Tiredness"
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" htmlFor="taste-smell">
                      Loss of taste or smell
                    </label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="Loss of taste or smell"
                      id="flexCheckDefault"
                    />
                  </li>

                  <div className="btn-covid">{this.renderButton("Submit")}</div>
                </form>
              </li>
            </ul>
          </div>
        </div>
        {this.state.isSubmitted && <Navigate to="/dashboard" />}
      </>
    );
  }
}

export default CovidDetails;
