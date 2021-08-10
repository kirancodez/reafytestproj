import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    age: "",
    error: "",
    success: false 
  }); 

  const { name, email, password, phoneNumber, age, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password, phoneNumber, age })
      .then(data => {
        if (data.error || data.err) {
          setValues({ ...values, error: data.error || data.err, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            phoneNumber: "",
            age: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Phone</label>
              <input
                onChange={handleChange("phoneNumber")}
                maxlength="7"
                className="form-control"
                type="number"
                value={phoneNumber}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Age</label>
              <input
                onChange={handleChange("age")}
                className="form-control"
                type="number"
                value={age}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success mt-4 form-control btn-block">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  return (
    <Base title="Sign up page" description="Page for user to sign up!">
      <Toaster/>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
