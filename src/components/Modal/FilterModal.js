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
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { API_KEY } from "../../utils";
import moment from "moment";
const FilterModal = (props) => {
  let {
    headerText,

    validated,
    setModalShow,
    getAllSports,
    formData,

    handleFormData,
    submitHandler,
  } = props;

  //   const [place, setPlace] = useState("");
  //   console.log("setPlace", place);

  //   useEffect(() => {
  //     if (place) {
  //       geocodeByAddress(place?.label)
  //         .then((results) => getLatLng(results[0]))
  //         .then(
  //           ({ lat, lng }) =>
  //             setFormData({
  //               ...formData,
  //               address: place.label,
  //               latitude: lat,
  //               longitude: lng,
  //             })
  //           // console.log("Successfully got latitude and longitude", { lat, lng })
  //         );
  //     }
  //   }, [place]);
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="text-white">
          {headerText}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          //   validated={validated}
          onSubmit={(e) => submitHandler(e)}
        >
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Select
              aria-label="Default select example"
              className="form-control form-select select_boxx mt-3"
              value={formData.sportId}
              onChange={handleFormData}
              name="sportId"
              required
            >
              <option value="">Select Sport</option>
              {getAllSports?.data?.length > 0 &&
                getAllSports?.data.map((item, i) => {
                  return (
                    <option key={i} value={item.sportId}>
                      {item.sportName}
                    </option>
                  );
                })}
            </Form.Select>
            <img className="set_arrowss" src={arrow} alt="arrow" />
            {/* <span class="required-asterisk">*</span> */}
            <Form.Control.Feedback
              type="invalid"
              style={{ marginLeft: "65px" }}
            >
              Please Select any Option
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex flex-row-reverse d-flex justify-content-end ">
            <Button type="submit" className="ttlButton">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FilterModal;
