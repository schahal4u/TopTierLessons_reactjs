import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Col, Form, FormLabel } from "react-bootstrap";
import arrow from "../../assets/images/down.png";
import filter from "../../assets/images/filter.png";
import line from "../../assets/images/line.png";
import search from "../../assets/images/search.png";
import Footer from "../../components/Footer";
import { GetAllSlotsAction } from "../../redux/actions/GetTImeSlotsAction";
import { useDispatch, useSelector } from "react-redux";
import AddSlotModal from "../../components/Modal/AddSlotModal";
import {
  CreateBookingSlotAction,
  deleteBookingSlotAction,
  deleteBookingSlotResponse,
  EditBookingSlotAction,
  EditBookingSlotResponse,
  getByIdBookingSlotAction,
  ResetBookingSlotResponse,
} from "../../redux/actions/Bookings";
import { toast } from "react-toastify";

const BookingSlot = ({ handleFormData }) => {
  let { getAllSlots, loading } = useSelector((state) => state.getAllSlots);
  let {
    createBookingSlot,
    deleteBookingSlot,
    getByIdBookingSlot,

    editBookingSlot,
  } = useSelector((state) => state.createBookingResponse);

  const defautFormData = {
    fromTime: "",
    toTime: "",
    weekDays: [],
    ageGroup: "",
    isRecurring: true,
    slotDate: "",
  };
  const defautWeek = {
    Mon: false,
    Tues: false,
    Wed: false,
    Thur: false,
    Fri: false,
    Sat: false,
    Sun: false,
  };

  const [formData, setFormData] = useState(defautFormData);

  const [modalHeader, setModalHeader] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [checked, setChecked] = useState(defautWeek);

  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    handleFormData(e);
  };
  const handleOnChangecheckbox = (e, val) => {
    setChecked({ ...checked, [e.target.name]: val });
  };

  function getList() {
    let obj = {
      page: 1,
      pageSize: 10,
    };
    dispatch(GetAllSlotsAction(obj));
  }

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (createBookingSlot) {
      getList();
    }
    if (deleteBookingSlot) {
      getList();
    }
    if (editBookingSlot) {
      getList();
    }
  }, [createBookingSlot, deleteBookingSlot, editBookingSlot]);

  useEffect(() => {
    if (createBookingSlot?.statusCode === 200) {
      setModalShow(false);
      toast.success(createBookingSlot?.returnMessage[0]);
      dispatch(ResetBookingSlotResponse());
    }
    if (deleteBookingSlot?.statusCode === 200) {
      toast.success(deleteBookingSlot?.returnMessage[0]);
      dispatch(deleteBookingSlotResponse());
    }
    if (getByIdBookingSlot?.statusCode === 200) {
      let weekdaysPreFilled = { ...checked };
      setValidated(false);
      setFormData({
        ...formData,
        ageGroup: getByIdBookingSlot?.data?.ageGroup,
        coachId: getByIdBookingSlot?.data?.coachId,
        fromTime: getByIdBookingSlot?.data?.fromTime,
        slotId: getByIdBookingSlot?.data?.slotId,
        toTime: getByIdBookingSlot?.data?.toTime,
      });

      if (getByIdBookingSlot?.data?.weekDays) {
        let values = Object.values(getByIdBookingSlot?.data?.weekDays).map(
          (key) => {
            if (key === "1") {
              weekdaysPreFilled["Mon"] = true;
            } else if (key === "2") {
              weekdaysPreFilled["Tues"] = true;
            } else if (key === "3") {
              weekdaysPreFilled["Wed"] = true;
            } else if (key === "4") {
              weekdaysPreFilled["Thur"] = true;
            } else if (key === "5") {
              weekdaysPreFilled["Fri"] = true;
            } else if (key === "6") {
              weekdaysPreFilled["Sat"] = true;
            } else if (key === "7") {
              weekdaysPreFilled["Sun"] = true;
            }
          }
        );
        setChecked(weekdaysPreFilled);
      }
    }
    if (editBookingSlot?.statusCode === 200) {
      setModalShow(false);
      toast.success(editBookingSlot?.returnMessage[0]);
      dispatch(EditBookingSlotResponse());
    }
  }, [
    createBookingSlot,
    deleteBookingSlot,
    getByIdBookingSlot,
    editBookingSlot,
  ]);

  const addSlotHandler = () => {
    let slotPayload = { ...formData };
    if (checked) {
      let values = Object.entries(checked).map((key) => {
        if (key[0] == "Mon") {
          if (key[1]) {
            return 1;
          }
        } else if (key[0] == "Tues") {
          if (key[1]) {
            return 2;
          }
        } else if (key[0] == "Wed") {
          if (key[1]) {
            return 3;
          }
        } else if (key[0] == "Thur") {
          if (key[1]) {
            return 4;
          }
        } else if (key[0] == "Fri") {
          if (key[1]) {
            return 5;
          }
        } else if (key[0] == "Sat") {
          if (key[1]) {
            return 6;
          }
        } else if (key[0] == "Sun") {
          if (key[1]) {
            return 7;
          }
        }
      });
      const theseDays = values.filter(function (element) {
        return element !== undefined;
      });

      if (slotPayload) {
        slotPayload = { ...slotPayload, weekDays: theseDays };
      }
    }

    if (
      slotPayload.fromTime != "" &&
      slotPayload.toTime != "" &&
      slotPayload.ageGroup != "" &&
      slotPayload.weekDays.length > 0
    ) {
      dispatch(CreateBookingSlotAction(slotPayload));
    }
  };

  const updatingSlotHandler = () => {
    if (getByIdBookingSlot?.statusCode === 200) {
      let slotPayload = { ...formData };
      if (checked) {
        let values = Object.entries(checked).map((key) => {
          if (key[0] == "Mon") {
            if (key[1]) {
              return 1;
            }
          } else if (key[0] == "Tues") {
            if (key[1]) {
              return 2;
            }
          } else if (key[0] == "Wed") {
            if (key[1]) {
              return 3;
            }
          } else if (key[0] == "Thur") {
            if (key[1]) {
              return 4;
            }
          } else if (key[0] == "Fri") {
            if (key[1]) {
              return 5;
            }
          } else if (key[0] == "Sat") {
            if (key[1]) {
              return 6;
            }
          } else if (key[0] == "Sun") {
            if (key[1]) {
              return 7;
            }
          }
        });
        const theseDays = values.filter(function (element) {
          return element !== undefined;
        });

        if (theseDays) {
          slotPayload = {
            ...slotPayload,
            weekDays: theseDays,
            slotId: getByIdBookingSlot?.data?.slotId,
          };
        }
      }

      if (
        slotPayload.fromTime != "" &&
        slotPayload.toTime != "" &&
        slotPayload.ageGroup != "" &&
        slotPayload.weekDays.length > 0
      ) {
        dispatch(EditBookingSlotAction(slotPayload));
      }
    }
  };

  const submitHandler = (e, modalHeader) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (modalHeader === "Add Booking Slot") {
      addSlotHandler();
    }
    if (modalHeader === "Edit Booking Slot") {
      updatingSlotHandler();
    }
    setValidated(true);
  };

  const AddSlotModalHandler = () => {
    setValidated(false);
    setFormData({
      ...formData,
      fromTime: "",
      toTime: "",
      weekDays: [],
      ageGroup: "",
    });
    setChecked({
      ...checked,
      Mon: false,
      Tues: false,
      Wed: false,
      Thur: false,
      Fri: false,
      Sat: false,
      Sun: false,
    });
    setModalHeader("Add Booking Slot");
    dispatch(ResetBookingSlotResponse());
    setModalShow(true);
  };

  const editSlotHandler = (id) => {
    setModalHeader("Edit Booking Slot");
    setValidated(false);
    setFormData({
      ...formData,
      fromTime: "",
      toTime: "",
      weekDays: [],
      ageGroup: "",
    });
    setChecked({
      ...checked,
      Mon: false,
      Tues: false,
      Wed: false,
      Thur: false,
      Fri: false,
      Sat: false,
      Sun: false,
    });
    dispatch(
      getByIdBookingSlotAction({
        slotId: id,
      })
    );

    setModalShow(true);
  };
  const deleteSlotHandler = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      dispatch(
        deleteBookingSlotAction({
          slotId: id,
        })
      );
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="container-fluid ">
          <div className="row">
            <div className="col-md-12 search_container ">
              <div className="">
                <div className="row">
                  <div className="col-md-12 search_container  ">
                    <div className="d-flex flex-direction-row justify-content-end ">
                      <div className="w-25">
                        <button
                          className="book_button"
                          onClick={() => AddSlotModalHandler()}
                        >
                          ADD
                        </button>
                      </div>
                    </div>

                    <div className="col-md-12">
                      {getAllSlots?.data?.length > 0 ? (
                        getAllSlots?.data?.map((user) => {
                          // let fromtime = new Date(
                          //   user.fromTime
                          // ).toLocaleTimeString();
                          // let toTime = new Date(user.toTime).toLocaleTimeString();
                          return (
                            <>
                              <div className="name_section">
                                <div className="coach_price">
                                  <div className="coach_price_label">
                                    <h4>start Time</h4>
                                  </div>
                                  <div className="coach_full_price">
                                    <h1> {user.fromTime} </h1>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid #575757",
                                    maxHeight: "100%",
                                  }}
                                ></div>
                                <div className="coach_price">
                                  <div className="coach_price_label">
                                    <h4>End Time</h4>
                                  </div>
                                  <div className="coach_full_price">
                                    <h1> {user.toTime} </h1>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid #575757",
                                    maxHeight: "100%",
                                  }}
                                ></div>
                                <div
                                  className="coach_price "
                                  style={{ width: "50%" }}
                                >
                                  <div className="coach_price_label">
                                    <h4>Availability</h4>
                                  </div>
                                  <div className="d-flex">
                                    {user?.weekDays?.map((item, i) => {
                                      return (
                                        <div
                                          key={i}
                                          className="form-check mx-2 "
                                        >
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            checked="true"
                                            id="flexCheckDefault"
                                            disabled
                                          />
                                          <label
                                            className="form-check-label text-white"
                                            for="flexCheckDefault"
                                          >
                                            {item === "1" && <p>Mon</p>}
                                            {item === "2" && <p>Tues</p>}
                                            {item === "3" && <p>Wed</p>}
                                            {item === "4" && <p>Thurs</p>}
                                            {item === "5" && <p>Fri</p>}
                                            {item === "6" && <p>Sat</p>}
                                            {item === "7" && <p>Sun</p>}
                                          </label>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid #575757",
                                    maxHeight: "100%",
                                  }}
                                ></div>
                                <div className="w-25 d-flex justify-content-around ">
                                  <button
                                    className="book_button"
                                    onClick={() => editSlotHandler(user.slotId)}
                                  >
                                    <i
                                      className="fa fa-pencil-square-o"
                                      aria-hidden="true"
                                    ></i>
                                  </button>

                                  <button
                                    className="book_button"
                                    onClick={() =>
                                      deleteSlotHandler(user.slotId)
                                    }
                                  >
                                    <i
                                      className="fa fa-trash-o"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                </div>
                              </div>
                            </>
                          );
                        })
                      ) : !loading ? (
                        <div className="d-flex justify-content-center align-items-center">
                          <h4 className="text-white">Data Not Found</h4>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-center align-items-center">
                          <div
                            className="spinner-border text-light"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <AddSlotModal
        show={modalShow}
        modalHeader={modalHeader}
        onHide={() => setModalShow(false)}
        formData={formData}
        handleOnChange={handleOnChange}
        checked={checked}
        validation={validated}
        handleOnChangecheckbox={handleOnChangecheckbox}
        submitHandler={submitHandler}
      />
    </>
  );
};

export default BookingSlot;
