import React, { useState } from "react";
import Calendar from "react-calendar";

const Availability = () => {
  const [value, onChange] = useState(new Date());
  console.log("val", value);

  return (
    <>
      <div className="avialability_container">
        <h1 style={{ marginLeft: "20px", marginBottom: "40px" }}>
          Availability
        </h1>
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
      {/* </div> */}
    </>
  );
};

export default Availability;
