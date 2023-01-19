import React, { useEffect, useState } from "react";
import "./BookingDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetAllBookingDetailsByIdAction } from "../../redux/actions/GetAllBookingAction";

const BookingDetails = () => {
  const token = localStorage?.userData;
  let parsing = token ? JSON.parse(localStorage?.userData) : null;
  let usertype = parsing?.userType || null;

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
  console.log("weeekkkkkdaysssss ", userData?.coachImage)

  // console.warn('bookingDetails=========', bookingDetails);
  return (
    <div
      style={{ background: "#333232", }}
      className="pt-5">


      <div className="card" style={{ width: "50%", display: "flex", justifyContent: "center" }}>
        <div className="col-sm-1">
          {usertype === 2 ? (<img
            className="card-img-top img-fluid"
            src={userData?.studentImage}
            alt="Card image cap"
          />) : (<img
            className="card-img-top img-fluid"
            src={userData?.coachImage}
            alt="Card image cap"
          />)}


        </div>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
        <div className="card-body">
          <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a>
        </div>
      </div>






      <div className="container-fluid ">
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
                  {usertype === 2 ? (<img
                    className="card-img-top img-fluid"
                    src={userData?.studentImage}
                    alt="Card image cap"
                  />) : (<img
                    className="card-img-top img-fluid"
                    src={userData?.coachImage}
                    alt="Card image cap"
                  />)}


                </div>
                <div
                  className="col-sm-2 "
                  style={{ borderLeft: "1px solid #575757" }}
                >
                  <h3> Name</h3>
                  {usertype === 2 ? (<h4>{userData?.studentName}</h4>) : (<h4>{userData?.coachName}</h4>)}

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
