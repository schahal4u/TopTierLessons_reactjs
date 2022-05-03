import React from "react";
import "./About.css";
import icon1 from "../../assets/images/AboutIcon1.png";
import icon2 from "../../assets/images/AboutIcon2.png";
import icon3 from "../../assets/images/AboutIcon3.png";
import team from "../../assets/images/team.png";
import Services from "../Services";

const About = () => {
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
      <div className="about_cards">
        <div className="container">
          <div className="row">
            <div className="col-md-7 about_box">
              <h1>About Us</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>
            <div className="col-md-5 about_box">
              <div className=" row col-md-12">
                <div className="col-md-2">
                  <img className="side_icon" src={icon1} alt="icon" />
                </div>
                <div className="col-md-10">
                  <p className="side_text">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </p>
                </div>
              </div>
              <div className=" row col-md-12">
                <div className="col-md-2">
                  <img className="side_icon" src={icon2} alt="icon" />
                </div>
                <div className="col-md-10">
                  <p className="side_text">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </p>
                </div>
              </div>
              <div className="row col-md-12">
                <div className="col-md-2">
                  <img className="side_icon" src={icon3} alt="icon" />
                </div>
                <div className="col-md-10">
                  <p className="side_text">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Teams  */}
      <div className="team">
        <p className="team_header">Get DEEP WITH US</p>
        <p className="team_desc">OUR TEAM</p>
        <div className="container">
          <div className="row">
            <div className="col-md-10 mx-auto">
              <div
                id="myCarousel"
                className="carousel slide"
                data-ride="carousel"
                data-interval="0"
              >
                {/* <!-- Wrapper for carousel items --> */}
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="row">
                      <div className="col-sm-12 col-md-12 col-lg-4">
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img src={team} className="img-fluid" alt="" />
                          </div>
                          <div className="thumb-content">
                            <h4>Jeane Jhin</h4>
                            <p className="team_card_desc">
                              Social media specialist New York, USA.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-4">
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img src={team} className="img-fluid" alt="" />
                          </div>
                          <div className="thumb-content">
                            <h4>Jeane Jhin</h4>
                            <p className="team_card_desc">
                              Social media specialist New York, USA.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-4">
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img src={team} className="img-fluid" alt="" />
                          </div>
                          <div className="thumb-content">
                            <h4>Jeane Jhin</h4>
                            <p className="team_card_desc">
                              Social media specialist New York, USA.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="row">
                      <div className="col-sm-12 col-md-12 col-lg-4">
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img src={team} className="img-fluid" alt="" />
                          </div>
                          <div className="thumb-content">
                            <h4>Jeane Jhin</h4>
                            <p className="team_card_desc">
                              Social media specialist New York, USA.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-4">
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img src={team} className="img-fluid" alt="" />
                          </div>
                          <div className="thumb-content">
                            <h4>Jeane Jhin</h4>
                            <p className="team_card_desc">
                              Social media specialist New York, USA.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-4">
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img src={team} className="img-fluid" alt="" />
                          </div>
                          <div className="thumb-content">
                            <h4>Jeane Jhin</h4>
                            <p className="team_card_desc">
                              Social media specialist New York, USA.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Carousel controls --> */}
                <a
                  className="carousel-control-prev"
                  href="#myCarousel"
                  data-slide="prev"
                >
                  <i className="fa fa-angle-left"></i>
                </a>
                <a
                  className="carousel-control-next"
                  href="#myCarousel"
                  data-slide="next"
                >
                  <i className="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Services />
      <div className="container-fluid line"></div>
    </>
  );
};

export default About;

