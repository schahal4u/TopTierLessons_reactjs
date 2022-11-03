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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCoachByIdAction,
  GetCoachProfileAction,
} from "../../redux/actions/coach";
import { emptyProfileImageResponse } from "../../redux/actions/UploadPhoto";
import { GetAllSportsAction } from "../../redux/actions/GetAllSports";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

const CoachSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { getCoachById } = useSelector((state) => state.getAllCoachResponse);
  const { getAllSports } = useSelector((state) => state.getAllSportsResponse);

  const data = getCoachById?.data;
  const response = getCoachById?.statusCode;
  const sportId = localStorage.sportsId;
  const isUser = localStorage.coachId;
  console.log("isUser=>", isUser);

  const defautFormData = {
    address: "",
    sportId: sportId,
    minPrice: "",
    maxPrice: "",
    page: 1,
    pageSize: 10,
    search: "",
  };

  const [formData, setFormData] = useState(defautFormData);
  const [validated, setValidated] = useState(false);
  const [list, setList] = useState([]);

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

  useEffect(() => {
    let obj = {
      sportId: sportId,
      page: 1,
      pageSize: 10,
    };
    dispatch(GetCoachByIdAction(obj));
  }, []);

  useEffect(() => {
    if (response == 200) {
      setList(data);
    }
  }, [getCoachById]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bookingHandler = (data) => {
    localStorage.setItem("coachId", data.coachId);
    let obj = {
      coachId: data.coachId,
    };
    dispatch(emptyProfileImageResponse());
    dispatch(GetCoachProfileAction(obj));
    navigate("/booking");
  };

  const profileHandler = (data) => {
    localStorage.setItem("coachId", data.coachId);
    let obj = {
      coachId: data.coachId,
    };
    dispatch(emptyProfileImageResponse());
    dispatch(GetCoachProfileAction(obj));
    navigate("/coachProfile");
  };

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
    let obj = {
      page: 1,
      pageSize: 100,
    };
    dispatch(GetAllSportsAction(obj));
  }, []);

  const handleRangeData = () => {
    console.log("data", data);
  };
  const filterSerachhandler = (e) => {
    e.preventDefault();
    console.log("data", formData);
    dispatch(GetCoachByIdAction(formData));
    setShow(false);
  };

  return (
    <>
      <div className="search">
        <div className="search_desc">
          <h1>Search For Coaches</h1>
        </div>
      </div>
      <Form noValidate validated={validated}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 search_container">
              <div style={{ position: "relative" }} className="mt-5 ">
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
              </div>
              <div className="col-md-12 col-lg-12 mt-5">
                <div className="search_card">
                  {list?.length &&
                    list?.map((user) => (
                      <div className=" cards_box mb-5">
                        <div className="row">
                          <div className="col-md-5 p-4 pl-4">
                            <div
                              className="pic_side"
                              style={{ textAlign: "center" }}
                              onClick={() => profileHandler(user)}
                            >
                              <img
                                src={
                                  user?.profileImage ? user?.profileImage : team
                                }
                                alt="team"
                                height="125px"
                                width="125px"
                                style={{ borderRadius: "50%" }}
                              />
                            </div>
                          </div>
                          <div className="col-md-7 p-4 sidePhoto_text">
                            <div
                              className="text_side"
                              onClick={() => profileHandler(user)}
                            >
                              <h2>{user?.name}</h2>
                              <h3>$ {user?.price}</h3>
                            </div>
                          </div>
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
                          <div className="col-md-1 text-right pb-4 start_line">
                            <img src={line} alt="" />
                          </div>
                          <div className="col-md-6 pb-4 starPhoto_text">
                            <img src={map} alt="map" className="icon_padding" />
                            <span className="maptext">{user?.address}</span>
                          </div>
                          <hr className="center_hr" />
                          <div className="col-md-1 col-sm-12 pl-5">
                            <img src={dot} alt="" className="dotImg" />
                          </div>
                          <div className="col-md-10 col-sm-12">
                            <h6 className="dot_text">{user?.about}</h6>
                          </div>
                          <button
                            className="book_btn"
                            onClick={() => bookingHandler(user)}
                          >
                            Book Lesson
                          </button>
                        </div>
                      </div>
                    ))}
                  {list.length == 0 && (
                    <div style={{ width: "100%" }}>
                      <h1 style={{ color: "#fff" }}>No Data Found</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal */}
        <div
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
              {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button> */}
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
                  {/* <span class="required-asterisk">*</span> */}
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
        </div>
      </Form>
      {/* Modal */}
    </>
  );
};

export default CoachSearch;
