import React, { useEffect, useState } from "react";
import "./BookingDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetAllBookingDetailsByIdAction } from "../../redux/actions/GetAllBookingAction";

const BookingDetails = () => {

  const { getAllBookingDetailsById } = useSelector((state) => state.getAllBookingDetailsById);
  const dispatch = useDispatch();

  const userData = getAllBookingDetailsById?.data;


  const defautFormData = {

    bookingId: 0,

  };

  const { id } = useParams();
  console.log("id=>>>>>>>>", id)
  const [formData, setFormData] = useState(defautFormData);
  useEffect(() => {
    if (id) {
      let obj = {
        bookingId: +id,
      }
      dispatch(GetAllBookingDetailsByIdAction(obj))
    }
  }, [id])

  // console.log("obj=>>>>>>>>", obj)

  // let dateupdate = new Date(
  //     Details.bookingDate
  // ).toLocaleDateString();
  console.log("weeekkkkkdaysssss ", userData?.slotsList?.data?.slotId)

  // console.warn('bookingDetails=========', bookingDetails);
  return (
    <div style={{ background: "#333232", height: "100vh" }} className="pt-5">

      <div className="fluid Container ">
        <div className="card col-sm-12 bookingcard ">
          <div className="card-body">
            <div className="row ">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <div className="col-sm-1">
                  <img
                    className="card-img-top img-fluid"
                    src="..."
                    alt="Card image cap"
                  />
                </div>
                <div
                  className="col-sm-2 "
                  style={{ borderLeft: "1px solid #575757" }}
                >
                  <h3> Name</h3>

                  <h4>{userData?.studentName}</h4>
                </div>
                <div
                  className="col-sm-2"
                  style={{ borderLeft: "1px solid #575757" }}
                >
                  <h3 className="card-text">contact</h3>
                  <h4>{userData?.phone}</h4>
                </div>
                <div
                  className="col-sm-3"
                  style={{ borderLeft: "1px solid #575757" }}
                >
                  <h3 className="card-text">Email</h3>
                  <h4>{userData?.email}</h4>
                </div>
                <div
                  className="col-sm-2"
                  style={{ borderLeft: "1px solid #575757" }}
                >
                  <h3 className="card-text">addFriend</h3>
                  <h4>{userData?.addFriend}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card col-sm-12 bookingcard mt-5">
          <div className="card-body">
            <div className="row ">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <div className="col-sm-1">
                  <h3> sports</h3>
                  <h4 >{userData?.sportName}</h4>
                </div>
                <div
                  className="col-sm-2 "
                  style={{ borderLeft: "1px solid #575757" }}
                >
                  <h3> location</h3>
                  <h4>{userData?.location}</h4>
                </div>
                <div
                  className="col-sm-2"
                  style={{ borderLeft: "1px solid #575757" }}
                >
                  <h3 className="card-text">payment</h3>
                  <h4>{userData?.paymentStatus}</h4>
                </div>
                <div
                  className="col-sm-3"
                  style={{ borderLeft: "1px solid #575757" }}
                >
                  <h3 className="card-text">days</h3>
                  <h4 style={{
                    display: "flex",
                    justifyContent: "space-evenly"
                  }}>{userData?.slotsList[0]?.weekDays?.map((item, i) => {
                    return (
                      <div
                        key={i}>

                        {item === "1" && <h4>Mon</h4>}
                        {item === "2" && <h4>Tue</h4>}
                        {item === "3" && <h4>Wed</h4>}
                        {item === "4" && <h4>Thur</h4>}
                        {item === "5" && <h4>Fri</h4>}
                        {item === "6" && <h4>Sat</h4>}
                        {item === "7" && <h4>Sun</h4>}

                      </div>
                    );
                  })}</h4>
                </div>
                <div
                  className="col-sm-2"
                  style={{ borderLeft: "1px solid #575757" }}
                >
                  <h3 className="card-text">time</h3>
                  <h4>{userData?.slotsList[0]?.time}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingDetails;
