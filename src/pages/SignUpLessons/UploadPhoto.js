import React, { memo, useEffect, useRef, useState } from "react";
import { Col, Form, InputGroup } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import arrow from "../../assets/images/down.png";
import avtar from "../../assets/images/profileIcon.png";
import CoachLatLong from "../../components/CoachProfile/CoachLatLong";
import { AdminProfileUpdateAction } from "../../redux/actions/AdminProfileUpdateAction";
import { GetAllSportsAction } from "../../redux/actions/GetAllSports";
import { PhotoUploadAction } from "../../redux/actions/UploadPhoto";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import Slider from "@mui/material/Slider";
import styled from "@emotion/styled";
import { GetNearbyVenueAction } from "../../redux/actions/coach";
import { MultiSelect } from "react-multi-select-component";
const UploadPhoto = () => {
  const API_KEY = "AIzaSyDx_6SY-xRPDGlQoPt8PTRbCtTHKCbiCXQ";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputFile = useRef(null);

  const imageType = [
    "image/tif",
    "image/tiff",
    "image/bmp",
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/eps",
    "image/webp",
  ];
  const { imgResponse } = useSelector((state) => state.profilePicResponse);
  const responseCode = imgResponse?.statusCode;

  //   console.log("response is", responseCode);

  const { updateProfileDetail } = useSelector((state) => state.profileUpdate);
  const response = updateProfileDetail?.statusCode;
  const { getAllSports } = useSelector((state) => state.getAllSportsResponse);

  const { getNearbyVenue } = useSelector((state) => state.getAllCoachResponse);

  const defautFormData = {
    name: null,
    email: null,
    age: null,
    address: null,
    bio: null,
    sportId: null,
    profileImage: null,
    latitude: null,
    longitude: null,
    price: null,
    radius: null,
  };
  let defautVenue = {
    venueId: 0,
  };

  const [formData, setFormData] = useState(defautFormData);

  const [venues, setVenues] = useState(defautVenue);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [inp, setInp] = useState("");

  const [place, setPlace] = useState("");
  const [latLong, setLatLong] = useState({});
  const [value, setValue] = useState(10);
  const [selected, setSelected] = useState([]);

  const [options, setOptions] = useState([]);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChange = (event, newValue) => {
    // setFormData({ ...formData, minPrice: newValue[0], maxPrice: newValue[1] });
    setValue(newValue);
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const signUpHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setValidated(true);

    if (
      formData.address == null ||
      formData.latitude == null ||
      formData.longitude == null ||
      formData.sportId == null ||
      formData.radius == null
    ) {
      setLoading(false);
      toast.warn("Please Fill All the fields");
    } else {
      setLoading(true);
      let obj = [formData];
      let venue = venues;

      let userData = {
        users: obj,
        venueList: venue,
      };

      dispatch(AdminProfileUpdateAction(userData));
    }
  };

  const photoUpload = (e) => {
    const incomingFile = e.target.files[0];
    const fileType = incomingFile && (incomingFile?.type).toLowerCase();
    const size = incomingFile && e.target.files[0].size;
    const validImageTypes = imageType;

    if (incomingFile && !validImageTypes.includes(fileType)) {
      setInp("");
      toast.warn("Please Select the Supported Image Format !");
      return;
    }

    if (size > 3000000) {
      setInp("");
      toast.warn("Please Select File Size Upto 3mb !");
      return;
    }

    if (e.target.files.length !== 0) {
      let data = new FormData();
      data.append("file", e.target.files[0]);
      dispatch(PhotoUploadAction(data));
    }
  };

  const uploadLogo = () => {
    inputFile.current.click();
  };

  useEffect(() => {
    if (responseCode == 200) {
      setFormData({ ...formData, profileImage: imgResponse?.data?.url });
    }
  }, [imgResponse]);

  useEffect(() => {
    if (response == 200) {
      navigate("/");
    }
  }, [updateProfileDetail]);

  useEffect(() => {
    let obj = {
      page: 1,
      pageSize: 100,
    };
    dispatch(GetAllSportsAction(obj));
  }, []);

  // geocodeByAddress("Montevideo, Uruguay")
  //   .then((results) => getLatLng(results[0]))
  //   .then(({ lat, lng }) =>
  //     console.log("Successfully got latitude and longitude", { lat, lng })
  //   );

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

  useEffect(() => {
    if (
      formData.latitude !== null &&
      formData.longitude !== null &&
      formData.radius !== null &&
      formData.sportId !== null
    ) {
      dispatch(
        GetNearbyVenueAction({
          lat: formData.latitude,
          long: formData.longitude,
          radius: formData.radius,
          sportId: parseInt(formData?.sportId),
        })
      );
    }
  }, [
    formData.latitude,
    formData.longitude,
    formData.radius,
    formData.sportId,
  ]);

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
      setVenues(data);
    }
  }, [selected]);

  return (
    <>
      <div className="signIn">
        <div className="container form_sign">
          <Form noValidate validated={validated}>
            {/* <form onSubmit={signUpHandler}> */}
            <div className="basic_upload_form">
              <h1>Basic Detail</h1>
              <img
                src={formData.profileImage || avtar}
                style={{
                  borderRadius: "50%",
                  width: "120px",
                  height: "120px",
                  cursor: "pointer",
                  marginBottom: "15px",
                }}
                onClick={uploadLogo}
              />
              <input
                type="file"
                id="file"
                ref={inputFile}
                style={{ display: "none" }}
                onChange={photoUpload}
              />
              {/* <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Control
                  type="text"
                  className="form-control signin_inp mt-3"
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleFormData}
                  required
                /> 
              
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginLeft: "65px" }}
                >
                  Name is Required
                </Form.Control.Feedback>
              </Form.Group> */}
              <div
                as={Col}
                md="12"
                style={{ width: "72%" }}
                controlId="validationCustom01"
              >
                <GooglePlacesAutocomplete
                  apiKey={API_KEY}
                  selectProps={{
                    place,
                    onChange: setPlace,
                  }}
                />
              </div>

              <div
                style={{
                  width: "72%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label className="mt-2" style={{ color: "white" }}>
                  radius
                </label>
                <div style={{ width: "100%", margin: "10px 0px 0px 20px" }}>
                  <Slider
                    name="radius"
                    sx={{ width: "100%", color: "orange" }}
                    aria-label="Temperature"
                    defaultValue={10}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={5}
                    value={formData.radius}
                    onChange={handleFormData}
                    marks
                    min={0}
                    max={100}
                  />
                </div>
              </div>

              {/* select sports */}

              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Select
                  aria-label="Default select example"
                  className="form-control form-select select_box mt-3"
                  value={formData.sportId}
                  onChange={handleFormData}
                  name="sportId"
                  disabled={
                    formData.latitude !== null &&
                    formData.longitude !== null &&
                    formData.radius !== null
                      ? ""
                      : "true"
                  }
                  required
                >
                  <option value="null">Select Sport</option>
                  {getAllSports &&
                    getAllSports?.data.map((item, i) => {
                      return (
                        <option key={i} value={item.sportId}>
                          {item.sportName}
                        </option>
                      );
                    })}
                </Form.Select>
                <img className="set_arrows" src={arrow} alt="arrow" />
                {/* <span class="required-asterisk">*</span> */}
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginLeft: "65px" }}
                >
                  Please Select any Option
                </Form.Control.Feedback>
              </Form.Group>

              {/* multi selected area  */}

              <div
                style={{ width: "72%" }}
                // hidden={getNearbyVenue?.data?.length >= 0 ? "" : ""}
              >
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                />
              </div>

              {/* Base Amount */}

              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Control
                  type="number"
                  className="form-control signin_inp mt-3"
                  placeholder="Price"
                  name="price"
                  min="0"
                  value={formData.price}
                  onChange={handleFormData}
                  required
                />

                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginLeft: "65px" }}
                >
                  Base Amount is Required
                </Form.Control.Feedback>
              </Form.Group>

              {/* Descriptions Area */}

              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="text"
                  className="form-control signin_inp mt-3"
                  placeholder="Sell Yourself! Tell parents who you are, your major and athletic experiences and accomplishments. If you have taught lessons before or have any other cool Skills add it in! "
                  name="bio"
                  value={formData.bio}
                  onChange={handleFormData}
                  required
                  pattern="^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$"
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginLeft: "65px" }}
                >
                  Bio is Required
                </Form.Control.Feedback>
              </Form.Group>
              <button
                type="submit"
                onClick={signUpHandler}
                className="btn btn-primary signin_btn mt-4 mb-4"
              >
                {loading && (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: "15px" }}
                  ></span>
                )}
                Done
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UploadPhoto;
