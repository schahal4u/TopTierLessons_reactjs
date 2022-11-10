import React from "react";
import success from "../../assets/images/success.png";

const Rejection = () => {
  return (
    <div className="bookings">
      <div className="container bookings_container">
        <div className="bookings_form d-flex justify-content-center align-items-center">
          <div className="success_container">
            <img src={success} alt="" />
            <h2>Failed</h2>
            <h4>
              Sorry for your booking request. <br /> Because your payment has
              been canceled.
            </h4>
            <h6>Shortly you will find a confirmation in your email.</h6>
            <button className="success_bttn mt-5">Go Back Home</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rejection;
