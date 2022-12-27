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

import { GetAllBookingAction } from "../../redux/actions/GetAllBookingAction";
import {
  GetCoachByIdAction,
  GetCoachProfileAction,
} from "../../redux/actions/coach";
import { emptyProfileImageResponse } from "../../redux/actions/UploadPhoto";
import { GetAllSportsAction } from "../../redux/actions/GetAllSports";
import Slider from "@mui/material/Slider";
import AddReviewModal from "../../components/Modal/AddReviewModal";
import { CreateReviewAction } from "../../redux/actions/ReviewAction";

const UserBookingList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function valuetext(value) {
    return `${value}°C`;
  }

  const { getAllBooking } = useSelector((state) => state.getAllBookingResponse);
  const { getAllSports } = useSelector((state) => state.getAllSportsResponse);
  // const { createReviewReducer } = useSelector((state) => state.createReview);

  const data = getAllBooking?.data;
  const response = getAllBooking?.statusCode;
  const sportId = localStorage.sportsId;
  const reciverId = getAllBooking?.data?.coachId;
  // const rate = createReviewReducer?.data.rating
  // console.log("rate=>>>>>>>>>", rate)
  const [ratingValue, setRatingValue] = useState(0);
  const handleRating = (rate) => {
    setRatingValue(rate);
  };

  const defautFormData = {
    page: 0,
    pageSize: 0,
    reciverId: 0,
    review: "string",
    rating: 0,
    coachId: 0,
  };

  const defaultRating = {
    reciverId: "",
    review: "",
    rating: "",
  };

  console.log("coachid=>>>>>>>>", reciverId);
  const [formData, setFormData] = useState(defautFormData);
  // const [validated, setValidated] = useState(false);
  const [list, setList] = useState([]);

  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState([20, 200]);
  const [rating, setRating] = useState(defaultRating);
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
    dispatch(GetAllBookingAction(obj));
  }, []);

  useEffect(() => {
    if (response == 200) {
      setList(data);
    }
  }, [getAllBooking]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const closehandler = () => {
    setShow(false);
  };

  const filterHandler = () => {
    setShow(true);
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
    console.log("data", formData);
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
  const submitHandler = () => {
    if (rating.reciverId != "" && (rating.review != "" || rating.rating != ""))
      dispatch(CreateReviewAction(rating));
    setShowModal(false);
  };
  const emailHandler = () => {
    navigate("/emailTemplate");
  };

  return (
    <div>
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
            <div className="col-md-12">
              {list?.length &&
                list?.map((user) => {
                  console.log("user =>>>>>", user);
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
                            <h1>{user?.coachName}</h1>
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
                          <button
                            className="book_button"
                            onClick={emailHandler}
                          >
                            email
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
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <AddReviewModal
        show={showModal}
        rating={rating}
        setRating={setRating}
        onHide={() => setShowModal(false)}
        submitHandler={submitHandler}
      />

      <Footer />
    </div>
  );
};

export default UserBookingList;
