import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Wobble from "react-reveal/Wobble";
import Spin from "react-reveal/Spin";
import { Navigate } from "react-router-dom";
import Form from "../common/form";
import { sendMailStart } from "../services/auth0Service";
import { checkIfNotRegistered } from "../services/userService";
import "./login.css";

class Login extends Form {
  state = {
    data: { email: "" },
    errors: {},
    isButtonDisabled: false,
  };
  schema = {
    email: Joi.string().email().required().label("Email"),
  };

  requestMailLink = async (email) => {
    if (email) {
      try {
        await sendMailStart({ email });
        toast(
          "Your sign in link has been sent to : " + email + " successfully!"
        );
      } catch (err) {
        toast.error("An unexpected error occured!");
      }
    }
  };
  doSubmit = async () => {
    const user = this.state.data;
    const { data } = await checkIfNotRegistered(user.email);
    if (data) {
      this.setState({
        isButtonDisabled: true,
      });
      this.requestMailLink(user.email);
      setTimeout(() => this.setState({ isButtonDisabled: false }), 15000);
    } else {
      toast.error("This email is not registered , please register first!");
    }
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  render() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        return <Navigate to="/covidDetails" />;
      }
    } catch (error) {
      localStorage.clear("user");
    }

    return (
      <div className="myRow">
        <div className="col-md-6">
          <div className="leftBox">
            <div className="title">
              <div style={{ display: "inherit" }}>
                <Wobble>
                  <h1 style={{ color: "white" }}>Covid</h1>

                  <Spin forever="true">
                    <img
                      style={{ width: "60px" }}
                      src="/covidHome.png"
                      alt=""
                    />
                  </Spin>
                  <h1 style={{ color: "white" }}>Tracker</h1>
                </Wobble>
              </div>
            </div>
            <div className="account-testimonial">
              <h3 className="text-white mb-6">New here ?!</h3>
              <p className="lead text-white">
                Register now and track other COVID-19 patients around you!
              </p>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="rightBox">
            <div className="myForm">
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("email", "Email", "email")}
                {!this.state.isButtonDisabled && (
                  <div className="btn-login">{this.renderButton("Login")}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
