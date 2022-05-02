import React from "react";
import "./Services.css";

const Services = () => {
  return (
    <>
      <div className="about">
        <div className="about_content">
          <h1 className="about_header ">
            Who We are, Explore Our <br /> Mission & Vision
          </h1>
        </div>
      </div>
      <div className="container newsletter_form">
        <div className="row main_box ">
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
          <div className="col-md-3 form_box">
            <button className="newsletter_btn">Suscribe Our Newsletter</button>
          </div>
        </div>
      </div>
      <div className="container-fluid dark_bg"></div>
    </>
  );
};

export default Services;
