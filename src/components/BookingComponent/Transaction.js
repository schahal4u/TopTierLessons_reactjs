import React, { useEffect, useState } from "react";
import success from "../../assets/images/success.png";
import { useLocation } from "react-router-dom";
import { CapturePaymentAction } from "../../redux/actions/CapturePayment";
import { useDispatch, useSelector } from "react-redux";
const Transaction = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(false);
  const { capturePayment } = useSelector(
    (state) => state.capturePaymentResponse
  );
  const capturePayload = {
    token: location.search.split("&")[0].split("=")[1],
    payerId: location.search.split("&")[1].split("=")[1],
  };
  console.log("capturePayment==>", capturePayment);
  useEffect(() => {
    if (location) dispatch(CapturePaymentAction(capturePayload));
  }, [location]);

  useEffect(() => {
    if (capturePayment?.statusCode === 200) {
      setPage(true);
    }
  }, [capturePayment]);

  return (
    <div className="bookings">
      <div className="container bookings_container">
        <div className="bookings_form d-flex justify-content-center align-items-center">
          {page ? (
            <div className="success_container">
              <img src={success} alt="" />
              <h2>SUCCESS</h2>
              <h4>
                Thank you for your booking request. <br /> We are working hard
                to find the best service and deals for <br /> you.
              </h4>
              <h6>Shortly you will find a confirmation in your email.</h6>
              <button className="success_bttn mt-5">Go Back Home</button>
            </div>
          ) : (
            <div className="success_container">
              <img src={success} alt="" />
              <h2>Something Went Wrong !</h2>
              <h4>
                Sorry for your booking request. <br /> Because your payment has
                been canceled.
              </h4>
              <h6>Shortly you will find a confirmation in your email.</h6>
              <button className="success_bttn mt-5">Go Back Home</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
