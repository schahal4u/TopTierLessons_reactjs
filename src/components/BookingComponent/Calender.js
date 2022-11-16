import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Booking.css";
import { useDispatch, useSelector } from "react-redux";
import { GetCoachSlotsAction } from "../../redux/actions/coach";
import { toast } from "react-toastify";

const Calender = ({ slotsBook, setSlotsBook }) => {
  const dispatch = useDispatch();

  const { getCoachSlots } = useSelector((state) => state.getAllCoachResponse);

  const res = getCoachSlots?.statusCode;
  const data = getCoachSlots?.data;

  const coachID = localStorage.coachId;
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState([]);

  // useEffect(() => {
  //   let obj = {
  //     coachId: coachID,
  //     date: value,
  //   };
  //   dispatch(GetCoachSlotsAction(obj));
  // }, [value]);

  const slotsList = (date) => {
    console.log("Date==>", date);
    setDate(date);
    let obj = {
      coachId: coachID,
      date: date,
    };
    dispatch(GetCoachSlotsAction(obj));
  };

  useEffect(() => {
    if (res == 200) setSlots(data);
    else if (res == 404) toast.warn("Slots are no Available.");
  }, [getCoachSlots]);

  const addedSlots = (user) => {
    let newObj = { ...user, date };
    let index = slotsBook.findIndex(
      (item) =>
        new Date(item.date).toDateString() ===
          new Date(newObj.date).toDateString() && item.slotId === user.slotId
    );
    if (index === -1) {
      setSlotsBook([...slotsBook, newObj]);
    } else {
      let copy = [...slotsBook];
      copy.splice(index, 1);
      setSlotsBook(copy);
    }
  };
  return (
    <>
      {/* <div className="calender">
        <div className="container calender_container">
          <div className="calender_form"> */}
      <div className="calender_box">
        <h2 className="calender_header">Select Date and Time</h2>
        <Calendar onChange={(value) => slotsList(value)} value={date} />
        <div className="calender_cards">
          <div className="row_container">
            {slots?.length &&
              slots?.map((user) => (
                <div onClick={() => addedSlots(user)} className="time_cards">
                  <p>{user?.entry}</p>
                </div>
              ))}
            {slots?.length == 0 && (
              <p className="no_records">No Records Found</p>
            )}
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
