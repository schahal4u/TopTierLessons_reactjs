import React from "react";
import success from "../../assets/images/success.png";

const Transaction = () => {
  return (
    <div className="bookings">
      <div className="container bookings_container">
        <div className="bookings_form d-flex justify-content-center align-items-center">
          <div className="success_container">
            <img src={success} alt="" />
            <h2>SUCCESS</h2>
            <h4>
              Thank you for your booking request. <br /> We are working hard to
              find the best service and deals for <br /> you.
            </h4>
            <h6>Shortly you will find a confirmation in your email.</h6>
            <button className="success_bttn mt-5">Go Back Home</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
