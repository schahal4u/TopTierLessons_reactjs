import React from "react";
import "./Games.css";
import footbal from "../assets/images/Football.png";
import vollyball from "../assets/images/Volleyball,.png";
import CrossCountry from "../assets/images/CrossCountry.png";
import Basketball from "../assets/images/Basketball.png";
import Golf from "../assets/images/Golf.png";
import Gymnastics from "../assets/images/Gymnastics.png";
import Soccer from "../assets/images/Soccer.png";
import Softball from "../assets/images/Softball.png";
import TrackField from "../assets/images/TrackField.png";
import Wrestling from "../assets/images/Wrestling.png";
import Swim from "../assets/images/Swim&Dive.png";

const Games = () => {
  return (
    <>
      <div className="games">
        {/* <p className="games_header">What you like to learn or teach</p> */}
        <p className="games_desc">Sports Offered</p>
        <div className="container">
          <div className="row">
            <div className="col-md-10 mx-auto">
              <div
                id="myCarousel"
                className="carousel slide"
                data-ride="carousel"
                data-interval="0"
              >
                {/* <!-- Carousel indicators --> */}
                <ol className="carousel-indicators">
                  <li
                    data-target="#myCarousel"
                    data-slide-to="0"
                    className="active"
                  ></li>
                  <li data-target="#myCarousel" data-slide-to="1"></li>
                  <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>
                {/* <!-- Wrapper for carousel items --> */}
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img src={footbal} className="img-fluid" alt="" />
                          </div>
                          <div className="thumb-content">
                            <h4>Football</h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img src={vollyball} className="img-fluid" alt="" />
                          </div>
                          <div className="thumb-content">
                            <h4>Volleyball</h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img
                              src={CrossCountry}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                          <div className="thumb-content">
                            <h4>Cross Country</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img
                              src={Basketball}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                          <div className="thumb-content">
                            <h4>Basketball</h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img src={Golf} className="img-fluid" alt="" />
                          </div>
                          <div className="thumb-content">
                            <h4>Golf</h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img
                              src={Gymnastics}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                          <div className="thumb-content">
                            <h4>Gymnastics</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img src={Soccer} className="img-fluid" alt="" />
                          </div>
                          <div className="thumb-content">
                            <h4>Soccer</h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img src={vollyball} className="img-fluid" alt="" />
                          </div>
                          <div className="thumb-content">
                            <h4>Volleyball</h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img src={Softball} className="img-fluid" alt="" />
                          </div>
                          <div className="thumb-content">
                            <h4>Softball</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img
                              src={TrackField}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                          <div className="thumb-content">
                            <h4>Track and Field</h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img src={Wrestling} className="img-fluid" alt="" />
                          </div>
                          <div className="thumb-content">
                            <h4>Wrestling</h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img src={Swim} className="img-fluid" alt="" />
                          </div>
                          <div className="thumb-content">
                            <h4>Swim & Dive</h4>
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
    </>
  );
};

export default Games;
