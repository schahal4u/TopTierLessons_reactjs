import "./App.css";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// const SignUp = React.lazy(() => import("./pages/SignUp.js"));
// const SignIn = React.lazy(() => import("./pages/SignIn.js"));
// const Home = React.lazy(() => import("./components/Views/Home"));
// const ContactUs = React.lazy(() => import("./components/Views/ContactUs"));
// const Services = React.lazy(() => import("./components/Views/Services"));
import Home from "./components/Views/Home";
import Services from "./components/Views/Services";
import ContactUs from "./components/Views/ContactUs";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  const location = useLocation();
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <>
      {/* <Suspense fallback={<CircularProgress />}> */}
        <div>
          {url.includes("signIn") || url.includes("signUp") ? null : <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </div>
        {url.includes("signIn") || url.includes("signUp") ? null : <Footer />}
      {/* </Suspense> */}
    </>
  );
}
export default App;