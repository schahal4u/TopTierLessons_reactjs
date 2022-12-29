import React, { useEffect } from "react";
import headerbg from "../assets/images/header-bg.png";
import "./Header.css";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const Header = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="header">
        <div className="header_content">
          <h1 className="header_main_text">
            SPORTS LESSONS FROM UNIVERSITY OF ILLINOIS 101 STUDENT ATHLETES{" "}
            <br />
          </h1>
        </div>
        <div className="header_btn">
          <button className="header_front_btn">
            <Link
              to="/coachSearch"
              style={{ textDecorationL: "none", color: "#fff" }}
            >
              Book Swimming Lesson
            </Link>
          </button>
          <br />
          <h3>All Sports Comming Soon</h3>
        </div>
        {/* <div className="card">
          <div style={{ display: "block", justifyContent: "space-between" }}>
            <button>Get Updates </button>
            <button>Name</button>
            <button>Email</button>
          </div>
        </div> */}

        <div
          className="container newsletter_form"
          style={{ marginTop: "200px" }}
        >
          <div className="row main_box ">
            <div className="col-md-3 form_box">
              <button className="newsletter_btn">Get Updates</button>
            </div>
            <div className="col-md-3 form_box">
              <input
                type="text"
                className="form-control newsletter_inp"
                placeholder="Name"
              />
            </div>
            <div className="col-md-3 form_box">
              <input
                type="text"
                className="form-control newsletter_inp"
                placeholder="Email"
              />
            </div>
          </div>
        </div>

        {/* <div className="container counter">
          <div className="row">
            <div className="col-md-3 col-sm-6 col-xs-6 counter_box mt-4">
              <CountUp start={0} end={12} delay={0}>
                {({ countUpRef }) => (
                  <div>
                    <span className="counter_icon" ref={countUpRef} />
                    <span className="counter_text">k+</span>
                  </div>
                )}
              </CountUp>
              <p className="counter_bottom_text">Lessons</p>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-6 counter_box mt-4">
              <CountUp start={0} end={16} delay={0}>
                {({ countUpRef }) => (
                  <div>
                    <span className="counter_icon" ref={countUpRef} />
                    <span className="counter_text">k+</span>
                  </div>
                )}
              </CountUp>
              <p className="counter_bottom_text">Practice Matches</p>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-6 counter_box mt-4">
              <CountUp start={0} end={105} delay={0}>
                {({ countUpRef }) => (
                  <div>
                    <span className="counter_icon" ref={countUpRef} />
                    <span className="counter_text">k+</span>
                  </div>
                )}
              </CountUp>
              <p className="counter_bottom_text">Coachs</p>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-6 counter_box mt-4">
              <CountUp start={0} end={123} delay={0}>
                {({ countUpRef }) => (
                  <div>
                    <span className="counter_icon" ref={countUpRef} />
                    <span className="counter_text">k+</span>
                  </div>
                )}
              </CountUp>
              <p className="counter_bottom_text">Students</p>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Header;
