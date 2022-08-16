import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import arrow from "../../assets/images/down.png";
import success from "../../assets/images/success.png";

const Payment = () => {
  const [validated, setValidated] = useState(false);

  return (
    <div className="detail_form">
      <h2 className="detail_form_header">Payment Information</h2>
      <div className="d-flex justify-content-between">
        <h4 className="total_header">Total(After Discount)</h4>
        <h2 className="total_amt">$849</h2>
      </div>
      <Form noValidate validated={validated}>
        <div className="detail_form_container">
          <div className="row">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Control
                type="text"
                className="form-control booking_inp mt-3"
                placeholder="Card Number"
                name="cardNumber"
                // value={item.address}
                // onChange={(e) => handleFormData(e, i)}
                required
              />
              {/* <span class="required-asterisk">*</span> */}
              <Form.Control.Feedback
                type="invalid"
                style={{ marginLeft: "65px" }}
              >
                Card Number
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Control
                type="text"
                className="form-control booking_inp mt-3"
                placeholder="CVV"
                name="cvv"
                // value={item.address}
                // onChange={(e) => handleFormData(e, i)}
                required
              />
              {/* <span class="required-asterisk">*</span> */}
              <Form.Control.Feedback
                type="invalid"
                style={{ marginLeft: "65px" }}
              >
                CVV is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Control
                type="text"
                className="form-control booking_inp mt-3"
                placeholder="MM/YYYY"
                name="date"
                // value={item.address}
                // onChange={(e) => handleFormData(e, i)}
                required
              />
              {/* <span class="required-asterisk">*</span> */}
              <Form.Control.Feedback
                type="invalid"
                style={{ marginLeft: "65px" }}
              >
                MM/YYYY is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Control
                type="text"
                className="form-control booking_inp mt-3"
                placeholder="Promocode(Optional)"
                name="promocode"
                // value={item.address}
                // onChange={(e) => handleFormData(e, i)}
                required
              />
              {/* <span class="required-asterisk">*</span> */}
              {/* <Form.Control.Feedback
                type="invalid"
                style={{ marginLeft: "65px" }}
              >
                Address is Required
              </Form.Control.Feedback> */}
            </Form.Group>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Payment;
