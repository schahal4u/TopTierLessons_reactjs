import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="container-fluid footer mt-auto">
        <div className="footer-content">
          <div className="footer_header">
            <h2>TOP TIER LESSONS</h2>
          </div>
          <div className="footer_desc">
            <p>
              Top Tier Lessons is an online platform designed to <br /> help
              student athletes teach lessons in the community.
            </p>
          </div>
        </div>
        <div className="container mt-5 ">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-md-3 col-lg-2 col-xs-4 footer_links">
              <p>Parents</p>
            </div>
            <div className="col-md-3 col-lg-2  col-xs-4 footer_links">
              <p>Student Athletes</p>
            </div>
            <div className="col-md-3  col-lg-1 col-xs-4 footer_links">
              <p>Blog</p>
            </div>
            <div className="col-md-3 col-lg-2 col-xs-4 footer_links">
              <p>Terms & Conditions</p>
            </div>
            <div className="col-md-3 col-lg-1 col-xs-4 footer_links">
              <p>Contact</p>
            </div>
            <div className="col-md-3 col-lg-2 col-xs-4 footer_links">
              <Link to="/privacy" className="underline_text">
                <p>Privacy Policy</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="container mt-4">
          <div
            className="row footer_icons"
            style={{ justifyContent: "center" }}
          >
            <div className="col-md-1 col-xs-3 col-sm-3  footer_links">
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </div>
            <div className="col-md-1 col-xs-3 col-sm-3 footer_links">
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </div>
            <div className="col-md-1 col-xs-3 col-sm-3 footer_links">
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </div>
            <div className="col-md-1 col-xs-3 col-sm-3 footer_links">
              <i className="fa fa-linkedin" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
