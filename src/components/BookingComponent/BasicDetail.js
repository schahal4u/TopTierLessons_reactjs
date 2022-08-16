import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import arrow from "../../assets/images/down.png";
import "./Booking.css";

const BasicDetail = () => {
  const [validated, setValidated] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <div className="detail_form">
      <h2 className="detail_form_header">Basic Detail</h2>
      <div className="basic_detail_card_cont">
        <div className="basic_detail_card">
          <p>
            Date - <span> 24-6-2022</span>
          </p>
          <p>
            Time - <span> 10:00 am</span>
          </p>
        </div>
        <div className="basic_detail_card">
          <p className="book_more">Want to book multiple lessons</p>
        </div>
      </div>
      <Form noValidate validated={validated}>
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Select
            aria-label="How Long Lessons Do You Want?"
            className="form-control form-select booking_select_box mt-3"
            value="eeee"
            // onChange={(e) => handleFormData(e, i)}
            name="sportId"
            required
          >
            <option value="null">How Long Lessons Do You Want?</option>
            <option value="null">How Long Lessons Do You Want?</option>
          </Form.Select>
          <img className="set_arrowss" src={arrow} alt="arrow" />
          {/* <span class="required-asterisk">*</span> */}
          <Form.Control.Feedback type="invalid" style={{ marginLeft: "65px" }}>
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
            <option value="null">Add a Friend for $10 per Hour!</option>
            <option value="null">Add a Friend for $10 per Hour!</option>
          </Form.Select>
          <img className="set_arrowss" src={arrow} alt="arrow" />
          {/* <span class="required-asterisk">*</span> */}
          <Form.Control.Feedback type="invalid" style={{ marginLeft: "65px" }}>
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
            <option value="null">Where do you want your lessons?</option>
            <option value="null">Where do you want your lessons?</option>
          </Form.Select>
          <img className="set_arrowss" src={arrow} alt="arrow" />
          {/* <span class="required-asterisk">*</span> */}
          <Form.Control.Feedback type="invalid" style={{ marginLeft: "65px" }}>
            Please Select any Option
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="12"
          controlId="validationCustom01"
          style={{
            width: "100%",
            marginLeft: "25px",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Form.Check
            type="checkbox"
            id="checkbox"
            style={{ background: "background: #D4D4D4" }}
            checked={checked}
            onChange={(e) => setChecked(!checked)}
            name="checked"
            className="mt-1"
          />
          <p className="checkbox_text">
            <span className="inner_textt">Any Location in your mind?</span>
          </p>
        </Form.Group>
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Control
            type="text"
            className={checked ? "booking_inp mt-3" : "booking_input mt-3"}
            placeholder="Enter location"
            name="location"
            readOnly={!checked}
            // value={item.address}
            // onChange={(e) => handleFormData(e, i)}
          />
          {/* <span class="required-asterisk">*</span> */}
        </Form.Group>
      </Form>
    </div>
  );
};

export default BasicDetail;
