import React from "react";
import "./CoachSearch.css";
import line from "../../assets/images/line.png";
import filter from "../../assets/images/filter.png";
import search from "../../assets/images/search.png";
import team from "../../assets/images/team.png";
import star from "../../assets/images/Star 1.png";
import map from "../../assets/images/map-pin.png";
import dot from "../../assets/images/dot.png";
import { useNavigate } from "react-router-dom";

const CoachSearch = () => {
  const navigate = useNavigate();

  const bookingHandler = () => {
    navigate("booking");
  };
  return (
    <>
      <div className="search">
        <div className="search_desc">
          <h1>Search For Coachs</h1>
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
                <div
                  className="row"
                  style={{
                    justifyContent: "space-between",
                  }}
                >
                  <div className="col-md-3 col-lg-3 cards_box mb-5">
                    <div className="row">
                      <div className="col-md-5 p-4 pl-4">
                        <div
                          className="pic_side"
                          style={{ textAlign: "center" }}
                        >
                          <img src={team} alt="team" height="125px" />
                        </div>
                      </div>
                      <div
                        className="col-md-7 p-4"
                        style={{ textAlign: "left" }}
                      >
                        <div className="text_side">
                          <h2>John Doe</h2>
                          <h3>$ 100</h3>
                        </div>
                      </div>
                      <div className="col-md-5 pb-4 pl-4 ">
                        <img src={star} alt="star" className="icon_padding" />
                        <span className="startext">4.5/5 (11total)</span>
                      </div>
                      <div className="col-md-1 text-right pb-4">
                        <img src={line} alt="" />
                      </div>
                      <div className="col-md-6 pb-4">
                        <img src={map} alt="map" className="icon_padding" />
                        <span className="maptext">Washington DC</span>
                      </div>
                      <hr className="center_hr" />
                      <div className="col-md-1 pl-5">
                        <img src={dot} alt="" className="dotImg" />
                      </div>
                      <div className="col-md-10">
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
                      <div className="col-md-1 pl-5">
                        <img src={dot} alt="" className="dotImg" />
                      </div>
                      <div className="col-md-10">
                        <h6 className="dot_text">
                          Encouraging, patient, motivating style
                        </h6>
                      </div>
                      <button className="book_btn" onClick={bookingHandler}>
                        Book Lesson
                      </button>
                    </div>
                  </div>
                  <div className="col-md-3 col-lg-3 cards_box mb-5">
                    <div className="row">
                      <div className="col-md-5 p-4 pl-4">
                        <div
                          className="pic_side"
                          style={{ textAlign: "center" }}
                        >
                          <img src={team} alt="team" height="125px" />
                        </div>
                      </div>
                      <div
                        className="col-md-7 p-4"
                        style={{ textAlign: "left" }}
                      >
                        <div className="text_side">
                          <h2>John Doe</h2>
                          <h3>$ 100</h3>
                        </div>
                      </div>
                      <div className="col-md-5 pb-4 pl-4 ">
                        <img src={star} alt="star" className="icon_padding" />
                        <span className="startext">4.5/5 (11total)</span>
                      </div>
                      <div className="col-md-1 text-right pb-4">
                        <img src={line} alt="" />
                      </div>
                      <div className="col-md-6 pb-4">
                        <img src={map} alt="map" className="icon_padding" />
                        <span className="maptext">Washington DC</span>
                      </div>
                      <hr className="center_hr" />
                      <div className="col-md-1 pl-5">
                        <img src={dot} alt="" className="dotImg" />
                      </div>
                      <div className="col-md-10">
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
                      <div className="col-md-1 pl-5">
                        <img src={dot} alt="" className="dotImg" />
                      </div>
                      <div className="col-md-10">
                        <h6 className="dot_text">
                          Encouraging, patient, motivating style
                        </h6>
                      </div>
                      <button className="book_btn" onClick={bookingHandler}>
                        Book Lesson
                      </button>
                    </div>
                  </div>
                  <div className="col-md-3 col-lg-3 cards_box mb-5">
                    <div className="row">
                      <div className="col-md-5 p-4 pl-4">
                        <div
                          className="pic_side"
                          style={{ textAlign: "center" }}
                        >
                          <img src={team} alt="team" height="125px" />
                        </div>
                      </div>
                      <div
                        className="col-md-7 p-4"
                        style={{ textAlign: "left" }}
                      >
                        <div className="text_side">
                          <h2>John Doe</h2>
                          <h3>$ 100</h3>
                        </div>
                      </div>
                      <div className="col-md-5 pb-4 pl-4 ">
                        <img src={star} alt="star" className="icon_padding" />
                        <span className="startext">4.5/5 (11total)</span>
                      </div>
                      <div className="col-md-1 text-right pb-4">
                        <img src={line} alt="" />
                      </div>
                      <div className="col-md-6 pb-4">
                        <img src={map} alt="map" className="icon_padding" />
                        <span className="maptext">Washington DC</span>
                      </div>
                      <hr className="center_hr" />
                      <div className="col-md-1 pl-5">
                        <img src={dot} alt="" className="dotImg" />
                      </div>
                      <div className="col-md-10">
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
                      <div className="col-md-1 pl-5">
                        <img src={dot} alt="" className="dotImg" />
                      </div>
                      <div className="col-md-10">
                        <h6 className="dot_text">
                          Encouraging, patient, motivating style
                        </h6>
                      </div>
                      <button className="book_btn" onClick={bookingHandler}>
                        Book Lesson
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
          {/* <div className="col-md-4 map_container">
            <h1>Map Container</h1>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CoachSearch;
