import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ChangePasswordAction } from "../../redux/actions/ChangePassword";
const ChangePassword = () => {
  const { passwordResponse } = useSelector(
    (state) => state.changePassResponse
  );
  const response = passwordResponse?.statusCode;

  console.log("password response", passwordResponse);

  const dispatch = useDispatch();
  const defautFormData = {
    oldPassword: "",
    newPassword: "",
    confirmpassword: "",
  };
  const [formData, setFormData] = useState(defautFormData);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const passwordhandler = (e) => {
    e.preventDefault();
    setValidated(true);
    if (formData.newPassword !== formData.confirmpassword) {
      toast.warn("New Password and Confirm Password are not Matched!");
      return;
    }
    const dispatchFormData = { ...formData };
    delete dispatchFormData.confirmpassword;
    dispatch(ChangePasswordAction(dispatchFormData));

    // console.log("form data", formData);
  };

  const responseHandler = () => {
    if (response == 200) {
      toast.success("Password Changed Successfully");
    }
    if (response == 400) {
      toast.warn("Old Password is Not Correct !");
    }
  };

  useEffect(() => {
    if (passwordResponse) {
      responseHandler();
    }
  }, [passwordResponse]);

  return (
    <>
      <div className="profile">
        <Form noValidate validated={validated} onSubmit={passwordhandler}>
          <div className="profile_form">
            <Form.Group as={Col} md="10" controlId="validationCustom01">
              <Form.Control
                required
                type="password"
                className="form-control profile_inp "
                placeholder="Current Password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleFormData}
              />
              <span class="required-asterisk">*</span>
              <Form.Control.Feedback className="error_text" type="invalid">
                Password is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" controlId="validationCustom02">
              <Form.Control
                required
                type="password"
                className="form-control profile_inp mt-4"
                placeholder="Create New Password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleFormData}
              />
              <span class="required-asterisk">*</span>
              <Form.Control.Feedback type="invalid" className="error_text">
                New Password is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" controlId="validationCustom03">
              <Form.Control
                required
                type="password"
                className="form-control profile_inp mt-4"
                placeholder="Confirm New Password"
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleFormData}
              />
              <span class="required-asterisk">*</span>
              <Form.Control.Feedback type="invalid" className="error_text">
                Confirm Password is Required
              </Form.Control.Feedback>
            </Form.Group>

            <button
              type="submit"
              className="btn btn-primary profile_btn mt-4 mb-4"
            >
              {loading && (
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginRight: "15px" }}
                ></span>
              )}
              Update
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ChangePassword;
