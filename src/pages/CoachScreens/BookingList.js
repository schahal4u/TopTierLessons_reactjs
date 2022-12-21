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

const BookingList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function valuetext(value) {
    return `${value}°C`;
  }

  const { getAllBooking } = useSelector((state) => state.getAllBookingResponse);
  const { getAllSports } = useSelector((state) => state.getAllSportsResponse);

  const data = getAllBooking?.data;
  const response = getAllBooking?.statusCode;
  const sportId = localStorage.sportsId;

  const defautFormData = {
    page: 0,
    pageSize: 0,
  };

  const [formData, setFormData] = useState(defautFormData);
  // const [validated, setValidated] = useState(false);
  const [list, setList] = useState([]);

  const [show, setShow] = useState(false);
  const [value, setValue] = useState([20, 200]);

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

    dispatch(GetAllBookingAction(formData));
    setShow(false);
  };

  const viewDetailHandler = (id) => {
    navigate(`/bookingList/${id}`);
  };

  return (
    <div>
      <Navbar />

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

      <Footer />
    </div>
  );
};

export default BookingList;
