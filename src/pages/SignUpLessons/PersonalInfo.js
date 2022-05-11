import React, { useState } from "react";
import { Link } from "react-router-dom";
import eye from "../../assets/images/eye.png";
import './LessonSignUp.css'

const PersonalInfo = () => {
  const defautFormData = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(defautFormData);
  console.log("formdat", formData);
  const [show, setShow] = useState(false);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const viewPassword = () => {
    setShow(!show);
  };

  const signUpHandler = () => {
    console.log("Clicked", formData);
    //   if (formData.userName === "" || formData.password === "") {
    //     setLoading(true);
    //     setFormData({ ...formData, userName: "", password: "" });
    //   } else {
    //     dispatch(AdminLoginAction(formData));
    //   }
  };

  return (
    <>
      <div className="signIn">
        <div className="container form_sign">
          <div className="signin_form">
            <h1>Create Account</h1>
            <input
              type="text"
              className="form-control signin_inp mt-3"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleFormData}
            />
            <input
              type="text"
              className="form-control signin_inp mt-3"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleFormData}
            />
            <div className="eyeHandler">
              <input
                type={show ? "text" : "password"}
                className="form-control signinput_inp mt-3"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleFormData}
              />
              <img src={eye} alt="eye" className="eye" onClick={viewPassword} />
            </div>
            <button
              type="submit"
              onClick={() => signUpHandler()}
              className="btn btn-primary signin_btn mt-4 mb-4"
            >
              SIGN UP
            </button>

            <div className="d-flex flex-row">
              <span className="hr_lines"></span>
              <span className="or_text">or</span>
              <span className="hr_lines"></span>
            </div>
            <div className="signIn_content">
              <p className="register_main_text">
                if you already have an account?
                <Link to="/signIn" className="register_text">
                  &nbsp;
                  <span className="register_text">Login Now</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
