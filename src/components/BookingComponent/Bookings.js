import React, { Suspense, useEffect, useState } from "react";
import BasicDetail from "./BasicDetail";
import "./Booking.css";
import Calender from "./Calender";
import ContactInfo from "./ContactInfo";
import Payment from "./Payment";
import Transaction from "./Transaction";
import { useDispatch, useSelector } from "react-redux";
import { CreateBookingAction } from "../../redux/actions/Bookings";
import { CreatePaymentAction } from "../../redux/actions/Payment";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

let price = 0;
let defautFormData = {
  lessonsDuration: 0,
  addFriend: 0,
  bookingId: 0,
  continueLessons: false,
  sourceType: 0,
  venueId: 0,
};
const Bookings = () => {
  const dispatch = useDispatch();
  const { createBooking } = useSelector((state) => state.createBookingResponse);
  const { createPayment } = useSelector((state) => state.createPaymentResponse);
  const [validated, setValidated] = useState(false);
  const [isvalidated, setIsValidated] = useState(false);
  const [step, setStep] = useState(1);
  const [slotsBook, setSlotsBook] = useState([]);
  const [_price, setPrice] = useState(0);
  const [data, setData] = useState();
  const [link, setLink] = useState("");

  useEffect(() => {
    if (slotsBook) arr();
  }, [slotsBook]);

  const arr = async () => {
    let newData = await slotsBook?.map((item) => {
      let { date, slotId } = item;
      setPrice((price += item.price));
      return { date: new Date(date).toUTCString(), slotId };
    });
    setData(newData);
  };

  const [formData, setFormData] = useState(defautFormData);

  const handleFormData = (e) => {
    defautFormData = { ...defautFormData, [e.target.name]: e.target.value };
  };

  useEffect(() => {
    if (data)
      defautFormData = { ...defautFormData, slotsList: data, price: _price };
  }, [data]);

  useEffect(() => {
    if (createPayment?.statusCode === 200) {
      setLink(createPayment?.data?.paymentLink);
    }
  }, [createPayment]);

  const bookingHandler = (e) => {
    setStep(step + 1);
    if (slotsBook.length === 0) {
      setStep(1);
      toast.warn("Please Select a slot");
    } else if (step === 2) {
      setFormData(defautFormData);
    } else if (step === 3) {
      e.preventDefault();
      setValidated(true);
      // if (
      //   !defautFormData.firstName ||
      //   !defautFormData.lastName ||
      //   !defautFormData.phone ||
      //   !defautFormData.email
      // ) {
      //   toast.warn("Please Fill All the fields");
      //   setStep(3);
      // } else {
      const coachID = localStorage.coachId;
      setFormData(defautFormData);
      dispatch(CreateBookingAction({ ...defautFormData, coachID: coachID }));
      // }
    }
  };
  // console.log("idididdd", coachId)

  // let paymentObj = {
  //   bookingId: createBooking?.data.bookingId,
  //   cardNumber: "",
  //   expireMonth: "",
  //   expireYear: "",
  //   cvc: "",
  //   amount: createBooking?.data.totalPrice,
  // };

  let paymentObj = {
    amount: createBooking?.data.totalPrice,
    currency: "USD",
    bookingId: createBooking?.data.bookingId,
  };

  const isloader = () => {
    if (createBooking?.statusCode != 200) {
      return <Spinner animation="border" variant="warning" />;
    } else if (createBooking?.statusCode == 200) {
      return null;
    } else if (createBooking?.statusCode > 200) {
      return "Something went wrong !";
    }
  };

  const handlePaymentFormData = (e) => {
    if (e.target.name === "expireMonth") {
      paymentObj = {
        ...paymentObj,
        expireMonth: parseInt(e.target.value.split("/")[0]),
        expireYear: parseInt(e.target.value.split("/")[1]),
      };
    } else {
      paymentObj = {
        ...paymentObj,
        [e.target.name]: e.target.value,
      };
    }
  };

  // const paymentHandle = () => {
  //   setIsValidated(true);
  //   if (!paymentObj.cardNumber || !paymentObj.cvc || !paymentObj.expireMonth) {
  //     toast.warn("Please Fill All the fields");
  //     setStep(4);
  //   } else if (paymentObj.cardNumber.length != 16) {
  //     toast.warn("Please Fill valid card number");
  //     setStep(4);
  //   } else {
  //     dispatch(CreatePaymentAction(paymentObj));
  //     if (createPayment === undefined) setStep(4);
  //     else setStep(step + 1);
  //   }
  // };

  const paymentHandle = () => {
    dispatch(CreatePaymentAction(paymentObj));
  };

  const RenderUI = () => {
    switch (step) {
      case 1:
        return <Calender slotsBook={slotsBook} setSlotsBook={setSlotsBook} />;
      case 2:
        return (
          <BasicDetail slotsBook={slotsBook} handleFormData={handleFormData} />
        );
      case 3:
        return (
          <ContactInfo validated={validated} handleFormData={handleFormData} />
        );
      case 4:
        return (
          <div>
            {createBooking?.statusCode === 200 ? (
              <Payment
                validated={isvalidated}
                createPayment={createPayment}
                link={link}
                handleFormData={handlePaymentFormData}
              />
            ) : (
              isloader()
            )}
          </div>
        );
      case 5:
        return <Transaction />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bookings">
        <div className="container bookings_container">
          <div className="booking_bars_container">
            <div className="booking_bars_active"></div>
            <div
              className={step > 1 ? "booking_bars_active" : "booking_bars"}
            ></div>
            <div
              className={step > 2 ? "booking_bars_active" : "booking_bars"}
            ></div>
            <div
              className={step > 3 ? "booking_bars_active" : "booking_bars"}
            ></div>
          </div>
          <div className="bookings_form">
            <RenderUI />
            <div className="booking_buttons">
              {step > 1 && (
                <button
                  className="back_btnn me-4"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </button>
              )}
              {step < 4 && (
                <button className="booking_bttn" onClick={bookingHandler}>
                  Next
                </button>
              )}
              {step == 4 && (
                <button className="booking_bttn" onClick={paymentHandle}>
                  Confirm
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
