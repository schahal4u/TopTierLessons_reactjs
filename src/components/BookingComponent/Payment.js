import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
let prevTxt = "";

const Payment = ({ validated, handleFormData }) => {
  const { createBooking } = useSelector((state) => state.createBookingResponse);
  const [expireMonth, setExpireMonth] = useState("");
  const paymentData = {
    bookingId: createBooking?.data.bookingId,
    cardNumber: "",
    expireMonth: parseInt(expireMonth.split("/")[0]),
    expireYear: parseInt(expireMonth.split("/")[1]),
    cvc: "",
    amount: createBooking?.data.totalPrice,
    description: "",
  };
  const [formData, setFormData] = useState(paymentData);

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    handleFormData(e);
  };
  const monthHandle = (e) => {
    if (prevTxt.length > e.target.value.length) {
      setExpireMonth(e.target.value);
    } else {
      if (expireMonth.length === 2) {
        const lastTxt = e.target.value.charAt(e.target.value.length - 1);
        setExpireMonth(`${expireMonth}/${lastTxt}`);
      } else setExpireMonth(e.target.value);
    }
    prevTxt = e.target.value;
    handleOnChange(e);
  };

  return (
    <div className="detail_form">
      <h2 className="detail_form_header">Payment Information</h2>
      <div className="d-flex justify-content-between">
        <h4 className="total_header">Total(After Discount)</h4>
        <h2 className="total_amt">{`$${createBooking?.data.totalPrice}`}</h2>
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
                value={formData.cardNumber}
                onChange={handleOnChange}
                required
              />
              {/* <span class="required-asterisk">*</span> */}
              <Form.Control.Feedback
                type="invalid"
                style={{ marginLeft: "65px" }}
              >
                Card Number is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Control
                type="text"
                className="form-control booking_inp mt-3"
                placeholder="CVV"
                name="cvc"
                value={formData.cvc}
                onChange={handleOnChange}
                maxLength={3}
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
                placeholder="MM/YY"
                name="expireMonth"
                value={expireMonth}
                onChange={monthHandle}
                maxLength={5}
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
