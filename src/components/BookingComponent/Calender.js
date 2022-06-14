import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Booking.css";

const Calender = () => {
  const [value, onChange] = useState(new Date());
  console.log("val", value);

  return (
    <>
      <div className="calender">
        <div className="container calender_container">
          <div className="calender_form">
            <div className="calender_box">
              <h2 className="calender_header">Select Date and Time</h2>
              <Calendar onChange={onChange} value={value} />
              <div className="calender_cards">
                <div className="row_container">
                  <div className=" time_cards">
                    <p>10.00AM</p>
                  </div>
                  <div className=" time_cards">
                    <p>10.00AM</p>
                  </div>
                  <div className=" time_cards">
                    <p>10.00AM</p>
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

export default Calender;
