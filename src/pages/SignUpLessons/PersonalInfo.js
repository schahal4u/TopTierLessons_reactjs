import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import eye from "../../assets/images/eye.png";
import eyeClose from "../../assets/images/eye-close.png";

import { LessonsRegisterAction } from "../../redux/actions/LessonsRegisterAction";
import "./LessonSignUp.css";
import { emptyUpdateProfileResponse } from "../../redux/actions/AdminProfileUpdateAction";
import { emptyProfileImageResponse } from "../../redux/actions/UploadPhoto";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lessonInfo } = useSelector((state) => state.lessonSignUp);
  const response = lessonInfo?.statusCode;
  console.log("response is", lessonInfo);

  const defautFormData = {
    name: "",
    email: "",
    password: "",
    userType: 2,
  };

  const [formData, setFormData] = useState(defautFormData);
  // console.log("formdata", formData);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const viewPassword = () => {
    setShow(!show);
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      formData.name === "" ||
      formData.password === "" ||
      formData.email === ""
    ) {
      setLoading(false);
      toast.warn("Please Fill All the fields");
    } else {
      setLoading(true);
      dispatch(LessonsRegisterAction(formData));
      dispatch(emptyUpdateProfileResponse());
    }
  };

  const responseHandler = () => {
    console.log("response====>", response);
    if (response == 200) {
      dispatch(emptyProfileImageResponse());
      setLoading(false);
      toast.success("Registered Successfully");
      navigate("/signupuploadphoto");
    }
    if (response == 422) {
      setLoading(false);
      toast.warn("Email is already Exists !");
    }
  };

  useEffect(() => {
    if (lessonInfo) {
      responseHandler();
    }
  }, [lessonInfo]);

  return (
    <>
      <div className="signIn">
        <div className="container form_sign">
          <form onSubmit={signUpHandler}>
            <div className="signin_form">
              <h1>Create Account</h1>
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control signin_inp mt-3"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormData}
                  required
                />
                <span class="asterisk">*</span>
              </div>
              <div className="col-md-12">
                <input
                  type="email"
                  className="form-control signin_inp mt-3"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormData}
                  required
                  pattern="^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$"
                />
                <span class="asterisk">*</span>
              </div>
              <div className="eyeHandler col-md-12">
                <input
                  type={show ? "text" : "password"}
                  className="form-control signinput_inp mt-3"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormData}
                  required
                />
                {show ? (
                  <img
                    src={eye}
                    alt="eye"
                    className="eye"
                    onClick={viewPassword}
                  />
                ) : (
                  <img
                    src={eyeClose}
                    alt="eye"
                    className="eye"
                    onClick={viewPassword}
                  />
                )}
                <span class="asterisk">*</span>
              </div>
              <button
                type="submit"
                className="btn btn-primary signUp_Btn mt-4 mb-4"
              >
                {loading && (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: "15px" }}
                  ></span>
                )}
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
          </form>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
