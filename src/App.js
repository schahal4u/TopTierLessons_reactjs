import "./App.css";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Views/Home";
import About from "./components/Views/About";
import ContactUs from "./components/Views/ContactUs";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
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
import Calender from "./components/BookingComponent/Calender";
import CoachDashboard from "./components/CoachProfile/Dashboard";

function App() {
  const location = useLocation();
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div>
        {url.includes("signIn") ||
        url.includes("coachsignup") ||
        url.includes("athletesignup") ||
        url.includes("basicinfo") ||
        url.includes("booking") ||
        url.includes("basicinfokids") ||
        url.includes("signupuploadphoto") ? null : (
          <Navbar />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/coachSearch" element={<CoachSearch />} />
          <Route path="/coachProfile" element={<CoachDashboard />} />
          <Route path="/booking" element={<Calender />} />
          <Route path="/coachsignup" element={<LessonsSignUp />} />
          <Route path="/athletesignup" element={<PersonalDetail />} />
          <Route path="/basicinfo" element={<BasicInfo />} />
          <Route path="/basicinfokids" element={<BasicInfoKids />} />
          <Route path="/basicinfokids" element={<BasicInfoKids />} />
          <Route path="/signupuploadphoto" element={<UploadPhoto />} />
        </Routes>
      </div>
      {url.includes("signIn") ||
      url.includes("coachsignup") ||
      url.includes("booking") ||
      url.includes("athletesignup") ||
      url.includes("basicinfo") ||
      url.includes("basicinfokids") ||
      url.includes("signupuploadphoto") ? null : (
        <Footer />
      )}
    </>
  );
}
export default App;
