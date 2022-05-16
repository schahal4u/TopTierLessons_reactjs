import "./App.css";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import { Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// const SignUp = React.lazy(() => import("./pages/SignUp.js"));
// const SignIn = React.lazy(() => import("./pages/SignIn.js"));
// const Home = React.lazy(() => import("./components/Views/Home"));
// const ContactUs = React.lazy(() => import("./components/Views/ContactUs"));
// const Services = React.lazy(() => import("./components/Views/Services"));
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

function App() {
  const location = useLocation();
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <>
      <ToastContainer autoClose={2000} />

      {/* <Suspense fallback={<CircularProgress />}> */}
      <div>
        {url.includes("signIn") || url.includes("lessonsignup") ? null : (
          <Navbar />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/lessonsignup" element={<LessonsSignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      {url.includes("signIn") || url.includes("lessonsignup") ? null : (
        <Footer />
      )}
      {/* </Suspense> */}
    </>
  );
}
export default App;
