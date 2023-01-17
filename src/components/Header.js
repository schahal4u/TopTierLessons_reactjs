import React, { useState, useEffect } from "react";
import headerbg from "../assets/images/header-bg.png";
import "./Header.css";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Modal } from "bootstrap";
import { Slider } from "@mui/material";
import FilterModal from "./Modal/FilterModal";
import { useDispatch, useSelector } from "react-redux";
import { GetAllSportsAction } from "../redux/actions/GetAllSports";

const Header = () => {
  let defaultForm = {
    venueId: "",
    sportId: "",
  };

  const { getAllSports } = useSelector((state) => state.getAllSportsResponse);

  const [text, setText] = useState("");
  const [formData, setFormData] = useState(defaultForm);
  const [show, setShow] = useState(false);
  const [fullText, setFullText] = useState(
    "Sports lessons from university of illinois 101 student athletes"
  );
  const [index, setIndex] = useState(0);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 40);
    }
  }, [index]);

  const bookLessonHandler = () => {
    setShow(true);
  };
  const closehandler = () => {
    setShow(false);
  };

  const submitHandler = () => {
    alert("submit");
  };
  const onHide = () => {
    setShow(false);
  };

  return (
    <>
      {show && (
        <FilterModal
          show={show}
          onHide={onHide}
          // validated={validated}
          setShow={setShow}
          formData={formData}
          getAllSports={getAllSports}
          handleFormData={handleFormData}
          submitHandler={submitHandler}
        />
      )}

      <div className="header">
        <div className="header_content">
          <h5 className="header_main_text">
            {text}
            <br />
          </h5>
        </div>
        <div className="header_btn">
          <button
            className="header_front_btn"
            onClick={() => bookLessonHandler()}
          >
            Book Swimming Lesson
            {/* <Link
              to="/coachSearch"
              style={{ textDecorationL: "none", color: "#fff" }}
            >
              Book Swimming Lesson
            </Link> */}
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
