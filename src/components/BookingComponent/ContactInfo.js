import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import arrow from "../../assets/images/down.png";

const ContactInfo = ({ validated, handleFormData }) => {
  const defautFormData = {
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
