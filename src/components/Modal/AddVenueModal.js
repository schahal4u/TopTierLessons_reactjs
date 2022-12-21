import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Form, FormLabel, Row } from "react-bootstrap";

import arrow from "../../assets/images/down.png";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Slider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllSportsAction } from "../../redux/actions/GetAllSports";
import { MultiSelect } from "react-multi-select-component";
import { GetNearbyVenueAction } from "../../redux/actions/coach";
import { AdminProfileUpdateAction } from "../../redux/actions/AdminProfileUpdateAction";

const AddVenueModal = (props) => {
  let { onHide, validation, setModalShow } = props;

  const { getNearbyVenue } = useSelector((state) => state.getAllCoachResponse);
  const { profileDetail } = useSelector((state) => state.getProfileDetail);
  //   console.log("profileDetail", profileDetail?.statusCode);
  const def = {
    users: [
      {
        name: null,
        email: null,
      },
    ],
    venueList: [
      {
        venueId: 5,
      },
    ],
  };

  const [finalList, setFinalList] = useState(def);

  const [validated, setValidated] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (getNearbyVenue?.data?.length >= 0) {
      let options = getNearbyVenue?.data.map((item, i) => ({
        label: item.name,
        value: item.venueId,
      }));
      setOptions(options);
    }
  }, [getNearbyVenue]);

  useEffect(() => {
    if (selected) {
      let data = selected.map((item, i) => ({
        venueId: item.value,
      }));
      setFinalList({ ...finalList, venueList: data });
    }
  }, [selected]);

  //  submitHandler for add venue

  const venueSubmitHandler = (e) => {
    e.preventDefault();

    if (finalList.venueList.length > 0) {
      dispatch(AdminProfileUpdateAction(finalList));
    }
    setModalShow(false);
    // const form = e.currentTarget;
    // if (form.checkValidity() === false) {
    //
    //   if (finalList.venueList.length > 0)
    // dispatch(AdminProfileUpdateAction(finalList));

    //   e.stopPropagation();
    // }

    // setValidated(true);
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter " className="text-white">
          Add Venue
          {/* {getByIdBookingSlot?.statusCode === 200
          ? "Add Booking Slot"
          : "Update Booking Slot"} */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="booking_slot">
          <div className="row">
            <Form noValidate validated={validation}>
              <Row>
                <Col as={Col} md="12">
                  <Form.Group>
                    <FormLabel style={{ color: "white" }}>Venue</FormLabel>
                    <MultiSelect
                      options={options}
                      value={selected}
                      onChange={setSelected}
                      labelledBy="Select"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ marginLeft: "65px" }}
                    >
                      Please Select any Option
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col as={Col} md="6">
                  <div className=" d-flex justify-content-center">
                    <Button
                      type="submit"
                      className="book_button"
                      onClick={(e) => venueSubmitHandler(e)}
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
  );
};

export default AddVenueModal;
