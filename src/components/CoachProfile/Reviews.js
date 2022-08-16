import React, { useEffect } from "react";

const Reviews = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="reviews_container">
        <h1 style={{ textAlign: "left" }}>Reviews</h1>
        <div className="d-flex align-items-center py-2 mh-100 mt-2 mb-2">
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
        </div>
      </div>
    </>
  );
};

export default Reviews;
