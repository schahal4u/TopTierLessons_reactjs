import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import arrow from "../../assets/images/down.png";

const ContactInfo = ({ handleFormData }) => {
  const [validated, setValidated] = useState(false);

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
                // value={item.address}
                onChange={handleFormData}
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
                // value={item.address}
                // onChange={(e) => handleFormData(e, i)}
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
                type="text"
                className="form-control booking_inp mt-3"
                placeholder="Phone Number"
                name="mobile"
                // value={item.address}
                // onChange={(e) => handleFormData(e, i)}
                required
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
                // value={item.address}
                // onChange={(e) => handleFormData(e, i)}
                required
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
                aria-label="Do you plan on taking more lessons if these go well?"
                className="form-control form-select booking_select_box mt-3"
                value="eeee"
                // onChange={(e) => handleFormData(e, i)}
                name="sportId"
                required
              >
                <option value="null">
                  Do you plan on taking more lessons if these go well?
                </option>
                <option value="null">
                  Do you plan on taking more lessons if these go well?
                </option>
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
                aria-label="How Long Lessons Do You Want?"
                className="form-control form-select booking_select_box mt-4"
                value="eeee"
                // onChange={(e) => handleFormData(e, i)}
                name="sportId"
                required
              >
                <option value="null">How did you hear about us?</option>
                <option value="null">How did you hear about us?</option>
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
