import React from "react";
import "./register.css";
import Joi from "joi-browser";
import Form from "../common/form";
import { sendMailStart } from "../services/auth0Service";
import { toast } from "react-toastify";
import { register } from "../services/userService";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Wobble from "react-reveal/Wobble";
import Spin from "react-reveal/Spin";

class Register extends Form {
  state = {
    data: { name: "", email: "" },
    errors: {},
  };
  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
  };
  requestMailLink = async (email) => {
    if (email) {
      try {
        await sendMailStart({ email });
        toast.success(
          "Your registration link has been sent to : " +
            email +
            " successfully!"
        );
      } catch (err) {}
    }
  };
  doSubmit = async () => {
    const data = this.state.data;
    try {
      await register(data);
      this.requestMailLink(data.email);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  render() {
    return (
      <>
        <div className="welcomeCard">
          <div className="titleLogo">
            <div style={{ display: "inherit" }}>
              <Wobble>
                <h1 style={{ color: "white" }}>Covid</h1>

                <Spin forever="true">
                  <img style={{ width: "60px" }} src="/covidHome.png" alt="" />
                </Spin>
                <h1 style={{ color: "white" }}>Tracker</h1>
              </Wobble>
            </div>
          </div>
          <div className="account-testimonial">
            <h1 className="cardLogo text-white mb-4">
              Welcome to Covid{" "}
              <Spin>
                <img style={{ width: "60px" }} src="/covidHome.png" alt="" />
              </Spin>{" "}
              Tracker
            </h1>
            <p className="lead text-white">
              Track covid-19 patients in your country and the globe in minutes!
            </p>
            <div style={{ alignSelf: "flex-end" }}>
              <p className="text-white">
                Already a user?
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
        <Fade bottom big>
          <div className="inputCard">
            <div className="registerTitle">
              <h1>Register Now</h1>
            </div>
            <div className="registerForm">
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("name", "Name", "name")}
                {this.renderInput("email", "Email", "email")}
                {this.renderButton("Sign up")}
              </form>
            </div>
            <div className="bottomLogo">
              <div style={{ display: "inherit" }}>
                <Wobble>
                  <h1 style={{ color: "black" }}>Covid</h1>
                  <Spin forever="true">
                    <img
                      style={{ width: "60px" }}
                      src="/covidHome.png"
                      alt=""
                    />
                  </Spin>
                  <h1 style={{ color: "black" }}>Tracker</h1>
                </Wobble>
              </div>
            </div>
          </div>
        </Fade>
      </>
    );
  }
}

export default Register;
