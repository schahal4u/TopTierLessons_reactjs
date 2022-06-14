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
            TOP TIER COACHES FOR TOP TIER <br /> ATHLETES
          </h1>
        </div>
        <div className="header_btn">
          <button className="header_front_btn">
            <Link
              to="/coachSearch"
              style={{ textDecorationL: "none", color: "#fff" }}
            >
              Find Lessons
            </Link>
          </button>
          <button className="header_front_btn">I'm a Student Athlete</button>
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
