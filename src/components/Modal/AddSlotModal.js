import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Form, FormLabel, Row } from "react-bootstrap";

import arrow from "../../assets/images/down.png";
import { useSelector } from "react-redux";

const AddSlotModal = (props) => {
  let {
    onHide,
    formData,
    modalHeader,
    handleOnChange,
    submitHandler,
    checked,
    validation,
    handleOnChangecheckbox,
  } = props;

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter "
            className="text-white"
          >
            {modalHeader}
            {/* {getByIdBookingSlot?.statusCode === 200
              ? "Add Booking Slot"
              : "Update Booking Slot"} */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="booking_slot">
            <div className="row">
              <Form
                noValidate
                validated={validation}
                onSubmit={(e) => submitHandler(e, modalHeader)}
              >
                <Row>
                  <Col as={Col} md="6">
                    <Form.Group controlId="validationCustom01">
                      <FormLabel style={{ color: "white" }}>
                        Start Time
                      </FormLabel>
                      <Form.Control
                        name="fromTime"
                        style={{ color: "white" }}
                        type="time"
                        className="form-control booking_inp mt-3"
                        value={formData.fromTime}
                        onChange={handleOnChange}
                        required
                      />

                      <Form.Control.Feedback
                        type="invalid"
                        style={{ marginLeft: "65px" }}
                      >
                        Start time Required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="validationCustom02">
                      <FormLabel style={{ color: "white" }}>End Time</FormLabel>
                      <Form.Control
                        name="toTime"
                        style={{ color: "white" }}
                        type="time"
                        className="form-control booking_inp mt-3"
                        value={formData.toTime}
                        onChange={handleOnChange}
                        required
                      />

                      <Form.Control.Feedback
                        type="invalid"
                        style={{ marginLeft: "65px" }}
                      >
                        End time Required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="validationCustom03">
                  <Form.Select
                    name="ageGroup"
                    aria-label="Default select example"
                    className="form-control form-select booking_select_box mt-3 "
                    value={formData.ageGroup}
                    onChange={handleOnChange}
                    required
                  >
                    <option value="">Age Group</option>
                    <option value="1">Under Eleven</option>
                    <option value="2">Above Eleven</option>
                  </Form.Select>
                  <img className="set_arrowsss" src={arrow} alt="arrow" />

                  <Form.Control.Feedback
                    type="invalid"
                    style={{ marginLeft: "65px" }}
                  >
                    Please Select any Option
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  md="12"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className="booking_select_box mt-3 "
                  controlId="validationCustom02"
                >
                  <Form.Check
                    aria-label="option 0"
                    label="Mon"
                    type="checkbox"
                    id="checkbox"
                    name="Mon"
                    checked={checked.Mon}
                    onChange={(e) => handleOnChangecheckbox(e, !checked.Mon)}
                  />
                  <Form.Check
                    aria-label="option 1"
                    label="Tues"
                    type="checkbox"
                    id="checkbox"
                    name="Tues"
                    checked={checked.Tues}
                    onChange={(e) => handleOnChangecheckbox(e, !checked.Tues)}
                  />
                  <Form.Check
                    aria-label="option 2"
                    label="Wed"
                    type="checkbox"
                    id="checkbox"
                    name="Wed"
                    checked={checked.Wed}
                    onChange={(e) => handleOnChangecheckbox(e, !checked.Wed)}
                  />
                  <Form.Check
                    aria-label="option 3"
                    label="Thur"
                    type="checkbox"
                    id="checkbox"
                    name="Thur"
                    checked={checked.Thur}
                    onChange={(e) => handleOnChangecheckbox(e, !checked.Thur)}
                  />
                  <Form.Check
                    aria-label="option 4"
                    label="Fri"
                    type="checkbox"
                    id="checkbox"
                    name="Fri"
                    checked={checked.Fri}
                    onChange={(e) => handleOnChangecheckbox(e, !checked.Fri)}
                  />
                  <Form.Check
                    aria-label="option 5"
                    label="Sat"
                    type="checkbox"
                    id="checkbox"
                    name="Sat"
                    checked={checked.Sat}
                    onChange={(e) => handleOnChangecheckbox(e, !checked.Sat)}
                  />
                  <Form.Check
                    aria-label="option 6"
                    label="Sun"
                    type="checkbox"
                    id="checkbox"
                    name="Sun"
                    checked={checked.Sun}
                    onChange={(e) => handleOnChangecheckbox(e, !checked.Sun)}
                  />
                </Form.Group>

                <Row>
                  <Col as={Col} md="6">
                    <div className=" d-flex justify-content-center">
                      <Button
                        type="submit"
                        className="book_button"
                        // onClick={() => submitHandler()}
                      >
                        Submit
                      </Button>
                    </div>
                  </Col>
                  <Col as={Col} md="6">
                    <div className="d-flex justify-content-center">
                      <Button className="book_button" onClick={onHide}>
                        Cancel
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddSlotModal;
