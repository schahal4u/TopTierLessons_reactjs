import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Booking.css";
import { useDispatch, useSelector } from "react-redux";
import { GetCoachSlotsAction } from "../../redux/actions/coach";

const Calender = () => {
  const dispatch = useDispatch();

  const { getCoachSlots } = useSelector((state) => state.getAllCoachResponse);
  const res = getCoachSlots?.statusCode;
  const data = getCoachSlots?.data;

  console.log("eeee", data);
  const coachID = localStorage.coachId;

  const [value, onChange] = useState(new Date());
  const [slots, setSlots] = useState([]);
  useEffect(() => {
    let obj = {
      coachId: coachID,
      date: value,
    };
    dispatch(GetCoachSlotsAction(obj));
  }, [value]);

  useEffect(() => {
    if (res == 200) setSlots(data);
  }, [getCoachSlots]);
  // console.log("val", value);

  return (
    <>
      {/* <div className="calender">
        <div className="container calender_container">
          <div className="calender_form"> */}
      <div className="calender_box">
        <h2 className="calender_header">Select Date and Time</h2>
        <Calendar onChange={onChange} value={value} />
        <div className="calender_cards">
          <div className="row_container">
            {slots?.length &&
              slots?.map((user) => (
                <div className=" time_cards">
                  <p>{user?.entry}</p>
                </div>
              ))}
            {slots?.length == 0 && <p>No Records Found</p>}
          </div>
        </div>
      </div>
      {/* </div>
        </div>
      </div> */}
    </>
  );
};

export default Calender;
