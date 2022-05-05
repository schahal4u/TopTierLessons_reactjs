import React from "react";
import "./Services.css";
import bar from "../assets/images/top.png";
import main1 from "../assets/images/main1.png";
import main2 from "../assets/images/main2.png";
import main3 from "../assets/images/main3.png";
import main4 from "../assets/images/main4.png";
import main5 from "../assets/images/main5.png";
import main6 from "../assets/images/main6.png";

const Services = () => {
  return (
    <>
      <div className="services">
        <div className="container sercices_card">
          <div className="row">
            <div className="allIcons">
              <div className="main1">
                <img src={main1} alt="icon" />
              </div>
              <div className="main2">
                <img src={main2} alt="icon" />
              </div>
              <div className="main3">
                <img src={main3} alt="icon" />
              </div>
              <div className="main4">
                <img src={main4} alt="icon" />
              </div>
              <div className="main5">
                <img src={main5} alt="icon" />
              </div>
              <div className="main6">
                <img src={main6} alt="icon" />
              </div>
            </div>
            <div className="col-md-6 mt-5 services_cards">
              <div className="services_desc">
                <h1>
                  Sign up and <br /> Book a Lesson <br /> Today!
                </h1>
              </div>
            </div>
            <div className="col-md-6 services_descc">
              <div className="signup_form">
                <form>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control signup_inp "
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-3 mt-5">
                    <input
                      type="email"
                      className="form-control signup_inp mt-3"
                      placeholder="Email"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary signup_btn mt-4 mb-4"
                  >
                    Sign Up
                  </button>
                  <div className="topbar">
                    <img src={bar} alt="bar" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
