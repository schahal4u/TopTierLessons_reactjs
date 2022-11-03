import React, { useEffect } from "react";
import "./ContactUs.css";
import arrow from "../../assets/images/down.png";
import logo1 from "../../assets/images/logo1.png";
import logo3 from "../../assets/images/logo3.png";
import logo4 from "../../assets/images/logo4.png";
import logo5 from "../../assets/images/logo5.png";
import logo6 from "../../assets/images/logo6.png";
import Services from "../Services";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="contact">
        <div className="contact_header">
          <h1>
            Fill out the form and we will <br /> get back to you shortly
          </h1>
        </div>
      </div>

      <div className="container-fluid bg_form">
        <div className="container contact_form">
          <div className="row contact_box">
            <div className="col-md-7 form_box">
              <input
                type="text"
                className="form-control newsletter_inp"
                placeholder="Name"
              />
            </div>
            <div className="col-md-7 form_box">
              <input
                type="email"
                className="form-control newsletter_inp"
                placeholder="Email"
              />
            </div>
            <div className="col-md-7 form_box">
              <select class="form-select newsletter_select">
                <option selected>Subject</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <img className="set_arrow" src={arrow} alt="arrow" />
            </div>
            <div className="col-md-7 form_box">
              <textarea
                class="form-control newsletter_inp"
                placeholder="Comment"
                rows="3"
              ></textarea>
            </div>
            <div className="col-md-7 form_box">
              <button className="newsletter_btn">Submit</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid logos pb-5">
        <h2>Over 32k+ software businesses growing with Ar Shakir.</h2>
        <div
          className="row pb-5 pt-5"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="col-md-6 col-lg-2 text-center mt-4">
            <img src={logo1} alt="log" />
          </div>
          {/* <div className="col-md-2 text-center mt-4">
            <img src={logo2} alt="log" />
          </div> */}
          <div className="col-md-6 col-lg-2 text-center mt-4">
            <img src={logo3} alt="log" />
          </div>
          <div className="col-md-6 col-lg-2 text-center mt-4">
            <img src={logo4} alt="log" />
          </div>
          <div className="col-md-6 col-lg-2 text-center mt-4">
            <img src={logo5} alt="log" />
          </div>
          <div className="col-md-6 col-lg-2 text-center mt-4">
            <img src={logo6} alt="log" />
          </div>
        </div>
      </div>
      <div className="container-fluid bg_forms"></div>
      <Services />
      <div className="container-fluid line"></div>
    </>
  );
};

export default ContactUs;
