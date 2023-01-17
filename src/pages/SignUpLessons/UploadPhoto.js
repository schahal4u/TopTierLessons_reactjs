import React, { memo, useEffect, useRef, useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";

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

import { TagsInput } from "react-tag-input-component";
import { getAllSkillsAction } from "../../redux/actions/getAllSkillAction";
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
  const { updateProfileDetail } = useSelector((state) => state.profileUpdate);
  const response = updateProfileDetail?.statusCode;
  const { getAllSports } = useSelector((state) => state.getAllSportsResponse);
  const { getAllSkills } = useSelector((state) => state.getAllSkills);
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
    radius: null || 0,
    pastExperience: null,
    accomplishments: [],
    strengths: [],
    sKills: [],
  };
  let defautVenue = {
    venueId: 0,
  };

  const [formData, setFormData] = useState(defautFormData);
  const [venues, setVenues] = useState(defautVenue);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [inp, setInp] = useState("");
  const [place, setPlace] = useState("");
  const [selected, setSelected] = useState([]);
  const [skillsSelected, setSkillsSelected] = useState([]);
  const [accomplishBedge, setAccomplishBedge] = useState([]);
  const [strengthBedge, setStrengthBedge] = useState([]);
  const [options, setOptions] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function valuetext(value) {
    return `${value}°C`;
  }

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
    if (accomplishBedge != []) {
      setFormData({ ...formData, accomplishments: [...accomplishBedge] });
    }
  }, [imgResponse, accomplishBedge]);

  useEffect(() => {
    if (response == 200) {
      navigate("/");
    }
    if (strengthBedge != []) {
      setFormData({ ...formData, strengths: [...strengthBedge] });
    }
  }, [updateProfileDetail, strengthBedge]);

  useEffect(() => {
    let obj = {
      page: 1,
      pageSize: 100,
    };
    dispatch(GetAllSportsAction(obj));
    dispatch(getAllSkillsAction(obj));
  }, []);

  useEffect(() => {
    if (place) {
      geocodeByAddress(place?.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) =>
          setFormData({
            ...formData,
            address: place.label,
            latitude: lat,
            longitude: lng,
          })
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
    if (getAllSkills?.data?.length >= 0) {
      let options = getAllSkills?.data.map((item, i) => ({
        label: item.skill,
        value: item.skillId,
      }));
      setSkillOptions(options);
    }
  }, [getNearbyVenue, getAllSkills]);

  useEffect(() => {
    if (selected) {
      let data = selected.map((item, i) => ({
        venueId: item.value,
      }));
      setVenues(data);
    }
    if (skillsSelected) {
      let data = skillsSelected.map((item, i) => item.value);

      setFormData({ ...formData, sKills: [...data] });
      // setVenues(data);
    }
  }, [selected, skillsSelected]);

  //  submit handler

  const signUpHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setValidated(true);

    // name: null,
    // email: null,
    // age: null,
    // address: null,
    // bio: null,
    // sportId: null,
    // profileImage: null,
    // latitude: null,
    // longitude: null,
    // price: null,
    // radius: null || 0,
    // pastExperience: null,
    // accomplishments: [],
    // strengths: [],
    // sKills: [],

    if (
      formData.address == null ||
      formData.latitude == null ||
      formData.longitude == null ||
      formData.sportId == null ||
      formData.radius == null ||
      formData.pastExperience == null ||
      formData.accomplishments == [] ||
      formData.strengths == [] ||
      formData.sKills == [] ||
      formData.bio == null
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
      // console.log("userData====>", userData);

      dispatch(AdminProfileUpdateAction(userData));
    }
  };

  return (
    <>
      <div className="  signIn main_basic_detail_form">
        <div
          className="container"
          style={{
            backgroundColor: "#313131",
            borderRadius: "40px",
          }}
        >
          <div className=" py-5">
            <Row>
              <Col md={4} className=" ">
                <div className="h-100 d-flex  flex-column justify-content-start align-items-center">
                  {/* <h1>Basic Detail</h1> */}
                  <img
                    src={formData.profileImage || avtar}
                    style={{
                      borderRadius: "50%",
                      width: "120px",
                      height: "120px",
                      cursor: "pointer",
                      marginBottom: "5px",
                    }}
                    onClick={uploadLogo}
                  />
                  <br />

                  <input
                    type="file"
                    id="file"
                    ref={inputFile}
                    style={{ display: "none" }}
                    onChange={photoUpload}
                  />
                  <h5 className="text-white">profile picture</h5>
                </div>
              </Col>

              <Col md={8} className=" ">
                <Form className="mx-4" noValidate validated={validated}>
                  <Row className="mt-2">
                    <Form.Group
                      as={Col}
                      md="6"
                      className="google-analytics"
                      controlId="validationCustom03"
                    >
                      <Form.Label className="text-white my-0">
                        Enter Address
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="input-control mt-3"
                        placeholder="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleFormData}
                        required
                        hidden
                      />
                      <GooglePlacesAutocomplete
                        apiKey={API_KEY}
                        selectProps={{
                          place,
                          onChange: setPlace,
                          placeholder: "Address",
                        }}
                      />

                      <Form.Control.Feedback type="invalid">
                        Address is Required
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <Form.Label className="text-white  my-0">
                        Sport
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className="input-control"
                        value={formData.sportId}
                        onChange={handleFormData}
                        name="sportId"
                        // disabled={
                        //   formData.latitude !== null &&
                        //   formData.longitude !== null &&
                        //   formData.radius !== null
                        //     ? ""
                        //     : "true"
                        // }
                        required
                      >
                        <option value="">Select Sport</option>
                        {getAllSports &&
                          getAllSports?.data.map((item, i) => {
                            return (
                              <option key={i} value={item.sportId}>
                                {item.sportName}
                              </option>
                            );
                          })}
                      </Form.Select>
                      <img className="input-arrow" src={arrow} alt="arrow" />
                      {/* <span class="required-asterisk">*</span> */}
                      <Form.Control.Feedback type="invalid">
                        Please Select any Option
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  {/* select sports */}
                  <Row className="mt-2">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label className="text-white   my-0 ">
                        Radius
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className=" input-control  mt-3"
                        value={formData.radius}
                        onChange={handleFormData}
                        name="radius"
                        // disabled={
                        //   formData.latitude !== null &&
                        //   formData.longitude !== null &&
                        //   formData.radius !== null
                        //     ? ""
                        //     : "true"
                        // }
                        hidden
                        required
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ width: "100%" }}>
                          <Slider
                            name="radius"
                            sx={{ width: "100%", color: "orange" }}
                            aria-label="Temperature"
                            defaultValue={10}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={1}
                            value={formData.radius}
                            onChange={handleFormData}
                            marks
                            min={0}
                            max={25}
                          />
                        </div>

                        <text className="px-3 text-white">
                          {formData.radius}
                        </text>
                      </div>
                    </Form.Group>
                  </Row>

                  <Row className="mt-2">
                    {/* multi selected area  */}
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                      <Form.Label className="text-white  my-0">
                        Venues
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="input-control mt-3"
                        placeholder="venueId"
                        name="venueId"
                        value={selected}
                        onChange={setSelected}
                        required
                        hidden
                      />

                      <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                      />
                      {/* </div> */}
                      <Form.Control.Feedback type="invalid">
                        Venue is Required
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Base Amount */}

                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <Form.Label className="text-white  my-0">
                        Price
                      </Form.Label>
                      <Form.Control
                        type="number"
                        id="pricing"
                        className=" input-control  "
                        placeholder="Price"
                        name="price"
                        min="0"
                        value={formData.price}
                        onChange={handleFormData}
                        required
                      />

                      <Form.Control.Feedback type="invalid">
                        Base Amount is Required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mt-2 mb-3">
                    {/* multi selected area  */}
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                      <Form.Label className="text-white ">
                        Accomplishment
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="input-control mt-3"
                        placeholder="accomplishments"
                        name="accomplishments"
                        value={formData.accomplishments}
                        // onChange={setSelected}
                        required
                        hidden
                      />
                      <TagsInput
                        // classNames="input-control"

                        value={accomplishBedge}
                        onChange={setAccomplishBedge}
                        name="accomplish"
                        placeHolder="Enter Accomplish"
                      />
                      <Form.Control.Feedback type="invalid">
                        Accomplishment is Required
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Base Amount */}
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <Form.Label className="text-white ">Strengths</Form.Label>
                      <Form.Control
                        type="text"
                        className="input-control mt-3"
                        placeholder="strengths"
                        name="strengths"
                        value={formData.strengths}
                        required
                        // onChange={handleFormData}
                        hidden
                      />
                      <TagsInput
                        // classNames="input-control"
                        value={strengthBedge}
                        onChange={setStrengthBedge}
                        name="StrengthBedge"
                        placeHolder="Enter Strength"
                      />

                      <Form.Control.Feedback type="invalid">
                        Strength is Required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  {/* skills */}
                  <Row className="mt-2">
                    {/* multi selected area  */}
                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                      <Form.Label className="text-white  my-0">
                        Skills
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="input-control mt-3"
                        placeholder=" Skills"
                        name="sKills"
                        value={skillsSelected}
                        // onChange={setSelected}
                        required
                        hidden
                      />

                      <MultiSelect
                        options={skillOptions}
                        value={skillsSelected}
                        onChange={setSkillsSelected}
                        labelledBy="Select"
                      />
                      {/* </div> */}
                      <Form.Control.Feedback type="invalid">
                        skills is Required
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Base Amount */}

                    {/* <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <Form.Label className="text-white  my-0">
                        Price
                      </Form.Label>
                      <Form.Control
                        type="number"
                        id="pricing"
                        className=" input-control  "
                        placeholder="Price"
                        name="price"
                        min="0"
                        value={formData.price}
                        onChange={handleFormData}
                        required
                      />

                      <Form.Control.Feedback type="invalid">
                        Base Amount is Required
                      </Form.Control.Feedback>
                    </Form.Group> */}
                  </Row>

                  {/* Past Experience */}
                  <Row className="mt-2">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label className="text-white  my-0">
                        Experience
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        type="text"
                        className="form-control profile_inp  "
                        placeholder="Tell about your past experince"
                        name="pastExperience"
                        value={formData.pastExperience}
                        onChange={handleFormData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Experience is Required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  {/* bio Area */}
                  <Row className="mt-2">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label className="text-white  my-0">Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        type="text"
                        className="form-control profile_inp "
                        placeholder="Tell Yourself! Tell parents who you are, your major and athletic experiences and accomplishments. If you have taught lessons before or have any other cool Skills add it in! "
                        name="bio"
                        value={formData.bio}
                        onChange={handleFormData}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Bio is Required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <button
                    type="submit"
                    onClick={signUpHandler}
                    className="btn main_ttButton mt-4 mb-4"
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
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPhoto;
