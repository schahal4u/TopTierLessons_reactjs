import React, { useState } from "react";
import BasicDetail from "./BasicDetail";
import { useDispatch, useSelector } from "react-redux";
import "./Booking.css";
import Calender from "./Calender";
import ContactInfo from "./ContactInfo";
import Payment from "./Payment";
import Success from "./Success";

const Bookings = () => {
  const [step, setStep] = useState(1);
  const [slots, setSlots] = useState([]);

  const { getCoachSlots } = useSelector((state) => state.getAllCoachResponse);

  const [formData, setFormData] = useState();

  const handleFormData = (e) => {
    console.log(e);
  };

  const RenderUI = () => {
    switch (step) {
      case 1:
        return <Calender />;
      case 2:
        return <BasicDetail />;
      case 3:
        return <ContactInfo handleFormData={handleFormData} />;
      case 4:
        return <Payment />;
      case 5:
        return <Success />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bookings">
        <div className="container bookings_container">
          <div className="booking_bars_container">
            <div className="booking_bars_active"></div>
            <div
              className={step > 1 ? "booking_bars_active" : "booking_bars"}
            ></div>
            <div
              className={step > 2 ? "booking_bars_active" : "booking_bars"}
            ></div>
            <div
              className={step > 3 ? "booking_bars_active" : "booking_bars"}
            ></div>
          </div>
          <div className="bookings_form">
            <RenderUI />
            <div className="booking_buttons">
              {step > 1 && (
                <button
                  className="back_btnn me-4"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </button>
              )}
              {step < 4 && (
                <button
                  className="booking_bttn"
                  onClick={() => setStep(step + 1)}
                >
                  Next
                </button>
              )}
              {step == 4 && <button className="booking_bttn">Confirm</button>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
