import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";

// import "../CoachSearch/";
import { Col } from "react-bootstrap";
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

import { DeleteBookingAction, GetAllBookingAction, PreviousBookingAction, UpcomingBookingsAction } from "../../redux/actions/GetAllBookingAction";
import {
  GetCoachByIdAction,
  GetCoachProfileAction,
} from "../../redux/actions/coach";
import { emptyProfileImageResponse } from "../../redux/actions/UploadPhoto";
import { GetAllSportsAction } from "../../redux/actions/GetAllSports";
import Slider from "@mui/material/Slider";
import { CreateReviewAction } from "../../redux/actions/ReviewAction";
import AddReviewModal from "../../components/Modal/AddReviewModal";
import PreviousBooking from "./previousBooking";
import UpcomingBooking from "./UpcomingBooking";
import { style } from "@mui/system";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";

const BookingList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage?.userData;
  let parsing = token ? JSON.parse(localStorage?.userData) : null;
  let usertype = parsing?.userType || null;


  function valuetext(value) {
    return `${value}°C`;
  }

  const { getAllBooking } = useSelector((state) => state.getAllBookingResponse);
  const { getAllSports } = useSelector((state) => state.getAllSportsResponse);
  const { previousBooking } = useSelector((state) => state.previousBooking);
  const { upcomingBooking } = useSelector((state) => state.upcomingBooking);

  const data = previousBooking?.data;
  const response = previousBooking?.statusCode;
  const response1 = upcomingBooking?.statusCode;
  const sportId = localStorage.sportsId;
  const data1 = upcomingBooking?.data;


  const defautFormData = {
    page: 0,
    pageSize: 0,
  };
  const defaultRating = {
    reciverId: "",
    review: "",
    rating: "",
  };

  const defaultShowBooking = {
    previousBooking: false,
    upcomingBooking: false,
  }

  const [formData, setFormData] = useState(defautFormData);
  // const [validated, setValidated] = useState(false);
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showBooking, setShowBooking] = useState({ ...defaultShowBooking, previousBooking: true });
  const [show, setShow] = useState(false);
  const [value, setValue] = useState([20, 200]);
  const [rating, setRating] = useState(defaultRating);
  const [activePrevious, setActivePrevious] = useState(true);
  const [activeUpcoming, setActiveUpcoming] = useState(false)
  const handleChange = (event, newValue) => {

    setFormData({
      ...formData,
      data,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    });
    setValue(newValue);
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let obj = {
      page: 1,
      pageSize: 10,
    };
    dispatch(PreviousBookingAction(obj));
  }, []);

  useEffect(() => {
    if (response == 200) {
      setList(data);
    }
  }, [previousBooking]);

  useEffect(() => {
    if (response1 == 200) {
      setList(data1);
    }
  }, [upcomingBooking]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const closehandler = () => {
    setShow(false);
  };

  const filterHandler = () => {
    setShow(true);
  };
  let obj = {
    page: 1,
    pageSize: 10,
  };
  const previousBookingHandler = () => {
    setShowBooking({ ...defaultShowBooking, previousBooking: true });
    dispatch(PreviousBookingAction(obj))
    setActivePrevious(true);
    setActiveUpcoming(false);

  };

  const upcomingBookingHandler = () => {
    setShowBooking({ ...defaultShowBooking, upcomingBooking: true });
    dispatch(UpcomingBookingsAction(obj))
    setActiveUpcoming(true);
    setActivePrevious(false);
  };
  // const searchFilter = () => {
  //   console.log("hiiii");
  // };

  // useEffect(() => {
  //     let obj = {
  //         page: 1,
  //         pageSize: 100,
  //     };
  //     dispatch(GetAllSportsAction(obj));
  // }, []);

  const filterSerachhandler = (e) => {
    e.preventDefault();

    dispatch(GetAllBookingAction(formData));
    setShow(false);
  };

  const viewDetailHandler = (id) => {
    navigate(`/appointmentList/${id}`);
  };

  const reviewHandler = (id) => {
    setRating({ ...rating, reciverId: id });
    setShowModal(true);
  };
  const deleteBookingHandler = (ids) => {
    let object = {
      bookingId: ids,
      bookingStatus: 2,
    }
    dispatch(DeleteBookingAction(object))
  }

  const approveBookingHandler = (ids) => {
    let object = {
      bookingId: ids,
      bookingStatus: 3,
    }
    dispatch(DeleteBookingAction(object))
  }

  const submitHandler = () => {
    if (rating.reciverId != "" && (rating.review != "" || rating.rating != ""))
      dispatch(CreateReviewAction(rating));
    setShowModal(false);
  };

  return (
    <div>
      {/* <Navbar /> */}

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
            <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
              <button onClick={previousBookingHandler}
                style={{
                  backgroundColor: activePrevious ? "#E38226" : "black",
                  color: "white",
                  border: "none",
                  height: "40px",
                  size: "20px",
                  // padding: "20px"
                }}
              >
                PreviousBooking
              </button>
              <button onClick={upcomingBookingHandler}
                style={{
                  backgroundColor: activeUpcoming ? "#E38226" : "black",
                  border: "none",
                  color: "white",
                  height: "40px",
                  size: "20px",
                  marginLeft: "40px",
                }}
              // className="btn btn-primary profile_btn mt-4 mb-4"
              >
                UpcomingBooking
              </button>
            </div>

            {/* <div className="col-md-12">
              {list?.length &&
                list?.map((user) => {
                  let dateupdate = new Date(
                    user.bookingDate
                  ).toLocaleDateString();
                  return (
                    <div>
                      <div className="name_section">
                        <div
                          className="pic_side"
                          style={{ textAlign: "center" }}
                        // onClick={() => profileHandler(user)}
                        >
                          <img
                            src={user?.profileImage ? user?.profileImage : team}
                            alt="team"
                            height="50px"
                            width="50px"
                            style={{ borderRadius: "50%" }}
                          />
                        </div>
                        <div className="coach_price">
                          <div className="coach_price_label">
                            <h4>Name</h4>
                          </div>
                          <div className="coach_fullname">
                            <h1>{user?.studentName}</h1>
                          </div>
                        </div>
                        <div
                          style={{
                            borderLeft: "1px solid #575757",
                            height: "90px",
                          }}
                        ></div>
                        <div className="coach_price">
                          <div className="coach_price_label">
                            <h4>Booking Date</h4>
                          </div>
                          <div className="coach_full_price">
                            <h1>{dateupdate}</h1>
                          </div>
                        </div>
                        <div
                          style={{
                            borderLeft: "1px solid #575757",
                            height: "90px",
                          }}
                        ></div>
                        <div className="coach_btn">
                          <button
                            className="book_button"
                            onClick={() => viewDetailHandler(user.bookingId)}
                          >
                            View Detail
                          </button>
                        </div>
                        <div
                          style={{
                            borderLeft: "1px solid #575757",
                            height: "90px",
                          }}
                        ></div>
                        <div className="coach_btn">
                          <button
                            className="book_button"
                            onClick={() => reviewHandler(user.coachId)}
                          >
                            review
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}

              {list.length == 0 && (
                <div style={{ width: "100%" }}>
                  <h1 style={{ color: "#fff" }}>No Data Found</h1>
                </div>
              )}
            </div> */}
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
                  sx={{
                    width: "100%",
                    color: "orange",
                    margin: "0px auto",
                  }}
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
      <div>
        {showBooking.previousBooking && <PreviousBooking
          list={list}
          viewDetailHandler={viewDetailHandler}
          reviewHandler={reviewHandler}
          usertype={usertype}
        />}
        {showBooking.upcomingBooking && <UpcomingBooking
          list={list}
          viewDetailHandler={viewDetailHandler}
          approveBookingHandler={approveBookingHandler}
          deleteBookingHandler={deleteBookingHandler}
          usertype={usertype}
        />}
      </div>
      <AddReviewModal
        show={showModal}
        rating={rating}
        setRating={setRating}
        onHide={() => setShowModal(false)}
        submitHandler={submitHandler}
      />

      {/* <Footer /> */}
    </div >
  );
};

export default BookingList;
