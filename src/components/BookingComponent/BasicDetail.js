import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import arrow from "../../assets/images/down.png";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCoachByIdAction,
  GetCoachProfileAction,
} from "../../redux/actions/coach";
import "./Booking.css";
import { GetVenueByIdAction } from "../../redux/actions/GetAllCoachVenueAction";
const BasicDetail = ({ slotsBook, handleFormData }) => {
  const [validated, setValidated] = useState(false);
  const [checked, setChecked] = useState(false);
  const defautFormData = {
    lessonsDuration: 0,
    addFriend: 0,

    // coachId: 0,
    venueId: 0,
  };
  const dispatch = useDispatch();
  const [list, setList] = useState();
  const { getCoachProfile } = useSelector((state) => state.getAllCoachResponse);
  const { getVenueById } = useSelector((state) => state.venueById);
  const data = getCoachProfile?.data;
  const response = getCoachProfile?.statusCode;
  const coachID = localStorage.coachId;
  const [formData, setFormData] = useState(defautFormData);

  useEffect(() => {
    if (response == 200) {
      setList(data);
    }
  }, [getVenueById]);

  // // const coachId = localStorage.coachId;

  useEffect(() => {
    let obj = {
      coachId: coachID,
    };
    dispatch(GetCoachProfileAction(obj));
  }, []);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    handleFormData(e);
  };

  useEffect(() => {
    if (formData?.venueId) {
      let obj = {
        venueId: venueID,
      };
      dispatch(GetVenueByIdAction(obj));
    }
  }, [formData]);

  const venueID = formData?.venueId;
  console.log("venue id inside ", formData);

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
            className="form-control form-select booking_select_box mt-4"
            value={formData?.data?.venueList?.venueId}
            onChange={handleOnChange}
            name="venueId"
            required
          >
            <option value="0">Select venue</option>
            {getCoachProfile?.data?.venueList?.map((venue) => {
              return <option value={venue.venueId}>{venue.name}</option>;
            })}
          </Form.Select>
          <img className="set_arrowss" src={arrow} alt="arrow" />
          <Form.Control.Feedback type="invalid" style={{ marginLeft: "65px" }}>
            Please Select any Option
          </Form.Control.Feedback>
        </Form.Group>

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

        {getVenueById?.data?.alowGeust == true ? (
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Select
              //  {disabled={
              //   formData.alowGeust !== null
              //      ? ""
              //     : "true"
              // }}
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
          </Form.Group>
        ) : (
          "null"
        )}
      </Form>
    </div>
  );
};

export default BasicDetail;
