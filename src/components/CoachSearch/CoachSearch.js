import React, { useEffect, useState } from "react";
import "./CoachSearch.css";
import { Col, Form } from "react-bootstrap";
import line from "../../assets/images/line.png";
import filter from "../../assets/images/filter.png";
import search from "../../assets/images/search.png";
import team from "../../assets/images/team.png";
import star from "../../assets/images/Star 1.png";
import map from "../../assets/images/map-pin.png";
import dot from "../../assets/images/dot.png";
import arrow from "../../assets/images/down.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCoachByIdAction,
  getCoachByVenueIdAction,
  getCoachByVenueIdResponse,
  getCoachesByUserRadiusAction,
  getCoachesByUserRadiusResponse,
  GetCoachProfileAction,
} from "../../redux/actions/coach";
import { emptyProfileImageResponse } from "../../redux/actions/UploadPhoto";
import { GetAllSportsAction } from "../../redux/actions/GetAllSports";
import Slider from "@mui/material/Slider";
import { toast } from "react-toastify";

function valuetext(value) {
  return `${value}°C`;
}

const CoachSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searched = useLocation();
  const venueId = new URLSearchParams(searched.search).get("venueId");
  const sportId = new URLSearchParams(searched.search).get("sportId");
  const radius = new URLSearchParams(searched.search).get("radius");

  const { getCoachByRadius, getCoachByVenueId, loading } = useSelector(
    (state) => state.getAllCoachResponse
  );

  console.log("loading====>", loading);
  // const { getAllSports } = useSelector((state) => state.getAllSportsResponse);

  // const data = getCoachById?.data;
  // const response = getCoachById?.statusCode;
  // const sportId = localStorage.sportsId;

  const defautFormData = {
    address: "",
    sportId: "",
    minPrice: "",
    maxPrice: "",
    page: 1,
    pageSize: 10,
    search: "",
  };

  const [formData, setFormData] = useState(defautFormData);
  const [validated, setValidated] = useState(false);
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState([]);
  console.log("msg", msg);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState([20, 200]);

  console.log("value", list);

  const handleChange = (event, newValue) => {
    setFormData({ ...formData, minPrice: newValue[0], maxPrice: newValue[1] });
    setValue(newValue);
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   let obj = {
  //     // sportId: sportId,
  //     page: 1,
  //     pageSize: 10,
  //   };
  //   dispatch(GetCoachByIdAction(obj));
  // }, []);

  useEffect(() => {
    if (getCoachByRadius?.statusCode === 200) {
      setList(getCoachByRadius?.data);
      setMsg(getCoachByVenueId?.returnMessage[0] || []);
    }

    if (getCoachByVenueId?.statusCode === 200) {
      setList(getCoachByVenueId?.data?.coachList);
      setMsg(getCoachByVenueId?.returnMessage[0] || []);
    }
  }, [getCoachByRadius, getCoachByVenueId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const bookingHandler = (data) => {
  //   localStorage.setItem("coachId", data.coachId);
  //   let obj = {
  //     coachId: data.coachId,
  //   };
  //   dispatch(emptyProfileImageResponse());
  //   dispatch(GetCoachProfileAction(obj));
  //   navigate("/booking");
  // };
  const CoachProfileHandler = (id) => {
    console.warn("ata.coachId", id);
    localStorage.setItem("coachId", id);
    navigate(`/coachProfileDetail/${id}`);
  };

  // const profileHandler = (data) => {
  //   let obj = {
  //     coachId: data.coachId,
  //   };
  //   dispatch(emptyProfileImageResponse());
  //   dispatch(GetCoachProfileAction(obj));
  //   navigate("/coachProfile");
  // };

  const closehandler = () => {
    setShow(false);
  };

  const filterHandler = () => {
    setShow(true);
  };

  // const searchFilter = () => {
  //   console.log("hiiii");
  // };

  useEffect(() => {
    // let obj = {
    //   page: 1,
    //   pageSize: 100,
    // };
    // dispatch(GetAllSportsAction(obj));

    if (venueId === "" || sportId === "") {
      navigate("/");
    } else {
      let obj = {
        venueId: venueId,
        sportId: sportId,
      };
      dispatch(getCoachByVenueIdAction(obj));
    }

    if (radius === "" || sportId === "") {
      navigate("/");
    } else {
      let obj = {
        radius: radius,
        sportId: sportId,
      };
      dispatch(getCoachesByUserRadiusAction(obj));
    }
  }, []);

  // const handleRangeData = () => {
  //   console.log("data", data);
  // };
  const filterSerachhandler = (e) => {
    e.preventDefault();
    console.log("data", formData);
    dispatch(GetCoachByIdAction(formData));
    setShow(false);
  };

  return (
    <>
      <div id="search">
        <div className="search_desc">
          <h1>Search For Coaches</h1>
        </div>
      </div>
      <Form noValidate validated={validated}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 search_container">
              {/* <div style={{ position: "relative" }} className="mt-5 ">
                <input
                  type="text"
                  className="form-control search_inp mt-3"
                  placeholder="Search for lessons"
                  name="search"
                  value={formData.search}
                  onChange={handleFormData}
                />
                <img
                  onClick={filterSerachhandler}
                  src={search}
                  className="search_icon"
                  alt="search"
                />
                <img src={line} className="line_icon" alt="line" />
                <img
                  src={filter}
                  className="filter_icon"
                  alt="filter"
                  onClick={filterHandler}
                />
              </div> */}
              <div className="col-md-12 col-lg-12 mt-5">
                <div className="search_card">
                  {list?.length > 0 ? (
                    list?.map((user) => (
                      <div className=" cards_box mb-5">
                        <div className="row">
                          <div className="col-md-5  ">
                            <div
                            // className="pic_side"
                            // style={{ textAlign: "center" }}
                            // onClick={() => profileHandler(user)}
                            >
                              <img
                                src={
                                  user?.profileImage ? user?.profileImage : team
                                }
                                // alt="team"
                                height="200px"
                                width="200px"
                                style={{ borderRadius: "10% 1% 1% 1%" }}
                              />
                            </div>
                          </div>
                          <div className="col-md-7 p-4 sidePhoto_text">
                            <div
                              className="text_side"

                              // onClick={() => profileHandler(user)}
                            >
                              <h2>{user?.name}</h2>
                              <div className="col-md-5 pb-4 pl-4 startPhoto_text ">
                                <img
                                  src={star}
                                  alt="star"
                                  className="icon_padding"
                                />
                                <span className="startext">
                                  {user?.rating}/5 (11Total)
                                </span>
                              </div>
                              <h3>$ {user?.price}</h3>
                            </div>
                            <div className="col-md-10 col-sm-12">
                              <h6 className="dot_text">
                                Diving at University of Illinois
                                Urbana-Champaign
                              </h6>
                            </div>

                            <div className="col-md-10 col-sm-12">
                              <h6 className="dot_text">{user?.about}</h6>
                            </div>
                          </div>
                          <div
                            className="col-md-7"
                            style={{ display: "flex", justifyContent: "start" }}
                          >
                            {user?.skills?.map((skill) => (
                              <button className="skill_btn">{skill}</button>
                            ))}
                          </div>

                          {/* <div className="col-md-1 text-right pb-4 start_line">
                            <img src={line} alt="" />
                          </div> */}
                          {/* <div className="col-md-6 pb-4 starPhoto_text">
                            <img src={map} alt="map" className="icon_padding" />
                            <span className="maptext">{user?.address}</span>
                          </div>
                          <hr className="center_hr" />
                          <div className="col-md-1 col-sm-12 pl-5">
                            <img src={dot} alt="" className="dotImg" />
                          </div> */}

                          {/* <button
                            className="book_btn"
                            onClick={() => bookingHandler(user)}
                          >
                            Book Lesson
                          </button> */}
                          <div className="col-md-5">
                            <button
                              className="book_btn "
                              onClick={() => CoachProfileHandler(user.coachId)}
                            >
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : !loading ? (
                    <div className=" w-100 d-flex justify-content-center align-items-center">
                      <h4 className="text-white">
                        {msg.length > 0 ? msg : "Data Not Found"}
                      </h4>
                    </div>
                  ) : (
                    <div class=" w-100 d-flex justify-content-center align-items-center ">
                      <div class="spinner-border text-white" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                  {/* {list.length == 0 && (
                    <div style={{ width: "100%" }}>
                      <h1 style={{ color: "#fff" }}>No Data Found</h1>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal */}
        {/* <div
          className={"modal fade" + (show ? " show d-block" : " d-none")}
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content" style={{ marginTop: "14rem" }}>
              <i
                class="fa fa-times-circle"
                aria-hidden="true"
                onClick={closehandler}
                style={{
                  fontSize: "22px",
                  color: "#fff !important",
                  padding: "7px",
                  textAlign: "right",
                  cursor: "pointer",
                }}
              ></i>
              <div className="modal-body">
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Control
                    required
                    type="text"
                    className="form-control signin_inpp mt-3"
                    placeholder="Enter Location"
                    name="address"
                    value={formData.address}
                    onChange={handleFormData}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ marginLeft: "65px" }}
                  >
                    Email is Required
                  </Form.Control.Feedback>
                </Form.Group>

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
                    {getAllSports &&
                      getAllSports?.data.map((item, i) => {
                        return (
                          <option key={i} value={item.sportId}>
                            {item.sportName}
                          </option>
                        );
                      })}
                  </Form.Select>
                  <img className="set_arrowss" src={arrow} alt="arrow" />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ marginLeft: "65px" }}
                  >
                    Please Select any Option
                  </Form.Control.Feedback>
                </Form.Group>

                <p
                  style={{
                    color: "#fff",
                    paddingLeft: "36px",
                    paddingTop: "10px",
                  }}
                >
                  Price Range
                </p>
                <div style={{ width: "83%", margin: "10px auto" }}>
                  <Slider
                    sx={{ width: "100%", color: "orange", margin: "0px auto" }}
                    getAriaLabel={() => "Temperature range"}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={0}
                    max={1000}
                  />
                </div>

                <button className="book_btnnn" onClick={filterSerachhandler}>
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </Form>
      {/* Modal */}
    </>
  );
};

export default CoachSearch;
