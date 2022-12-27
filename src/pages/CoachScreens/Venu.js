import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCoachVenueAction } from "../../redux/actions/GetAllCoachVenueAction";
// import * as Icon from 'react-bootstrap-icons';
import "./Venue.css";

const Venue = () => {
  const dispatch = useDispatch();
  const { getAllVenue } = useSelector((state) => state.coachVenue);
  const data = getAllVenue?.data;
  const response = getAllVenue?.statusCode;

  const defaultFormData = {
    page: 0,
    pageSize: 0,
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [list, setList] = useState([]);

  useEffect(() => {
    let obj = {
      page: 1,
      pageSize: 10,
    };
    dispatch(GetAllCoachVenueAction(obj));
  }, []);
  useEffect(() => {
    if (response == 200) {
      setList(data);
    }
  }, [getAllVenue]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="search_container">
      {/* Venue list */}

      <div className="container">
        <div className="d-flex justify-content-between align-content-between">
          <div>
            <h1>Venue List </h1>
          </div>
          <div>
            <button
              data-toggle="modal"
              data-target="#exampleModalCenter"
              style={{
                width: "100px",
                height: "50px",
                borderRadius: "10px",
                background: "#e38226",
                color: "white",
                border: "black",
              }}
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        {list?.length &&
          list?.map((coachVenue) => {
            return (
              <div className="card col-sm-12 w-100 venuecard ">
                <div className="card-body">
                  <div className="row">
                    <div
                      className="h-100"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        textAlign: "center",
                      }}
                    >
                      <div className="col-sm-1">
                        <div className=" h-100 d-flex justify-content-center align-items-center">
                          <img
                            className="card-img-bottom"
                            src={coachVenue?.image}
                            height="50px"
                            width="50px"
                            alt="Card image cap"
                          />
                        </div>
                      </div>
                      <div
                        className="col-sm-2"
                        style={{ borderLeft: "1px solid #575757" }}
                      >
                        <p>Venue Name</p>

                        <h4>{coachVenue?.name}</h4>
                      </div>
                      <div
                        className="col-sm-2"
                        style={{ borderLeft: "1px solid #575757" }}
                      >
                        <p className="card-text">Address</p>
                        <h4>{coachVenue?.address}</h4>
                      </div>
                      <div
                        className="col-sm-2"
                        style={{ borderLeft: "1px solid #575757" }}
                      >
                        <p className="card-text">Sports</p>
                        <h4>{coachVenue?.sports}</h4>
                      </div>
                      <div
                        className="col-sm-2"
                        style={{ borderLeft: "1px solid #575757" }}
                      >
                        <p className="card-text">Guest Allowed</p>
                        {/* <h3>{Details.bookingId}</h3> */}
                      </div>
                      <div
                        className="col-sm-2"
                        style={{ borderLeft: "1px solid #575757" }}
                      >
                        <p className="card-text">Guest Price</p>
                        {/* <h3>{Details.bookingId}</h3> */}
                      </div>
                      <div
                        className="col-sm-1  "
                        style={{ borderLeft: "1px solid #575757" }}
                      >
                        <p className="card-text">Action </p>
                        <div className="   d-flex justify-content-center align-items-center">
                          <i className="fa fa-trash  fs-4" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {/* Modal  */}
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Modal title
              </h5>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  className="card-img-bottom"
                  src="..."
                  alt="Card image cap"
                  style={{ display: "flex" }}
                />
              </div>
              <div className="card col-sm-12 venuecard ">
                <div className="card-body">
                  <div className="row ">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        textAlign: "center",
                      }}
                    >
                      <div className="col-sm-6">
                        <p>Venue Name</p>
                        <input
                          type="text"
                          style={{ backgroundColor: "grey" }}
                        ></input>
                      </div>
                      <div
                        className="col-sm-6"
                        style={{ borderLeft: "1px solid #575757" }}
                      >
                        <p className="card-text">Address</p>
                        {/* <h3>{coachVenue?.address}</h3> */}
                        <input
                          type="text"
                          style={{ backgroundColor: "grey" }}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card col-sm-12 venuecard ">
                <div className="card-body">
                  <div className="row ">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        textAlign: "center",
                      }}
                    >
                      <div className="col-sm-6">
                        <p className="card-text">Sports</p>
                        {/* <h3>{coachVenue?.sports}</h3> */}
                        <input
                          type="text"
                          style={{ backgroundColor: "grey" }}
                        ></input>
                      </div>
                      <div
                        className="col-sm-6"
                        style={{ borderLeft: "1px solid #575757" }}
                      >
                        <p className="card-text">Guest Allowed</p>
                        {/* <h3>{Details.bookingId}</h3> */}
                        <input
                          type="text"
                          style={{ backgroundColor: "grey" }}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card col-sm-12 venuecard ">
                <div className="card-body">
                  <div className="row ">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        textAlign: "center",
                      }}
                    >
                      <div className="col-sm-6">
                        <p className="card-text">Guest Price</p>
                        {/* <h3>{Details.bookingId}</h3> */}
                        <input
                          type="text"
                          style={{ backgroundColor: "grey" }}
                        ></input>
                      </div>
                      <div
                        className="col-sm-6"
                        style={{ borderLeft: "1px solid #575757" }}
                      >
                        <p className="card-text">Guest Allowed </p>
                        <input
                          type="text"
                          style={{ backgroundColor: "grey" }}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venue;
