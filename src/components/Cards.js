import React from "react";
import "./Cards.css";
import icon1 from "../assets/images/icon1.png";
import icon2 from "../assets/images/icon2.png";
import icon3 from "../assets/images/icon3.png";

const Cards = () => {
  return (
    <>
      <div
        className="container-fluid cards"
        style={{ padding: "0px 0px 200px 0px !important" }}
      >
        <p className="cards_header"></p>
        <p className="cards_desc">What We Do</p>
        <div className="container">
          <div
            className="row  p-3"
            style={{
              justifyContent: "center",
              marginTop: "60px",
              // border: "1px solid #fff",
            }}
          >
            <div className="col-md-3 col-sm-12 card_box p-4 mt-5">
              <div className="card_box_content">
                <div className="title">
                  <h3>Lessons</h3>
                </div>
                <div className="desc">
                  <p>
                    Take the step to the next level with our top-tier lessons
                    taught by current student athletes
                  </p>
                </div>
              </div>
              <div className="card_icon">
                <img src={icon1} alt="icon" />
              </div>
            </div>
            <div className="col-md-3 col-sm-12 card_box p-4 mt-5">
              <div className="card_box_content">
                <div className="title">
                  <h3>Practice Matches</h3>
                </div>
                <div className="desc">
                  <p>
                    Take the step to the next level with our top-tier lessons
                    taught by current student athletes
                  </p>
                </div>
              </div>
              <div className="card_icon">
                <img src={icon2} alt="icon" />
              </div>
            </div>
            <div className="col-md-3 col-sm-12 card_box p-4 mt-5">
              <div className="card_box_content">
                <div className="title">
                  <h3>Video Coaching</h3>
                </div>
                <div className="desc">
                  <p>
                    Take the step to the next level with our top-tier lessons
                    taught by current student athletes
                  </p>
                </div>
              </div>
              <div className="card_icon">
                <img src={icon3} alt="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
