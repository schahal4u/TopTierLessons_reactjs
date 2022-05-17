import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import "./BasicDetail.css";

const BasicDetail = () => {
  const defautFormData = {
    name: "",
    email: "",
    address: "",
    role: "",
    bio: "",
  };
  const [formData, setFormData] = useState(defautFormData);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const profileHandler = (e) => {
    e.preventDefault();
    setValidated(true);
    console.log("form data", formData);
  };

  return (
    <>
      <div className="profile">
        <Form noValidate validated={validated} onSubmit={profileHandler}>
          <div className="profile_form">
            <Form.Group as={Col} md="10" controlId="validationCustom01">
              <Form.Control
                required
                type="text"
                className="form-control profile_inp "
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleFormData}
              />
              <Form.Control.Feedback className="error_text" type="invalid">
                Name is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" controlId="validationCustom02">
              <Form.Control
                required
                type="email"
                className="form-control profile_inp mt-4"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleFormData}
              />
              <Form.Control.Feedback type="invalid" className="error_text">
                Email is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" controlId="validationCustom03">
              <Form.Control
                required
                type="text"
                className="form-control profile_inp mt-4"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleFormData}
              />
              <Form.Control.Feedback type="invalid" className="error_text">
                Address is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" controlId="validationCustom04">
              <Form.Control
                required
                type="text"
                className="form-control profile_inp mt-4"
                placeholder="Role"
                name="role"
                value={formData.role}
                onChange={handleFormData}
              />
              <Form.Control.Feedback type="invalid" className="error_text">
                Role is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="10" controlId="validationCustom05">
              <Form.Control
                as="textarea"
                rows={3}
                required
                type="text"
                className="form-control profile_inp mt-4"
                placeholder="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleFormData}
              />
              <Form.Control.Feedback type="invalid" className="error_text">
                Bio is Required
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

export default BasicDetail;
