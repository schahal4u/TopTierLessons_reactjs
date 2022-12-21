import React from "react";
import "./BookingDetail.css";
import { useNavigate } from "react-router-dom";

const BookingDetails = () => {
  // const history = useHistory();
  const navigate = useNavigate();

  // let dateupdate = new Date(
  //     Details.bookingDate
  // ).toLocaleDateString();
  // console.log("date ", dateupdate)

  // console.warn('bookingDetails=========', bookingDetails);
  return (
    <div style={{ background: "#333232", height: "100vh" }} className="pt-5">
      <button> Back </button>
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
                  <p> Name</p>

                  {/* <h3>{Details?.studentName}</h3> */}
                </div>
                <div
                  className="col-sm-2"
                  style={{ borderLeft: "1px solid #575757" }}
                >
                  <p className="card-text">contact</p>
                  {/* <h3>{Details?.phone}</h3> */}
                </div>
                <div
                  className="col-sm-3"
                  style={{ borderLeft: "1px solid #575757" }}
                >
                  <p className="card-text">Email</p>
                  {/* <h3>{Details?.email}</h3> */}
                </div>
                <div
                  className="col-sm-2"
                  style={{ borderLeft: "1px solid #575757" }}
                >
                  <p className="card-text">BookingID</p>
                  {/* <h3>{Details.bookingId}</h3> */}
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
                  <p> sports</p>
                  {/* <h3 >{Details?.sportName}</h3> */}
                </div>
                <div
                  className="col-sm-2 "
                  style={{ borderLeft: "1px solid #575757" }}
                >
                  <p> date</p>
                  {/* <h3>{dateupdate}</h3> */}
                </div>
                <div
                  className="col-sm-2"
                  style={{ borderLeft: "1px solid #575757" }}
                >
                  <p className="card-text">payment</p>
                  {/* <h3>{Details?.paymentStatus}</h3> */}
                </div>
                <div
                  className="col-sm-3"
                  style={{ borderLeft: "1px solid #575757" }}
                >
                  <p className="card-text">days</p>
                  {/* <h3>{Details?.slotsList?.Data?.weekDays}</h3> */}
                </div>
                <div
                  className="col-sm-2"
                  style={{ borderLeft: "1px solid #575757" }}
                >
                  <p className="card-text">time</p>
                  {/* <h3>{Details?.slotsList[-1]}</h3> */}
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
