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
const AddChildModal = (props) => {
  let {
    headerText,
    onHide,
    validated,
    setModalShow,
    getAllSports,
    formData,
    setFormData,
    handleFormData,
    childSubmitHandler,
    editChildSubmitHandler,
  } = props;
  //   const api_key = process.env.REACT_APP_GOOGLE_KEY;

  //   console.log("api_key", api_key);
  //   const API_KEY = "AIzaSyDx_6SY-xRPDGlQoPt8PTRbCtTHKCbiCXQ";
  const [place, setPlace] = useState("");
  console.log("setPlace", place);

  useEffect(() => {
    if (place) {
      geocodeByAddress(place?.label)
        .then((results) => getLatLng(results[0]))
        .then(
          ({ lat, lng }) =>
            setFormData({
              ...formData,
              address: place.label,
              latitude: lat,
              longitude: lng,
            })
          // console.log("Successfully got latitude and longitude", { lat, lng })
        );
    }
  }, [place]);
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="text-white">
          {headerText} Children
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          onSubmit={
            headerText === "Edit"
              ? (e) => editChildSubmitHandler(e, formData.childId)
              : (e) => childSubmitHandler(e)
          }
        >
          <Form.Group as={Col} sm="12" controlId="validationCustom01">
            <Form.Control
              required
              type="text"
              className="input-control"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleFormData}
            />
            <span class="required">*</span>
            <Form.Control.Feedback type="invalid">
              Name is Required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            sm="12"
            className="google-analytics"
            controlId="validationCustom03"
          >
            <Form.Control
              required
              type="text"
              className="input-control"
              placeholder="Name"
              name="name"
              value={formData.address}
              onChange={handleFormData}
              hidden
            />
            <GooglePlacesAutocomplete
              apiKey={API_KEY}
              selectProps={{
                place,
                onChange: setPlace,
                placeholder: `${
                  formData.address ? formData.address : "Address"
                }`,
              }}
            />
            <span class="required">*</span>
            <Form.Control.Feedback type="invalid">
              Address is Required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} sm="12" controlId="validationCustom01">
            <Form.Control
              type="date"
              className="input-control mt-3"
              placeholder="dateOfBirth"
              name="dateOfBirth"
              value={moment(formData.dateOfBirth).format("YYYY-MM-DD")}
              onChange={(e) => handleFormData(e)}
              required
              // pattern="^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$"
            />
            <span class="required">*</span>
            <Form.Control.Feedback type="invalid">
              Dob is Required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} sm="12" controlId="validationCustom01">
            <Form.Select
              aria-label="Default select example"
              className="form-control form-select input-control mt-3"
              value={formData.skillLevel}
              onChange={(e) => handleFormData(e)}
              name="skillLevel"
              required
            >
              <option value="">Skill Level</option>
              <option value="1">Begginer</option>
              <option value="2">Intermidate</option>
              <option value="3">Expert</option>
            </Form.Select>
            <img className="select-caret" src={arrow} alt="arrow" />
            <span class="required">*</span>

            <Form.Control.Feedback type="invalid">
              Please Select any Option
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex flex-row-reverse d-flex justify-content-end ">
            <Button type="submit" className="ttlButton">
              Submit
            </Button>
            <Button className="ttlButton" onClick={onHide}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChildModal;
