import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import arrow from "../../assets/images/down.png";
import "./Booking.css";
const BasicDetail = ({ slotsBook, handleFormData }) => {
  const [validated, setValidated] = useState(false);
  const [checked, setChecked] = useState(false);
  const defautFormData = {
    lessonsDuration: 0,
    addFriend: 0,
    locationType: 0,
    location: "",
  };
  const [formData, setFormData] = useState(defautFormData);
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    handleFormData(e);
  };
  return (
    <div className="detail_form">
      <h2 className="detail_form_header">Basic Detail</h2>
      <div className="basic_detail_card_cont">
        {slotsBook?.map((_val) => {
          return (
            <div className="basic_detail_card">
              <p>
                Date - <span> {_val.date.toLocaleDateString()}</span>
              </p>
              <p>
                Time - <span>{_val.entry}</span>
              </p>
            </div>
          );
        })}
      </div>
      <Form noValidate validated={validated}>
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Select
            aria-label="Default select example"
            className="form-control form-select booking_select_box mt-3"
            value={formData.lessonsDuration}
            onChange={handleOnChange}
            name="lessonsDuration"
            required
          >
            <option value="0">How Long Lessons Do You Want?</option>
            <option value="1">30 minutes</option>
            <option value="2">60 minutes</option>
          </Form.Select>
          <img className="set_arrowss" src={arrow} alt="arrow" />
          {/* <span class="required-asterisk">*</span> */}
          <Form.Control.Feedback type="invalid" style={{ marginLeft: "65px" }}>
            Please Select any Option
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Select
            aria-label="Default select example"
            className="form-control form-select booking_select_box mt-4"
            value={formData.addFriend}
            onChange={handleOnChange}
            name="addFriend"
            required
          >
            <option value="0">Add a Friend for $10 per Hour!</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Select>
          <img className="set_arrowss" src={arrow} alt="arrow" />
          <Form.Control.Feedback type="invalid" style={{ marginLeft: "65px" }}>
            Please Select any Option
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Select
            aria-label="Default select example"
            className="form-control form-select booking_select_box mt-4"
            value={formData.locationType}
            onChange={handleOnChange}
            name="locationType"
            required
          >
            <option value="0">Where do you want your lessons?</option>
            <option value="1">Coach Location</option>
            <option value="2">Your Location</option>
          </Form.Select>
          <img className="set_arrowss" src={arrow} alt="arrow" />
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
            value={formData.location}
            onChange={handleOnChange}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default BasicDetail;
