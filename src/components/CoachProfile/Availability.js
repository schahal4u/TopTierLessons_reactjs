import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { GetCoachSlotsAction } from "../../redux/actions/coach";

const Availability = () => {
  const dispatch = useDispatch();

  const { getCoachSlots } = useSelector((state) => state.getAllCoachResponse);
  const res = getCoachSlots?.statusCode;
  const data = getCoachSlots?.data;

  console.log("eeee", data);
  const coachID = localStorage.coachId;

  const [value, onChange] = useState(new Date());
  const [slots, setSlots] = useState([]);
  console.log("val", slots);

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

  // useEffect(() => {
  //   onChange("");
  //   setSlots("");
  // }, []);

  return (
    <>
      <div className="avialability_container">
        <h1 style={{ marginLeft: "20px", marginBottom: "40px" }}>
          Availability
        </h1>
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
    </>
  );
};

export default Availability;
