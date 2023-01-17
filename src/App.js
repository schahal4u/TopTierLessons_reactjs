import "./App.css";
import { Navigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Views/Home";
import About from "./components/Views/About";
import ContactUs from "./components/Views/ContactUs";
import SignIn from "./pages/SignIn";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Terms from "./components/Terms";
import LessonsSignUp from "./pages/SignUpLessons/PersonalInfo";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/dashboard/Dashboard.js";
import PersonalDetail from "./pages/SignUpAthlete/PersonalDetail";
import BasicInfo from "./pages/SignUpAthlete/BasicInfo";
import BasicInfoKids from "./pages/SignUpAthlete/BasicInfoKids";
import UploadPhoto from "./pages/SignUpLessons/UploadPhoto";
import CoachSearch from "./components/CoachSearch/CoachSearch";
import CoachDashboard from "./components/CoachProfile/Dashboard";
import Bookings from "./components/BookingComponent/Bookings";
import Transaction from "./components/BookingComponent/Transaction";
import ReactGA from "react-ga";
import BookingList from "./pages/CoachScreens/BookingList";
import BookingDetails from "./pages/CoachScreens/BookingDetails";
import BookingSlot from "./pages/CoachScreens/BookingSlot";
import Venue from "./pages/CoachScreens/Venu";
import UserBookingList from "./pages/userScreen/UserBookingList";
import CoachProfileDetail from "./pages/userScreen/CoachProfileDetail";
import EmailTemplate from "./pages/EmailTemplate";
import Chats from "./pages/CoachScreens/chats";
import Scroller from "./components/feature/Scroller";
import PrivateRoute from "./route/PrivateRoute";
import { isSignIn } from "./utils";

function App() {
  const location = useLocation();
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(location.pathname);
    ReactGA.pageview(location.pathname);
  }, [location]);

  // When the user scrolls down 20px from the top of the document, show the button

  function PrivateRouting({ children }) {
    const auth = isSignIn();
    return auth ? children : <Navigate to="/signIn" />;
  }

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div>
        {url.includes("signIn") ||
        url.includes("coachsignup") ||
        url.includes("success") ||
        url.includes("athletesignup") ||
        url.includes("basicinfo") ||
        url.includes("booking") ||
        url.includes("basicinfokids") ||
        url.includes("signupuploadphoto") ? null : (
          <>
            <Navbar />
            <div id="scrollerHeader" style={{ display: "none", zIndex: "999" }}>
              <Navbar />
            </div>
          </>
        )}
        <div className="mainRoutes">
          <Routes className="mainRoutes">
            <Route path="/" element={<Home />} />
            <Route
              path="/contactUs"
              element={<ContactUs />}
              // element={<ContactUs />}
            />
            <Route path="/about" element={<About />} />

            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRouting>
                  <Dashboard />
                </PrivateRouting>
              }
            />
            <Route path="/coachSearch" element={<CoachSearch />} />
            <Route path="/coachProfile" element={<CoachDashboard />} />
            <Route path="/booking" element={<Bookings />} />
            <Route
              path="/coachProfileDetail/:id"
              element={<CoachProfileDetail />}
            />
            <Route path="/coachsignup" element={<LessonsSignUp />} />
            <Route path="/athletesignup" element={<PersonalDetail />} />
            <Route path="/basicinfo" element={<BasicInfo />} />
            <Route path="/basicinfokids" element={<BasicInfoKids />} />
            <Route path="/basicinfokids" element={<BasicInfoKids />} />
            <Route path="/signupuploadphoto" element={<UploadPhoto />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/appointmentList" element={<BookingList />} />
            <Route path="/appointmentList/:id" element={<BookingDetails />} />
            <Route
              path="/bookingslot"
              element={
                <PrivateRouting>
                  <BookingSlot />
                </PrivateRouting>
              }
            />
            <Route path="/venue" element={<Venue />} />
            <Route path="/userBookingList" element={<UserBookingList />} />
            <Route path="/emailTemplate" element={<EmailTemplate />} />
            <Route
              path="/conversation"
              element={
                <PrivateRouting>
                  <Chats />{" "}
                </PrivateRouting>
              }
            />
          </Routes>
        </div>
      </div>
      {url.includes("signIn") ||
      url.includes("coachsignup") ||
      url.includes("success") ||
      url.includes("booking") ||
      url.includes("athletesignup") ||
      url.includes("basicinfo") ||
      url.includes("basicinfokids") ||
      url.includes("conversation") ||
      url.includes("signupuploadphoto") ? null : (
        <Footer />
      )}
      <Scroller />
      {/* <Chat /> */}
    </>
  );
}
export default App;
