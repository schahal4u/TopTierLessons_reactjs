import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import eye from "../../assets/images/eye.png";
import eyeClose from "../../assets/images/eye-close.png";
import "./AthleteSignUp.css";
import arrow from "../../assets/images/down.png";
import { LessonsRegisterAction } from "../../redux/actions/LessonsRegisterAction";
import { emptyUpdateProfileResponse } from "../../redux/actions/AdminProfileUpdateAction";
import { emptyProfileImageResponse } from "../../redux/actions/UploadPhoto";

const PersonalDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lessonInfo } = useSelector((state) => state.lessonSignUp);
  const response = lessonInfo?.statusCode;
  // console.log("response is", lessonInfo);

  const defautFormData = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    userType: "",
  };

  const [formData, setFormData] = useState(defautFormData);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const viewPassword = () => {
    setShow(!show);
  };

  const signUpHandler = (e) => {
    console.log("form data", formData);
    e.preventDefault();
    setValidated(true);
    if (
      formData.name === "" ||
      formData.password === "" ||
      formData.email === "" ||
      formData.phoneNumber === "" ||
      formData.userType === "" ||
      checked === false
    ) {
      toast.warn("Please Fill All the fields");
    } else {
      setLoading(true);
      dispatch(LessonsRegisterAction(formData));
      dispatch(emptyUpdateProfileResponse());
    }
  };

  const responseHandler = () => {
    if (response == 200 && formData.userType == "3") {
      dispatch(emptyProfileImageResponse());
      setLoading(false);
      toast.success("Registered Successfully");
      navigate("/basicinfo");
    }
    if (response == 200 && formData.userType == "4") {
      dispatch(emptyProfileImageResponse());
      setLoading(false);
      toast.success("Registered Successfully");
      navigate("/basicinfokids");
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
          <Form noValidate validated={validated} onSubmit={signUpHandler}>
            {/* <form onSubmit={signUpHandler}> */}
            <div className="personal_form">
              <h1>Basic Info</h1>
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Control
                  type="text"
                  className="form-control signin_inp mt-3"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormData}
                  required
                />
                <span class="required-asterisk">*</span>
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginLeft: "65px" }}
                >
                  Name is Required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Control
                  type="email"
                  className="form-control signin_inp mt-3"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormData}
                  required
                  pattern="^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$"
                />
                <span class="required-asterisk">*</span>
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginLeft: "65px" }}
                >
                  Email is Required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Control
                  type="text"
                  className="form-control signin_inp mt-3"
                  placeholder="Mobile Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleFormData}
                  required
                  maxLength={10}
                  pattern="^([0|\+[0-9]{1,5})?([0-9][0-9]{9})$"
                  inputMode="numeric"
                />
                <span class="required-asterisk">*</span>
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginLeft: "65px" }}
                >
                  Mobile Number is Required & of Min 10 Character
                </Form.Control.Feedback>
              </Form.Group>
              <div className="eyeHandler">
                <Form.Group as={Col} md="12" controlId="validationCustom02">
                  <Form.Control
                    type={show ? "text" : "password"}
                    className="form-control signinput_inp mt-3"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormData}
                    required
                  />
                  <span class="required-asterisk">*</span>
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ marginLeft: "65px" }}
                  >
                    Password is Required
                  </Form.Control.Feedback>
                </Form.Group>
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
              </div>
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Select
                  aria-label="Default select example"
                  placeholder="Password"
                  className="form-control form-select select_box mt-3"
                  value={formData.userType}
                  onChange={handleFormData}
                  name="userType"
                  required
                >
                  <option>I am creating account for</option>
                  <option value="3">Myself</option>
                  <option value="4">My Child</option>
                </Form.Select>
                <img className="set_arrows" src={arrow} alt="arrow" />
                <span class="required-asterisk">*</span>
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginLeft: "65px" }}
                >
                  Please Select any Option
                </Form.Control.Feedback>
              </Form.Group>
              <button
                type="submit"
                className="btn btn-primary signin_btn mt-4 mb-4"
              >
                {loading && (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: "15px" }}
                  ></span>
                )}
                Proceed
              </button>
              <Form.Group
                as={Col}
                md="12"
                controlId="validationCustom01"
                style={{
                  width: "75%",
                  marginLeft: "25px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Form.Check
                  type="checkbox"
                  id="checkbox"
                  style={{ background: "background: #D4D4D4" }}
                  checked={checked}
                  onChange={(e) => setChecked(!checked)}
                  name="checked"
                />
                <p className="checkbox_text">
                  I agree with
                  <span className="inner_textt">Terms of Service</span> and
                  <span className="inner_textt">Privacy Policy</span>
                </p>
              </Form.Group>
              <div className="d-flex flex-row">
                <span className="hr_lines"></span>
                <span className="or_text">Or</span>
                <span className="hr_lines"></span>
              </div>
              <div className="signup_content">
                <p className="register_main_text">
                  if you already have an account?
                  <Link to="/signIn" className="register_text">
                    &nbsp;
                    <span className="register_text">Login Now</span>
                  </Link>
                </p>
              </div>
            </div>
            {/* </form> */}
          </Form>
        </div>
      </div>
    </>
  );
};

export default PersonalDetail;
