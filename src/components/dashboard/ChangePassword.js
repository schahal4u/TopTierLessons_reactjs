import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";
const ChangePassword = () => {
  const defautFormData = {
    password: "",
    newpassword: "",
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
    if (formData.newpassword !== formData.confirmpassword) {
      toast.warn("New Password and Confirm Password are not Matched!");
      return;
    }

    console.log("form data", formData);
  };
  return (
    <>
      <div className="profile">
        <Form noValidate validated={validated} onSubmit={passwordhandler}>
          <div className="profile_form">
            <Form.Group as={Col} md="10" controlId="validationCustom01">
              <Form.Control
                required
                type="text"
                className="form-control profile_inp "
                placeholder="Current Password"
                name="password"
                value={formData.password}
                onChange={handleFormData}
              />
              <Form.Control.Feedback className="error_text" type="invalid">
                Password is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" controlId="validationCustom02">
              <Form.Control
                required
                type="text"
                className="form-control profile_inp mt-4"
                placeholder="Create New Password"
                name="newpassword"
                value={formData.newpassword}
                onChange={handleFormData}
              />
              <Form.Control.Feedback type="invalid" className="error_text">
                New Password is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" controlId="validationCustom03">
              <Form.Control
                required
                type="text"
                className="form-control profile_inp mt-4"
                placeholder="Confirm New Password"
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleFormData}
              />
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
