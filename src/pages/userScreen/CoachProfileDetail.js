import React, { useEffect, useRef, useState } from "react";
// import "./Dashboard.css";
import logo from "../../assets/images/profileIcon.png";
import { useNavigate, useParams } from "react-router-dom";

// import Earning from "./Earning";
// import Training from "./Training";
// import VideoLesson from "./VideoLesson";
// import ChangePassword from "./ChangePassword";
import { Button, Carousel, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { PhotoUploadAction } from "../../redux/actions/UploadPhoto";
import { AdminGetProfileDetailAction } from "../../redux/actions/AdminGetProfileDetail";
import { emptyPasswordResponse } from "../../redux/actions/ChangePassword";
import { emptyUpdateProfileResponse } from "../../redux/actions/AdminProfileUpdateAction";
import {
  GetCoachByIdAction,
  GetCoachProfileAction,
} from "../../redux/actions/coach";
import BasicDetail from "../../components/BookingComponent/BasicDetail";
import Bookings from "../../components/BookingComponent/Bookings";
import Location from "../../components/CoachProfile/Location";
// import CoachDocs from "../CoachProfile/CoachDocs";
// import Review from "./Review";

const CoachProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { profileDetail, profileError } = useSelector(
  //     (state) => state.getProfileDetail
  // );
  // const getResponse = profileDetail?.statusCode;

  const { getCoachProfile } = useSelector((state) => state.getAllCoachResponse);
  const { getAllSports } = useSelector((state) => state.getAllSportsResponse);

  const data = getCoachProfile?.data;
  const response = getCoachProfile?.statusCode;
  console.log("get", getCoachProfile);

  const [list, setList] = useState();
  const [open, setOpen] = useState(false);
  const [venueSlidder, setVenueSlidder] = useState();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (response == 200) {
      setList(data);
    }
  }, [getCoachProfile]);

  // const coachId = localStorage.coachId;

  useEffect(() => {
    let obj = {
      coachId: id,
    };
    // localStorage.setItem("coachId", data.coachId);
    dispatch(GetCoachProfileAction(obj));
  }, []);

  // const basicDetailHandler = () => {
  //     setShow({ ...defaultShow, basicDetail: true });
  //     dispatch(emptyUpdateProfileResponse());
  // };

  console.log("localStorage.coachId=>>>>>>", localStorage.coachId);

  const sidebarHandler = () => {
    setOpen(!open);
  };
  const bookingHandler = (id) => {
    let obj = {
      coachId: id,
    };

    dispatch(GetCoachProfileAction(obj));
    navigate("/booking");
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <div id="dashboard">
        <div className="dashboard_desc">
          <h1>Your Account Details</h1>
          {/* <p>{getCoachById?.address}</p> */}
        </div>
      </div>
      {/* <div className="dashboard_conatiner"> */}
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div class="col-auto px-0">
            <div
              id="sidebar"
              className="collapse collapse-horizontal show border-end"
              style={{ height: "100%" }}
            >
              <div
                id="sidebar-nav"
                className="list-group border-0 rounded-0 text-sm-start min-vh-100"
              >
                <a
                  className="list-group-item border-end-0 d-inline-block text-truncate"
                  data-bs-parent="#sidebar"
                >
                  {/* <img src={logo} alt="icon" /> */}
                  <img
                    style={{
                      height: "200px",
                      width: "200px",
                      borderRadius: "100px",
                    }}
                    src={data?.profileImage || logo}
                  />
                </a>
              </div>
            </div>
          </div>
          <main className="col ps-md-2 pt-2 right_sidebar">
            <a
              data-bs-target="#sidebar"
              data-bs-toggle="collapse"
              class="p-1 text-decoration-none"
              style={{ cursor: "pointer" }}
              onClick={sidebarHandler}
            >
              {open ? (
                <i className="fa fa-chevron-right bi-lg py-2 p-1"></i>
              ) : (
                <i className="fa fa-chevron-left bi-lg py-2 p-1"></i>
              )}
            </a>
            <div className="page-header pt-3" style={{ margin: "50px" }}>
              <div
                className="card col-12"
                style={{
                  background: "black",
                }}
              >
                <div
                  className="card-body col-12"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <p>coach name</p>
                    <h2>{data?.name}</h2>
                  </div>
                  <div>
                    <p>Price</p>
                    <h2>{data?.price}</h2>
                  </div>

                  <div style={{ width: "200px" }}>
                    <button
                      className="book_btn"
                      onClick={() => bookingHandler(data.coachId)}
                    >
                      Book Lesson
                    </button>
                  </div>
                </div>
              </div>
              <h1 style={{ marginTop: "20px" }}>About Me</h1>
              <div className="card" style={{ background: "black" }}>
                <div className="card-body">
                  <li>{data?.bio}</li>

                  {/* <p>{data?.address}</p> */}
                </div>
              </div>
              <div>
                <Location />
              </div>
              <div
                className="card col-sm- 12"
                style={{
                  background: "black",
                  height: "550px",
                }}
              >
                <Carousel
                  activeIndex={index}
                  onSelect={handleSelect}
                  style={{ height: "100%", width: "100%" }}
                >
                  {getCoachProfile?.data?.venueList?.length &&
                    getCoachProfile?.data?.venueList?.map((venue) => {
                      return (
                        <Carousel.Item
                          key={venue.id}
                          style={{ height: "500px", width: "100%" }}
                        >
                          {/* <div style={{ height: "500px", width: "100%" }}> */}
                          <img
                            style={{
                              position: "absolute",
                              display: "block",
                              height: "100%",
                              width: "100%",
                            }}
                            src={venue?.image}
                          />
                          {/* </div> */}
                          <Carousel.Caption>
                            <h3>{venue.name}</h3>
                          </Carousel.Caption>
                        </Carousel.Item>
                      );
                    })}
                </Carousel>

                {/* <div
                  id="carouselExampleControls"
                  class="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      {getCoachProfile?.data?.venueList?.length &&
                        getCoachProfile?.data?.venueList?.map((venue) => {
                          return (
                            <>
                              <img
                                src={venue?.image}
                                class="d-block w-100"
                                alt="..."
                              ></img>
                            </>
                          );
                        })}
                    </div>
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div> */}
              </div>
              <div className="card" style={{ background: "black" }}>
                {getCoachProfile?.data?.reviewList?.length &&
                  getCoachProfile?.data?.reviewList?.map((review) => {
                    return (
                      <div className="card" style={{ background: "#313131" }}>
                        <div className="card-body">
                          <p>{review?.studentName}</p>
                          <p>{review?.review}</p>

                          {/* <p>{data?.address}</p> */}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* < Bookings
                id={id} /> */}
    </>
  );
};

export default CoachProfileDetail;
