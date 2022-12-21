import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteCoachVenueAction,
  deleteCoachVenueResponse,
  GetNearbyVenueAction,
} from "../../redux/actions/coach";
import { GetAllCoachVenueAction } from "../../redux/actions/GetAllCoachVenueAction";
import AddVenueModal from "../Modal/AddVenueModal";
// import * as Icon from 'react-bootstrap-icons';
import "./Venue.css";

const Venue = () => {
  const API_KEY = "AIzaSyDx_6SY-xRPDGlQoPt8PTRbCtTHKCbiCXQ";
  const { getAllVenue, loading } = useSelector((state) => state.coachVenue);
  const { deleteVenue } = useSelector((state) => state.getAllCoachResponse);
  const { profileDetail } = useSelector((state) => state.getProfileDetail);
  const { updateProfileDetail } = useSelector((state) => state.profileUpdate);
  console.log("profileDetail=====>>>>>", updateProfileDetail);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  // const handleOnChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  useEffect(() => {
    if (deleteVenue?.statusCode === 200) {
      toast.success(deleteVenue?.returnMessage[0]);
      dispatch(deleteCoachVenueResponse());
    }
    let obj = {
      page: 1,
      pageSize: 10,
    };
    dispatch(GetAllCoachVenueAction(obj));
  }, [deleteVenue]);

  useEffect(() => {
    if (updateProfileDetail?.statusCode === 200) {
      let obj = {
        page: 1,
        pageSize: 10,
      };
      dispatch(GetAllCoachVenueAction(obj));
    }
  }, [updateProfileDetail]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const venueDeletehandler = (id) => {
    dispatch(
      deleteCoachVenueAction({
        coachVenueId: id,
      })
    );
  };

  const AddVenueHandler = () => {
    let nearVenue = {
      lat: profileDetail?.data?.latitude,
      long: profileDetail?.data?.longitude,
      radius: profileDetail?.data?.radius,
      sportId: profileDetail?.data?.sportId,
    };

    dispatch(GetNearbyVenueAction(nearVenue));
    setModalShow(true);
  };

  return (
    <>
      <div className="container mb-5">
        <div className="d-flex justify-content-between align-content-between ">
          <div>
            <h1>Venue List </h1>
          </div>
          <div>
            <button
              onClick={() => AddVenueHandler()}
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

        {getAllVenue?.data?.length
          ? getAllVenue?.data?.map((coachVenue) => {
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
                          className="col-sm-1"
                          style={{ borderLeft: "1px solid #575757" }}
                        >
                          <p className="card-text">Action</p>
                          <div className="d-flex justify-content-center align-items-center">
                            <i
                              onClick={() =>
                                venueDeletehandler(coachVenue.coachVenueId)
                              }
                              className="fa fa-trash fs-4 cursor_pointer"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : loading && (
              <div className="w-100 d-flex justify-content-center align-items-center">
                <div class="spinner-border  text-light" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            )}
      </div>
      {/* Modal  */}

      <AddVenueModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setModalShow={setModalShow}
        // formData={formData}
        // handleOnChange={handleOnChange}
      />
    </>
  );
};

export default Venue;
