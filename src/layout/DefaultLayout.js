import { CircularProgress } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Home = React.lazy(() => import("../components/Views/Home.js"));
const ContactUs = React.lazy(() => import("../components/Views/ContactUs.js"));
const Services = React.lazy(() => import("../components/Views/Services.js"));
const DefaultLayout = () => {
  return (
    <>
      {/* <Suspense fallback={<CircularProgress />}> */}
      <Navbar />
      {/* <Routes>
        <Route index element={<Home />} />
        <Route path="contactUs" element={<ContactUs />} />
        <Route path="services" element={<Services />} />
      </Routes> */}

      <Footer />
      {/* </Suspense> */}
    </>
  );
};

export default DefaultLayout;
