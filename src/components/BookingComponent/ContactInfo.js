import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import arrow from "../../assets/images/down.png";

const ContactInfo = ({ validated, handleFormData }) => {
  const defautFormData = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    continueLessons: null,
    sourceType: 0,
  };
  const [formData, setFormData] = useState(defautFormData);
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    handleFormData(e);
  };
  return (
    <div className="detail_form">
      <h2 className="detail_form_header">Contact Information</h2>
      <Form noValidate validated={validated}>
        <div className="detail_form_container">
          <div className="row">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Control
                type="text"
                className="form-control booking_inp mt-3"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleOnChange}
                required
              />
              {/* <span class="required-asterisk">*</span> */}
              <Form.Control.Feedback
                type="invalid"
                style={{ marginLeft: "65px" }}
              >
                First Name is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Control
                type="text"
                className="form-control booking_inp mt-3"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleOnChange}
                required
              />
              {/* <span class="required-asterisk">*</span> */}
              <Form.Control.Feedback
                type="invalid"
                style={{ marginLeft: "65px" }}
              >
                Last Name is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Control
                type="number"
                className="form-control booking_inp mt-3"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleOnChange}
                required
                maxLength={10}
                pattern="^([0|\+[0-9]{1,5})?([0-9][0-9]{9})$"
              />
              {/* <span class="required-asterisk">*</span> */}
              <Form.Control.Feedback
                type="invalid"
                style={{ marginLeft: "65px" }}
              >
                Phone Number is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Control
                type="text"
                className="form-control booking_inp mt-3"
                placeholder="Email ID"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                required
                pattern="^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$"
              />
              {/* <span class="required-asterisk">*</span> */}
              <Form.Control.Feedback
                type="invalid"
                style={{ marginLeft: "65px" }}
              >
                Email is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Select
                aria-label="Default select example"
                className="form-control form-select booking_select_box mt-3"
                value={formData.continueLessons}
                onChange={handleOnChange}
                name="continueLessons"
                required
              >
                <option value="null">
                  Do you plan on taking more lessons if these go well?
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Select>
              <img className="set_arrowsss" src={arrow} alt="arrow" />
              {/* <span class="required-asterisk">*</span> */}
              <Form.Control.Feedback
                type="invalid"
                style={{ marginLeft: "65px" }}
              >
                Please Select any Option
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Select
                aria-label="Default select example"
                className="form-control form-select booking_select_box mt-4"
                value={formData.sourceType}
                onChange={handleOnChange}
                name="sourceType"
                required
              >
                <option value="0">How did you hear about us?</option>
                <option value="1">Family</option>
                <option value="2">Friend</option>
              </Form.Select>
              <img className="set_arrowsss" src={arrow} alt="arrow" />
              {/* <span class="required-asterisk">*</span> */}
              <Form.Control.Feedback
                type="invalid"
                style={{ marginLeft: "65px" }}
              >
                Please Select any Option
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ContactInfo;
