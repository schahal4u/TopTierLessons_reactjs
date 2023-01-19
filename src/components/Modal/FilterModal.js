import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Form, FormLabel, Row } from "react-bootstrap";

import arrow from "../../assets/images/down.png";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Slider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { GetAllSportsAction } from "../../redux/actions/GetAllSports";
import { MultiSelect } from "react-multi-select-component";
import {
  getCoachByVenueIdAction,
  getCoachByVenueIdResponse,
  getCoachesByUserRadiusAction,
  getCoachesByUserRadiusResponse,
  GetNearbyVenueAction,
} from "../../redux/actions/coach";
import { AdminProfileUpdateAction } from "../../redux/actions/AdminProfileUpdateAction";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { API_KEY } from "../../utils";
import moment from "moment";
import { GetAllVenueAction } from "../../redux/actions/GetAllCoachVenueAction";
import { toast } from "react-toastify";
const FilterModal = (props) => {
  let { getAllSports } = props;

  let defaultForm = {
    venueId: "",
    sportId: "",
    radius: "",
  };

  const { getVenues } = useSelector((state) => state.coachVenue);

  const [formData, setFormData] = useState(defaultForm);
  const [radio, setRadio] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    let obj = {
      page: 1,
      pageSize: 10,
    };

    dispatch(GetAllVenueAction(obj));
  }, []);

  const submitHandler = (e, type) => {
    e.preventDefault();
    setValidated(true);
    dispatch(getCoachByVenueIdResponse());
    dispatch(getCoachesByUserRadiusResponse());
    if (type === "venue") {
      if (formData.venueId === "" || formData.sportId === "") {
        toast.warn("Please Fill All the fields");
      } else {
        let obj = { ...formData };
        delete obj.radius;
        // dispatch(getCoachByVenueIdAction(obj));
        // navigate("/coachSearch");
        navigate({
          pathname: "/coachSearch",
          search: `venueId=${formData.venueId}&sportId=${formData.sportId}`,
        });
      }
    }
    if (type === "radius") {
      if (formData.radius === "" || formData.sportId === "") {
        toast.warn("Please Fill All the fields");
      } else {
        let obj = { ...formData };
        delete obj.venueId;
        // dispatch(getCoachesByUserRadiusAction(obj));
        navigate({
          pathname: "/coachSearch",
          search: `radius=${formData.radius}&sportId=${formData.sportId}`,
        });
      }
    }
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="text-white">
          Filter Coaches
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          //   validated={validated}
          onSubmit={(e) =>
            radio ? submitHandler(e, "venue") : submitHandler(e, "radius")
          }
        >
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Select
              aria-label="Default select example"
              className="form-control form-select input-control mt-3"
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
            <Form.Control.Feedback type="invalid">
              Please Select any Option
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <p className="text-white">Are you looking for Specific Venue</p>
            <div className="d-flex justify-content-start">
              <Form.Check
                inline
                className="text-white pointer "
                label="Yes"
                name="group1"
                checked={radio}
                onChange={() => setRadio(!radio)}
                type="radio"
                // id={`inline-${type}-1`}
              />
              <Form.Check
                inline
                className="text-white"
                label="No"
                checked={!radio}
                onChange={() => setRadio(!radio)}
                name="group1"
                type="radio"
                // id={`inline-${type}-2`}
              />
            </div>
          </Form.Group>

          {radio && (
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Select
                aria-label="Default select example"
                className="form-control form-select input-control mt-3"
                value={formData.venueId}
                onChange={handleFormData}
                name="venueId"
                required
              >
                <option value="">Select Venue</option>
                {getVenues?.data?.length > 0 &&
                  getVenues?.data.map((item, i) => {
                    return (
                      <option key={i} value={item.venueId}>
                        {item.name}
                      </option>
                    );
                  })}
              </Form.Select>
              <img className="set_arrowss" src={arrow} alt="arrow" />
              {/* <span class="required-asterisk">*</span> */}
              <Form.Control.Feedback type="invalid">
                Please Select any Option
              </Form.Control.Feedback>
            </Form.Group>
          )}

          {!radio && (
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "start",
                }}
              >
                <label className="mt-2" style={{ color: "white" }}>
                  Radius
                </label>

                <Slider
                  name="radius"
                  sx={{
                    // margin: "10px 0px 0px 20px",
                    color: "orange",
                  }}
                  aria-label="Temperature"
                  defaultValue={10}
                  valueLabelDisplay="auto"
                  step={1}
                  value={formData.radius}
                  onChange={handleFormData}
                  marks
                  min={0}
                  max={25}
                />
              </div>

              <Form.Control.Feedback type="invalid">
                radius
              </Form.Control.Feedback>
            </Form.Group>
          )}

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
