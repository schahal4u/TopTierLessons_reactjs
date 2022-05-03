import React from "react";
import "./Review.css";

const Reviews = () => {
  return (
    <>
      <div className="reviews">
        <p className="review_header">Clients</p>
        <p className="review_desc">REVIEWS</p>
        {/* start */}
        <div className="d-flex align-items-center py-5 mh-100 mt-5 mb-5">
          <a
            className="carousel-control-prev text-decoration-none "
            href="#mycarousel"
            role="button"
            data-bs-slide="prev"
          >
            <div className="d-flex flex-column justify-content-center me-2 ms-auto left">
              PREV<span className="fas fa-arrow-left"></span>{" "}
            </div>
            <span className="sr-only">Previous</span>
          </a>
          <div className="container reviewcontainer">
            <div
              id="mycarousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-bs-target="#mycarousel"
                  data-bs-slide-to="0"
                  className="active"
                ></li>
                <li data-bs-target="#mycarousel" data-bs-slide-to="1"></li>
                <li data-bs-target="#mycarousel" data-bs-slide-to="2"></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row">
                    <div className="col-lg-6 ">
                      <img
                        src="https://images.pexels.com/photos/8052808/pexels-photo-8052808.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                    <div className="col-lg-6 ">
                      <div className=" d-flex flex-column justify-content-center my-5 px-3">
                        <p className="review text-center">
                          "Incredible services and amazing customer support"
                        </p>
                        <div className="name d-flex align-items-center justify-content-center">
                          {/* <span className="fas fa-minus pe-1"></span> */}
                          <p className="m-0">Joy Smith</p>
                        </div>
                        <p className="job text-center">Project Manager</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-lg-6 ">
                      <img
                        src="https://images.pexels.com/photos/8052808/pexels-photo-8052808.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                    <div className="col-lg-6 ">
                      <div className=" d-flex flex-column justify-content-center my-5 px-3">
                        <p className="review text-center">
                          "Incredible services and amazing customer support"
                        </p>
                        <div className="name d-flex align-items-center justify-content-center">
                          {/* <span className="fas fa-minus pe-1"></span> */}
                          <p className="m-0">Joy Smith</p>
                        </div>
                        <p className="job text-center">Project Manager</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-lg-6 ">
                      <img
                        src="https://images.pexels.com/photos/8052808/pexels-photo-8052808.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        className="d-block w-100"
                        alt="... "
                      />
                    </div>
                    <div className="col-lg-6 ">
                      <div className=" d-flex flex-column justify-content-center my-5 px-3">
                        <p className="review text-center">
                          "Incredible services and amazing customer support"
                        </p>
                        <div className="name d-flex align-items-center justify-content-center">
                          {/* <a className="fa fa-minus pe-1"></a> */}
                          <p className="m-0">Joy Smith</p>
                        </div>
                        <p className="job text-center">Project Manager</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-next text-decoration-none "
            href="#mycarousel"
            role="button"
            data-bs-slide="next"
          >
            <div className="d-flex flex-column justify-content-center right ms-2 me-auto">
              <i className="fa fa-angle-right"></i>
            </div>
            <span className="sr-only">Next</span>
          </a>
        </div>
        {/* end */}
      </div>
    </>
  );
};

export default Reviews;
