import React, { useEffect, useState } from "react";
import "./CoachSearch.css";
import line from "../../assets/images/line.png";
import filter from "../../assets/images/filter.png";
import search from "../../assets/images/search.png";
import team from "../../assets/images/team.png";
import star from "../../assets/images/Star 1.png";
import map from "../../assets/images/map-pin.png";
import dot from "../../assets/images/dot.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCoachByIdAction,
  GetCoachProfileAction,
} from "../../redux/actions/coach";
import { emptyProfileImageResponse } from "../../redux/actions/UploadPhoto";

const CoachSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getCoachById } = useSelector((state) => state.getAllCoachResponse);
  const data = getCoachById?.data;
  const response = getCoachById?.statusCode;

  const sportId = localStorage.sportsId;

  const [list, setList] = useState([]);
  // console.log("data", list);

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

  const bookingHandler = () => {
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
  return (
    <>
      <div className="search">
        <div className="search_desc">
          <h1>Search For Coaches</h1>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 search_container">
            <div style={{ position: "relative" }} className="mt-5 ">
              <input
                type="text"
                className="form-control search_inp mt-3"
                placeholder="Search for lessons"
              />
              <img src={search} className="search_icon" alt="search" />
              <img src={line} className="line_icon" alt="line" />
              <img src={filter} className="filter_icon" alt="filter" />
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
                            <h3>$ 100</h3>
                          </div>
                        </div>
                        <div className="col-md-5 pb-4 pl-4 startPhoto_text ">
                          <img src={star} alt="star" className="icon_padding" />
                          <span className="startext">4.5/5 (11Total)</span>
                        </div>
                        <div className="col-md-1 text-right pb-4 start_line">
                          <img src={line} alt="" />
                        </div>
                        <div className="col-md-6 pb-4 starPhoto_text">
                          <img src={map} alt="map" className="icon_padding" />
                          <span className="maptext">Washington DC</span>
                        </div>
                        <hr className="center_hr" />
                        <div className="col-md-1 col-sm-12 pl-5">
                          <img src={dot} alt="" className="dotImg" />
                        </div>
                        <div className="col-md-10 col-sm-12">
                          <h6 className="dot_text">
                            USPTA Certified with 10 years of experience
                          </h6>
                        </div>
                        <div className="col-md-1 pl-5">
                          <img src={dot} alt="" className="dotImg" />
                        </div>
                        <div className="col-md-10">
                          <h6 className="dot_text">
                            Teach people of all ages/levels
                          </h6>
                        </div>
                        <button className="book_btn" onClick={bookingHandler}>
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
    </>
  );
};

export default CoachSearch;
